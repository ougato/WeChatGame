/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 视图管理器
 */

let List = require( "List" );
let ViewPrefab = require( "ViewPrefab" );
let ViewScene = require( "ViewScene" );
let DefView = require( "DefView" );
let Utils = require( "Utils" );
let Tips = require( "Tips" );
let LoadingHttp = require( "LoadingHttp" );
let LoadingWebsocket = require( "LoadingWebsocket" );
let LoadingScene = require( "LoadingScene" );
let DefLoading = require( "DefLoading" );

// 实例化对象
let instance = null;

let ViewManager = cc.Class({

    /**
     * 静态
     */
    statics: {

        /**
         * 获取实例
         * @returns {Function}
         */
        getInstance() {
            if( Utils.isNull( instance ) ) {
                instance = new ViewManager();
            }
            return instance;
        },

        /**
         * 销毁实例
         */
        destroy() {
            if( !Utils.isNull( instance ) ) {
                instance.destroy();
            }
        },

    },

    /**
     * 构造
     */
    ctor() {
        // 当前场景
        this.m_objScene = null;
        // 当前预制体
        this.m_objPrefab = null;
        // 提示视图对象
        this.m_objTips = new Tips();
        // 加载视图对象
        this.m_objLoadingHttp = new LoadingHttp();


        //（维护视图 我使用了两个结构 map用来快速查找 list用来方便视图的打开先后顺序）
        // 视图 字典映射
        this.m_mapPrefab = new Map();
        // 视图 链表
        this.m_listPrefab = new List();

    },

    /**
     * 销毁
     */
    destroy() {
        if( !Utils.isNull( this.m_objScene ) ) {
            this.m_objScene.destroy();
            this.m_objScene = null;
        }
        if( !Utils.isNull( this.m_objPrefab ) ) {
            this.m_objPrefab.destroy();
            this.m_objPrefab = null;
        }
        if( !Utils.isNull( this.m_objTips ) ) {
            this.m_objTips.destroy();
            this.m_objTips = null;
        }
        if( !Utils.isNull( this.m_mapPrefab ) ) {
            this.m_mapPrefab.clear();
            this.m_mapPrefab = null;
        }
        if( !Utils.isNull( this.m_listPrefab ) ) {
            this.m_listPrefab.clear();
            this.m_listPrefab = null;
        }

    },

    /**
     * 打开加载视图
     * @param type {number} 加载类型(DefLoading定义)
     */
    openLoading( type ) {
        function _removeFirst( arg ) {
            let args = [];
            for( let i = 1; i < arg.length; ++i ) {
                args[i-1] = arg[i];
            }
            return args;
        }

        let args = _removeFirst( arguments );
        switch( type ) {
            case DefLoading.HTTP:
                this.m_objLoadingHttp.show( args );
                break;
            case DefLoading.WEBSOCKET:

                break;
            case DefLoading.SCENE:

                break;
            default:

                break;
        }
    },

    /**
     * 关闭加载视图
     */
    closeLoading( type ){
        switch( type ) {
            case DefLoading.HTTP:
                this.m_objLoadingHttp.hide();
                break;
            case DefLoading.WEBSOCKET:

                break;
            case DefLoading.SCENE:

                break;
            default:

                break;
        }
    },

    /**
     * 打开飘动提示
     * @param text {string} 提示文字
     */
    openTips( text ) {
        this.m_objTips.show( text );
    },

    /**
     * 关闭飘动提示
     */
    closeTips() {
        this.m_objTips.hide();
    },

    /**
     * 打开预制体
     * @param pathName {string} 预制名（prefab文件夹后的路径+预制名）
     * @param data {object} 数据
     * @param zorder {number} 层级
     * @param callback {function} 预制体加载完成 回调
     */
    openPrefab( pathName, data, zorder, callback ){
        let oldView = this.m_mapPrefab.get( pathName );
        if( !Utils.isNull( oldView ) ) {
            let lastView = this.m_listPrefab.getLast();
            if( lastView === oldView ) {
                if( !lastView.getNode().active ) {
                    lastView.show();
                }
                return ;
            }
        }
        zorder = Utils.isNull( zorder ) ? DefView.Zorder.UI : zorder;
        let view = new ViewPrefab( DefView.PREFAB_PATH + pathName, data, zorder );
        view.load( function( node ) {
            if( !Utils.isNull( oldView ) ) {
                this.closePrefab( pathName );
            }
            this.m_mapPrefab.set( pathName, view );
            this.m_listPrefab.insert( view );
            // let zorderName = Utils.getKeyByValue( DefView.Zorder, zorder );
            // let zorderNode = this.m_objScene.getScene().getChildByName( "Canvas" ).getChildByName( zorderName );
            // zorderNode.addChild( node, zorder );
            let zorderNode = this.m_objScene.getScene().getChildByName( "Canvas" );
            zorderNode.addChild( node, zorder );
            this.m_objPrefab = view;
            view.refresh();
            // 预制体加载完毕 告诉 调用者
            if( !Utils.isNull( callback ) ) {
                callback( this.m_objPrefab );
            }
        }.bind( this ) );
    },

    /**
     * 关闭预制体
     * @param pathName {string} 预制名（prefab后的 路径+预制名）
     */
    closePrefab( pathName ) {
        let view = this.m_mapPrefab.get( pathName );
        if( !Utils.isNull( view ) ) {
            view.destroy();
            this.m_mapPrefab.delete( pathName );
            this.m_listPrefab.delete( view );
        }
    },

    /**
     * 获取当前预制体
     * @param pathName {string} 预制名（prefab后的 路径+预制名）
     * @returns {object|null} 1.当前预制体 2.根据pathName找到的预制体
     */
    getPrefab( pathName ) {
        let prefab = this.m_objPrefab;
        if( Utils.isNull( pathName ) ) {
            prefab = this.m_mapPrefab.get( pathName );
        }
        return prefab;
    },

    /**
     * 切换场景
     * @param name
     * @param data
     * @param callback {function} 场景加载完后回调
     */
    replaceScene( name, data, callback ) {
        cc.director.loadScene( name, function( _, scene ) {
            if( !Utils.isNull( this.m_objScene ) ) {
                this.m_objScene.destroy();
                this.m_objScene = null;
                this.m_objPrefab = null;
                this.m_mapPrefab.clear();
                this.m_listPrefab.clear();
            }
            let canvas = scene.getChildByName( "Canvas" );
            // let designResolution = canvas.getComponent( cc.Canvas ).designResolution;
            // for( let key in DefView.Zorder ) {
            //     let node = new cc.Node();
            //     node.setName( key );
            //     node.setContentSize( designResolution.width, designResolution.height );
            //     node.setPosition( 0, 0 );
            //     canvas.addChild( node, DefView.Zorder[key] );
            // }
            let view = new ViewScene( name, data );
            view.setScene( scene );
            view.setNode( canvas );
            view.refresh();
            this.m_objScene = view;
            // 场景加载完毕 告诉 调用者
            if( !Utils.isNull( callback ) ) {
                callback( this.m_objScene );
            }
        }.bind( this ) );
    },

    /**
     * 获取当前场景
     * @returns {object|null}
     */
    getScene() {
        if( Utils.isNull( this.m_objScene ) ) {
            this.m_objScene = cc.director.getScene();
        }
        return this.m_objScene;
    },

});

module.exports = ViewManager;