/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 网络管理器
 */

let Utils = require( "Utils" );
let Websocket = require( "Websocket" );

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
        // websocket对象列表
        this.m_mapWebsocket = new Map();

    },

    /**
     * 销毁
     */
    destroy() {
        this.m_mapWebsocket.clear();
        this.m_mapWebsocket = null;
    },


});

module.exports = NetManager;