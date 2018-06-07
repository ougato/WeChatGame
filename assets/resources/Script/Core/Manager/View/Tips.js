/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 提示视图
 */

let DefView = require( "DefView" );
let Utils = require( "Utils" );

// 起始位置
const ORIGIN_POS = { x: 0, y: 0 };
// 目标位置
const TARGET_POS = { x: 0, y: 200 };
// 移动时间
const MOVE_SEC = 0.5;
// 渐隐时间
const FADE_OUT_SEC = 1;
// 描边轮廓
const CONTOUR = 20;
// 路径名
const PATH_NAME = "Prefab/Common/ComTips";

let Tips = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 文字
        this.m_strCurrText = null;
        // 节点
        this.m_objNode = null;
        // 动作
        this.m_objAction = null;
    },

    /**
     * 销毁
     */
    destroy() {

    },

    /**
     * 初始化视图
     */
    initView() {
        // 恢复节点
        this.m_objNode.opacity = 255;
        this.m_objNode.setPosition( ORIGIN_POS.x, ORIGIN_POS.y );

        let nodeRoot = this.m_objNode;
        let nodeSpriteBG = this.m_objNode.getChildByName( "Sprite_BG" );
        let nodeLabelText = this.m_objNode.getChildByName( "Label_Text" );

        let compLabelText = nodeLabelText.getComponent( cc.Label );
        compLabelText.string = this.m_strCurrText;

        let textSize = nodeLabelText.getContentSize();
        nodeRoot.setContentSize( textSize.width + CONTOUR, textSize.height + CONTOUR );
        nodeSpriteBG.setContentSize( textSize.width + CONTOUR, textSize.height + CONTOUR );

    },

    /**
     * 浮动
     */
    run() {
        this.initView();

        let moveTo = cc.moveTo( MOVE_SEC, cc.p( TARGET_POS.x, TARGET_POS.y ) );
        let fadeOut = cc.fadeOut( FADE_OUT_SEC );
        let callFunc = cc.callFunc( this.onActionEnd.bind( this ) );
        let sequeue = cc.sequence( moveTo, fadeOut, callFunc );

        this.m_objAction = this.m_objNode.runAction( sequeue );
    },

    /**
     * 显示
     * @param text {string} 提示文字
     */
    show( text ) {
        if( text === this.m_strCurrText ) {
            return null;
        }

        this.hide();
        this.m_strCurrText = text;

        if( !Utils.isNull( this.m_objNode ) && cc.isValid( this.m_objNode ) ) {
            this.run();
        } else {
            cc.loader.loadRes( PATH_NAME, function( _, prefab ) {
                this.m_objNode = cc.instantiate( prefab );
                let zorderNode = G.ViewManager.getScene().getChildByName( "Canvas" );
                zorderNode.addChild( this.m_objNode, DefView.Zorder.Zorder );
                this.run();
            }.bind( this ) );
        }

    },

    /**
     * 隐藏
     */
    hide() {
        if( !Utils.isNull( this.m_objAction ) ) {
            this.m_objNode.stopAction( this.m_objAction );
            this.m_objNode.opacity = 0;
            this.m_strCurrText = null;
            this.m_objAction = null;
        }
    },

    /**
     * 动作结束 回调
     */
    onActionEnd() {
        this.hide();
    },

});

module.exports = Tips;
