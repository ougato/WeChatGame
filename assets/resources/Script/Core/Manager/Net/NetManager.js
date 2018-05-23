/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 网络管理器
 */

let Utils = require( "Utils" );
let DefNet = require( "DefNet" );

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
        // 网络对象
        this.m_objWS = null;
        // 网络状况
        this.m_nState = DefNet.State.NONE;
        // 当前重连次数
        this.m_nCurrReconectCount = 0;
        // 数据队列
        this.m_objQueue = {};
        // 接收数据
        this.m_objRecvData = null;
        // 超时定时器
        this.m_nTimeoutId = 0;

    },

    /**
     * 连接
     * @param url
     * @param protocol
     */
    connect( url, protocol ) {
        this.m_nState = DefNet.State.CONNECT;
        let ws = null;
        if( Utils.isNull( protocol ) ) {
            ws = new WebSocket( url );
        } else {
            ws = new WebSocket( url, protocol );
        }

        ws.onopen = this.onOpen;
        ws.onmessage = this.onMessage;
        ws.onerror = this.onError;
        ws.onclose = this.onClose;

        this.m_objWS = ws;
    },

    /**
     * 断开连接
     */
    disconnect() {
        this.m_nState = DefNet.State.DISCONNECT;

    },

    /**
     * 销毁
     */
    destroy() {
        this.m_nState = DefNet.State.NONE;

    },

    /**
     * 获取状态
     * @returns {*}
     */
    getState() {
        return this.m_nState;
    },

    /**
     * 连接成功 回调
     */
    onOpen() {
        this.m_nState = DefNet.State.CONNECTED;

    },

    /**
     * 消息数据 回调
     * @param event {object} 事件对象
     */
    onMessage( event ) {

    },

    /**
     * 网络错误 回调
     * @param event {object} 事件对象
     */
    onError( event ) {

    },

    /**
     * 网络关闭 回调
     * @param event {object} 事件对象
     */
    onClose( event ) {

    },

});

module.exports = NetManager;