/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 事件管理器
 */

let EventView = require( "EventView" );
let EventNet = require( "EventNet" );
let Utils = require( "Utils" );

// 实例化对象
let instance = null;

let EventManager = cc.Class({

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
                instance = new EventManager();
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
        // 视图事件对象
        this.m_objEventView = new EventView();
        // 网络事件对象
        this.m_objEventNet = new EventNet();

    },

    /**
     * 销毁
     */
    destroy() {
        this.m_objEventView.destroy();
        this.m_objEventView = null;
        this.m_objEventNet.destroy();
        this.m_objEventNet = null;
    },

    /**
     * 获取视图事件
     */
    getEventView() {
        return this.m_objEventView;
    },

    /**
     * 获取网络事件
     */
    getEventNet() {
        return this.m_objEventNet;
    },

});

module.exports = EventManager;