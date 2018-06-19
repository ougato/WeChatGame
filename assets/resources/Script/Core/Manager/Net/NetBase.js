/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-06
 */

/**
 * 网络基类
 */

let Utils = require( "Utils" );
let DefNet = require( "DefNet" );
let NetManager = require( "NetManager" );

let NetBase = cc.Class({

    /**
     * 构造
     */
    ctor() {
        // 网络状态
        this.m_nState = DefNet.State.NONE;
        // 网络对象
        this.m_objWS = null;
        // 重连次数
        this.m_nReconectCount = 0;
        // 发送队列
        this.m_objSendQueue = [];
        // 超时定时器
        this.m_nTimeoutId = 0;

        this.addProto();

    },

    /**
     * 销毁视图
     */
    destroy() {
        this.m_nState = DefNet.State.NONE;

    },

    /**
     * 添加协议消息
     */
    addProto() {
        // TODO 注册网络消息
        let code = 0;
        NetManager.getInstance().register( code, this.S2CPing.bind( this ) );
    },

    /**
     * 连接
     * @param url
     * @param protocol
     */
    connect( url, protocol ) {
        this.m_nState = DefNet.State.CONNECT;

        if( Utils.isNull( protocol ) ) {
            this.m_objWS = new WebSocket( url );
        } else {
            this.m_objWS = new WebSocket( url, protocol );
        }

        this.m_objWS.onopen = this.onOpen;
        this.m_objWS.onmessage = this.onMessage;
        this.m_objWS.onerror = this.onError;
        this.m_objWS.onclose = this.onClose;

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
     */
    onError() {
        this.m_nState = DefNet.State.ERROR;

    },

    /**
     * 网络关闭 回调
     */
    onClose() {
        this.m_nState = DefNet.State.CLOSE;
        this.stopPing();
    },

    /**
     * 发送通信数据
     */
    send( data ) {
        this.m_objWS.send( data );
    },

    /**
     * 发送心跳
     */
    C2SPing() {

    },

    /**
     * 接收心跳
     */
    S2CPing( data ) {

    },

    /**
     * 开始心跳
     */
    startPing() {
        this.m_nTimeoutId = setInterval( function() {
            this.C2SPing();
        }.bind( this ), DefNet.Const.HEAR_GAP );
    },

    /**
     * 关闭心跳
     */
    stopPing() {
        clearInterval( this.m_nTimeoutId );
    },

});

module.exports = NetBase;