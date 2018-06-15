/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-06
 */

/**
 * 网络基类
 */

let Utils = require( "Utils" );

let NetBase = cc.Class({

    /**
     * 构造
     */
    ctor() {
        // 路径
        this.m_strPath = "";
        // 数据
        this.m_objData = null;
        // 根节点
        this.m_objNode = null;

    },

    /**
     * 销毁视图
     */
    destroy() {

    },

});

module.exports = NetBase;