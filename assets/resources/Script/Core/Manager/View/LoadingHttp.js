/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * Http加载视图
 */

let Utils = require( "Utils" );

// 路径名
const PATH_NAME = "Prefab/Common/ComLoadingHttp";

let LoadingHttp = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 节点数量
        this.m_nNodeCount = 0;
        // 父节点
        this.m_arrParentNode = [];
        // 节点
        this.m_arrLoadingNode = [];
        // 动作
        this.m_arrObjAction = [];
        // 活动节点
        this.m_arrNodeAction = [];
    },

    /**
     * 销毁
     */
    destroy() {

    },

    /**
     * 初始化视图
     * @param validNode {node} 有效节点
     * @param loadingNode {node} 加载节点
     */
    initView( validNode, loadingNode ) {
        let nodeRoot = loadingNode;
        let nodeSpriteBG = loadingNode.getChildByName( "Sprite_BG" );
        let nodeLabelLoading = loadingNode.getChildByName( "Label_Loading" );
        this.m_arrNodeAction[this.m_nNodeCount] = loadingNode.getChildByName( "Sprite_Loading" );
        let validNodeSize = validNode.getContentSize();
        nodeRoot.setContentSize( validNodeSize );
        nodeSpriteBG.setContentSize( validNodeSize );
        let compLabelLoading = nodeLabelLoading.getComponent( cc.Label );
        compLabelLoading.string = G.I18N.get( 4 );
    },

    /**
     * 浮动
     */
    run() {
        let rotateTo = cc.rotateBy(1, 360);
        let repeatForever = cc.repeatForever( rotateTo );
        this.m_arrObjAction[this.m_nNodeCount] = this.m_arrNodeAction[this.m_nNodeCount].runAction( repeatForever );
    },

    /**
     * 显示
     * @param [] {node} 组件节点
     */
    show() {
        function _isExistNode( nodes, node ) {
            let isExist = false;
            for( let i = 0; i < nodes.length; ++i ) {
                if( nodes[i] === node ) {
                    isExist = true;
                    break;
                }
            }
            return isExist;
        }

        // if( this.m_nNodeCount > 0 ) {
        //     this.hide();
        // }

        let args = arguments[0];

        for( let i = 0; i < args.length; ++i ) {
            let validNode = args[i];
            if( !Utils.isNull( validNode ) && !_isExistNode( this.m_arrParentNode, validNode ) && cc.isValid( validNode ) ) {
                cc.loader.loadRes( PATH_NAME, function( _, prefab ) {
                    let loadingNode = cc.instantiate( prefab );
                    this.initView( validNode, loadingNode );
                    this.run();
                    validNode.addChild( loadingNode );
                    this.m_arrParentNode[this.m_nNodeCount] = validNode;
                    this.m_arrLoadingNode[this.m_nNodeCount] = loadingNode;
                    ++this.m_nNodeCount;
                }.bind( this ) );

            }
        }
    },

    /**
     * 隐藏
     */
    hide() {
        let count = this.m_nNodeCount;
        for( let i = 0; i < count; ++i ) {
            if( !Utils.isNull( this.m_arrLoadingNode[i] ) ) {
                this.m_arrNodeAction[i].stopAction( this.m_arrObjAction[i] );
                this.m_arrNodeAction[i] = null;
                this.m_arrObjAction[i] = null;
                this.m_arrParentNode[i] = null;
                this.m_arrLoadingNode[i].destroy();
                --this.m_nNodeCount;
            }
        }
        this.m_nNodeCount = 0;
        this.m_arrLoadingNode = [];
        this.m_arrParentNode = [];
        this.m_arrObjAction = [];
        this.m_arrNodeAction = [];
    },

});

module.exports = LoadingHttp;
