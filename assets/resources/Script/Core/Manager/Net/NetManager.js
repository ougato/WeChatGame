/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 网络管理器
 */

let Utils = require( "Utils" );
let Http = require( "Http" );
let ConfUrl = require( "ConfUrl" );
let NetGame = require( "NetGame" );
let NetLobby = require( "NetLobby" );

// 实例化对象
let instance = null;

let NetManager = cc.Class({

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
                instance = new NetManager();
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
        // 大厅网络对象
        this.m_objLobbyWS = null;
        // 游戏网络对象
        this.m_objGameWS = null;

        // 网络接收回调
        this.m_arrS2CFunc = [];
    },

    /**
     * 销毁
     */
    destroy() {
        // 大厅网络对象
        this.m_objLobbyWS.destroy();
        this.m_objLobbyWS = null;

        // 游戏网络对象
        this.m_objGameWS.destroy();
        this.m_objGameWS = null;
    },

    /**
     * 注册网络消息
     * @param code 协议消息ID
     * @param callback 接收回调函数
     */
    register( code, callback ) {
        this.m_arrS2CFunc[code] = callback;
    },

    /**
     * @overload 重载函数
     * 连接大厅网络
     * @param ws {string} 链接地址
     * @private
     */
    _connect1( ws ) {
        if( Utils.isNull( this.m_objLobbyWS ) ) {
            this.m_objLobbyWS = new NetLobby();
            this.m_objLobbyWS.connect( ws );
        }
    },

    /**
     * @overload 重载函数
     * 连接游戏模式网络
     * @param modeId {number} 模式ID
     * @private
     *
     */
    _connect2( modeId ) {
        let http = new Http();
        let url = Utils.format( ConfUrl.Game, modeId );
        http.get( url, function( data ) {
            if( Utils.isNull( this.m_objGameWS ) ) {
                this.m_objGameWS = new NetGame();
                this.m_objGameWS.connect( data );
            }
        } );
    },

    /**
     * 连接网络
     * @param ws|modeId {string|number} 网络ID
     */
    connect() {
        let arg = arguments[0];
        if( Utils.isString( arg ) ) {
            this._connect1( arg );
        } else if( Utils.isNumber( arg ) ) {
            this._connect2( arg );
        }
    },

    /**
     * 获取大厅网络
     */
    getLobbyNet() {
        return this.m_objLobbyWS;
    },

    /**
     * 获取游戏网络
     */
    getGameNet() {
        return this.m_objGameWS;
    },


});

module.exports = NetManager;