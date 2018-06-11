/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 网络加载菊花类
 */

let Utils = require( "Utils" );

// 路径名
const PATH_NAME = "Prefab/Common/ComLoading";

let Loading = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 菊花节点
        this.m_nodeLoading = null;
    },

    /**
     * 创建
     * @param completeCallbackFunc {function} 菊花打开完成后的回调函数
     * @param text {string} 提示文字
     * @param parentNode {node} 菊花挂载的父节点
     */
    create( completeCallbackFunc, text, parentNode ) {
        cc.loader.loadRes( PATH_NAME, function( _, prefab ) {
            this.m_nodeLoading = cc.instantiate( prefab );
            this.addToParent( parentNode, this.m_nodeLoading );
            this.setText( text );
            this.run();
            completeCallbackFunc( Loading );
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
     * 设置提示文字
     * @param text {string} 提示文字
     */
    setText( text ) {
        let labelText = this.m_nodeLoading.getChildByName( "" );
    },

    /**
     * 添加到父类
     * @param parent {node} 父节点
     * @param child {node} 子节点
     */
    addToParent( parent, child ) {
        if( Utils.isNull( parent ) || !cc.valid( parent ) ) {
            parent = G.ViewManager.getScene().getNode();
        }
        child.setContentSize( parent.getContentSize() );
        parent.addChild( child );
    },

});

module.exports = Loading;
