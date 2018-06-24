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
let ConfNet = require( "ConfNet" );
let ViewManager = require( "ViewManager" );
let I18N = require( "I18N" );
let DefLog = require( "DefLog" );

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
        // 发送超时定时器
        this.m_nSendTimerId = 0;
        // 心跳超时定时器
        this.m_nPingTimerId = 0;
        // 心跳消息ID
        this.m_nPingCmd = 0;

        this.register();

    },

    /**
     * 销毁视图
     */
    destroy() {
        this.m_nState = DefNet.State.NONE;

    },

    /**
     * 注册网络
     */
    register() {
        // 注册心跳
        G.NetManager.register( ConfNet.PING, this.s2cPing.bind( this ) );
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
        this.startPingTimer();
    },

    /**
     * 消息数据 回调
     * @param json {string} json字符串
     */
    onMessage( json ) {
        // TODO Protobuf 回来的协议数据，消息ID和消息数据 处理注册回调
        if( Utils.isJson( json ) ) {
            json = JSON.parse( json );
        }

        let cmd = json.cmd;
        let data = json.data;

        if( this.isPingCmd( cmd ) ) {
            this.stopSendTimer();
        }



        let callback = G.NetManager.getCallbackByCmd( cmd );
        callback( data );
    },

    /**
     * 网络错误 回调
     */
    onError() {
        this.m_nState = DefNet.State.ERROR;
        this.stopPingTimer();
    },

    /**
     * 网络关闭 回调
     */
    onClose() {
        this.m_nState = DefNet.State.CLOSE;
        this.stopPingTimer();
    },

    /**
     * 发送通信数据
     * @param cmd {number} 协议ID
     * @param data {object} 协议数据
     */
    send( cmd, data ) {
        // 判断网络已连接
        if( this.m_nState !== DefNet.State.OPEN ) {
            G.ViewManager.openTips( G.I18N.get( 6 ) );
            return null;
        }
        // 判断协议ID存在
        if( Utils.isNull( Utils.getKeyByValue( cmd ) ) ) {
            G.ViewManager.openLog( DefLog[6] );
            return null;
        }
        // 判断数据合法
        if( !Utils.isObject( data ) ) {
            G.ViewManager.openLog( DefLog[7] );
            return null;
        }
        let json = JSON.stringify( data );
        this.m_objWS.send( json );

        // 启动发送定时器
        if( !this.isPingCmd( cmd ) ) {
            this.startSendTimer();
        }
    },

    /**
     * 发送心跳
     */
    c2sPing() {
        // TODO 发送心跳
        let cmd = this.m_nPingCmd;
        let data = {};
        data.haijun = "haijun";
        this.send( cmd, data );
    },

    /**
     * 接收心跳
     */
    s2cPing( data ) {
        // TODO 接收心跳
        cc.log( data );
    },

    /**
     * 是否心跳ID
     */
    isPingCmd( cmd ) {
        return cmd === this.m_nPingCmd;
    },

    /**
     * 回调 消息发送定时器
     */
    onSendTimer() {

    },

    /**
     * 开始 消息发送定时器
     */
    startSendTimer() {
        this.m_nSendTimerId = setTimeout( function() {
            G.ViewManager.openTips( G.I18N.get( 8 ) );
            G.ViewManager.closeLoading();
        }, DefNet.Const.MESSAGE_TIMEOUT );
    },

    /**
     * 停止 消息发送定时器
     */
    stopSendTimer() {
        if( !Utils.isNull( this.m_nSendTimerId ) ) {
            clearInterval( this.m_nSendTimerId );
            this.m_nSendTimerId = null;
        }
    },

    /**
     * 开始心跳
     */
    startPingTimer() {
        this.m_nPingTimerId = setInterval( function() {
            this.c2sPing();
        }.bind( this ), DefNet.Const.PING_GAP );
    },

    /**
     * 关闭心跳
     */
    stopPingTimer() {
        if( !Utils.isNull( this.m_nPingTimerId ) ) {
            clearInterval( this.m_nPingTimerId );
            this.m_nPingTimerId = null;
        }
    },

});

module.exports = NetBase;