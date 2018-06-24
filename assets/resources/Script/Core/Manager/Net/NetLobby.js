/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-06
 */

/**
 * 大厅 网络
 */

let NetBase = require( "NetBase" );

let NetLobby = cc.Class({
    extends: NetBase,

    /**
     * 构造
     */
    ctor() {
        // 心跳消息ID
        this.m_nPingCmd = 100;
    },

    /**
     * 销毁
     */
    destroy() {

    },

});

module.exports = NetLobby;