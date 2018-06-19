/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 网络WebSocket
 */

let DefNet = require( "DefNet" );

// 实例化对象
let instance = null;

let Websocket = cc.Class({

    /**
     * 构造
     * @param gameId {number} 游戏ID
     */
    ctor() {
        // 游戏ID
        this.m_nGameId = 0;
        // 网络对象
        this.m_ws = null;
        // 网络状况
        this.m_nState = DefNet.State.NONE;
        // 重连次数
        this.m_nReconectCount = 0;
        // 发送队列
        this.m_objSendQueue = [];
        // 超时定时器
        this.m_nTimeoutId = 0;

        this.initData( arguments[0] );

    },

    /**
     * 初始化数据
     * @param gameId {number} 游戏ID
     */
    initData( gameId ) {
        this.m_nGameId = gameId;
    },

    /**
     * 连接
     * @param url {string} 链接
     * @param protocol {number} [协议类型]
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

    },

    /**
     * 销毁
     */
    destroy() {
        this.m_nState = DefNet.State.NONE;

    },

    /**
     * 发送心跳
     */
    sendHeart() {
        // TODO 心跳请求
    },

    /**
     * 心跳检测 计时器
     */
    onHeartCheckout() {
        this.sendHeart();
    },

    /**
     * 开始心跳
     */
    startHeart() {
        this.m_nTimeoutId = setInterval( this.m_funcHeartCallback, DefNet.Const.HEAR_GAP );
    },

    /**
     * 关闭心跳
     */
    stopHeart() {
        clearInterval( this.m_nTimeoutId );
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
        this.m_nState = DefNet.State.OPEN;


        this.startHeart();
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
        this.m_nState = DefNet.State.ERROR;

    },

    /**
     * 网络关闭 回调
     * @param event {object} 事件对象
     */
    onClose( event ) {
        this.m_nState = DefNet.State.CLOSE;

    },

});

module.exports = Websocket;