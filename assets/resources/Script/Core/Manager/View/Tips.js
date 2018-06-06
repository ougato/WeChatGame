/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 提示
 */

let DefView = require( "DefView" );
let Utils = require( "Utils" );

let Tips = cc.Class({
    /**
     * 构造
     */
    ctor() {
        // 预制路径名
        this.m_strPathName = DefView.PREFAB_PATH + "Common/ComTips";
        // 文字
        this.m_strCurrText = null;
        // 根节点
        this.m_objNode = null;
        // 节点原位置
        this.m_objOriginPos = {};

    },

    /**
     * 销毁
     */
    destroy() {

    },

    /**
     * 提示条浮动
     */
    run() {
        if( Utils.isNull( this.m_objNode ) && cc.isValid( this.m_objNode ) ) {
            cc.MoveTo.create()
        }
    },

    /**
     * 显示
     * @param text {string} 提示文字
     */
    show( text ) {
        if( text === this.m_strCurrText ) {
            return;
        }

        if( Utils.isNull( this.m_objNode ) || cc.isValid( this.m_objNode ) ) {
            cc.loader.loadRes( this.m_strPathName, function( _, prefab ) {
                this.m_objNode = cc.instantiate( prefab );



            }.bind( this ) );
        }

        this.run();
    },

    /**
     * 隐藏
     */
    hide() {
        this.m_objNode.active = false;
    },

    /**
     * 初始化
     */
    init() {

    },
});

module.exports = Tips;
