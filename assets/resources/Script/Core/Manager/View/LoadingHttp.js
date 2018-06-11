/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * Http加载视图
 */

let Utils = require( "Utils" );
let DefLog = require( "DefLog" );

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
        this.m_nodeParentNode = [];
        // 节点
        this.m_nodeLoadingNode = [];
        // 动作
        this.m_arrObjAction = [];
        // 活动节点
        this.m_objNodeAction = [];
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
        let nodeSpriteBG = nodeRoot.getChildByName( "Sprite_BG" );
        let nodeLabelLoading = nodeRoot.getChildByName( "Label_Loading" );
        this.m_objNodeAction[this.m_nNodeCount] = loadingNode.getChildByName( "Sprite_Loading" );

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
        this.m_arrObjAction[this.m_nNodeCount] = this.m_objNodeAction[this.m_nNodeCount].runAction( repeatForever );
    },

    /**
     * 显示
     * @param parentNode {node} 父节点
     */
    show( parentNode, completeCallbackFunc ) {
        if( Utils.isNull( parentNode ) || !cc.isValid( parentNode ) ) {
            Log.error( DefLog[4] );
            return null;
        }

        cc.loader.loadRes( PATH_NAME, function( _, prefab ) {
            let loadingNode = cc.instantiate( prefab );
            this.initView( parentNode, loadingNode );
            parentNode.addChild( loadingNode );
            this.run();

            this.m_nodeParentNode[this.m_nNodeCount] = validNode;
            this.m_nodeLoadingNode[this.m_nNodeCount] = loadingNode;
            ++this.m_nNodeCount;
        }.bind( this ) );
    },

    /**
     * 隐藏
     */
    hide() {
        let count = this.m_nNodeCount;
        for( let i = 0; i < count; ++i ) {
            if( !Utils.isNull( this.m_nodeLoadingNode[i] ) ) {
                this.m_objNodeAction.stopAction( this.m_arrObjAction[i] );
                this.m_objNodeAction[i] = null;
                this.m_arrObjAction[i] = null;
                this.m_nodeParentNode[i] = null;
                this.m_nodeLoadingNode[i].destroy();
                --this.m_nNodeCount;
            }
        }
        this.m_nNodeCount = 0;
        this.m_nodeLoadingNode = [];
        this.m_nodeParentNode = [];
        this.m_arrObjAction = [];
        this.m_objNodeAction = [];
    },

});

module.exports = LoadingHttp;
