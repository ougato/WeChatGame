/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 网络加载菊花类
 */

let Utils = require( "Utils" );
let DefView = require( "DefView" );

// 路径名
const PATH_NAME = "Prefab/Common/ComLoading";

let Loading = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 菊花节点
        this.m_nodeLoading = null;
        // 菊花脚本
        this.m_scriptLoading = null;
    },

    /**
     * 初始化
     * @param completeCallbackFunc {function} 菊花打开完成后的回调函数
     * @param text {string} 提示文字
     * @param parentNode {node} 菊花挂载的父节点
     */
    init( completeCallbackFunc, text, parentNode ) {
        cc.loader.loadRes( PATH_NAME, function( _, prefab ) {
            this.m_nodeLoading = cc.instantiate( prefab );
            this.m_scriptLoading = this.m_nodeLoading.getComponent( "ComLoading" );

            this._addToParent( parentNode, this.m_nodeLoading );

            if( !Utils.isNull( text ) ) {
                this.m_scriptLoading.setText( text );
            }
            if( !Utils.isNull( completeCallbackFunc ) ) {
                completeCallbackFunc( this );
            }

            this.hide();
        }.bind( this ) );
    },

    /**
     * 销毁
     */
    destroy() {
        this.m_nodeLoading.destroy();
        this.m_nodeLoading = null;
    },

    /**
     * 显示菊花转动
     * @param text 提示文字
     */
    show( text ) {
        this.m_scriptLoading.setText( text );
        this.m_nodeLoading.active = true;
    },

    /**
     * 隐藏菊花转动
     */
    hide() {
        this.m_nodeLoading.active = false;
    },

    /**
     * 添加到父类
     * @param parent {node} 父节点
     * @param child {node} 子节点
     */
    _addToParent( parent, child ) {
        if( Utils.isNull( parent ) || !cc.valid( parent ) ) {
            parent = G.ViewManager.getScene().getNode();
        }
        let parentSize = parent.getContentSize();
        child.setContentSize( parentSize.width, parentSize.height );
        let spriteBG = child.getChildByName( "Sprite_BG" );
        spriteBG.setContentSize( parentSize.width, parentSize.height );
        parent.addChild( child, DefView.Zorder.SYSTEM );
    },

});

module.exports = Loading;
