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
let ViewManager = require( "ViewManager" );
let I18N = require( "I18N" );

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
        NetManager.getInstance().register( code, this.s2cPing.bind( this ) );
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
        this.startPing();
    },

    /**
     * 消息数据 回调
     * @param event {object} 事件对象
     */
    onMessage( event ) {
        // // TODO Protobuf 回来的协议数据，消息ID和消息数据 处理注册回调
        // let code = event.id;
        // let data = event.data;
        // let callback = NetManager.getInstance().getCallbackByCode( code );
        // callback( event );
    },

    /**
     * 网络错误 回调
     */
    onError() {
        this.m_nState = DefNet.State.ERROR;
        this.stopPing();
    },

    /**
     * 网络关闭 回调
     */
    onClose() {
        this.m_nState = DefNet.State.CLOSE;
        this.stopPing();
    },

    /**
     * 是否心跳
     * @param code {number} 协议号
     */
    isPing( code ) {
        // // 判断心跳ID
        // let flag = false;
        // // TODO 判断code是否等于心跳ID
        // if( code === null ) {
        //     flag = true;
        // }
        // return flag
    },

    /**
     * 发送通信数据
     */
    send( data ) {
        // // TODO Protobuf 序列化后发送
        // if( this.m_nState !== DefNet.State.OPEN ) {
        //     ViewManager.getInstance().openTips( I18N.getInstance().get( 6 ) );
        //     return null;
        // }
        // this.m_objWS.send( data );
        // if( !this.isPing() ) {
        //     this.m_nSendTimerId = this.setTimeout( , DefNet.Const.MESSAGE_TIMEOUT );
        // }
    },

    /**
     * 发送消息超时
     */
    onSendTimeout() {

    },

    /**
     * 发送心跳
     */
    c2sPing() {
        // TODO 发送心跳
    },

    /**
     * 接收心跳
     */
    s2cPing( data ) {
        // TODO 接收心跳
    },

    /**
     * 开始心跳
     */
    startPing() {
        this.m_nPingTimerId = setInterval( function() {
            this.c2sPing();
        }.bind( this ), DefNet.Const.PING_GAP );
    },

    /**
     * 关闭心跳
     */
    stopPing() {
        clearInterval( this.m_nPingTimerId );
    },

});

module.exports = NetBase;