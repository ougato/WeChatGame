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
        // // 网络对象
        // this.m_objWS = null;
        // // 网络状况
        // this.m_nState = DefNet.State.NONE;
        // // 当前重连次数
        // this.m_nCurrReconectCount = 0;
        // // 数据队列
        // this.m_objQueue = {};
        // // 接收数据
        // this.m_objRecvData = null;
        // // 超时定时器
        // this.m_nTimeoutId = 0;
        // // 心跳定时器
        // this.m_funcHeartCallback = this.onHeartCheckout;

    },

    /**
     * 发送数据
     * @param id {number} 协议ID
     * @param data {object} 数据
     */
    send( id, data ) {
        if( this.m_nState !== DefNet.State.OPEN ) {
            Log.print( CN )
        }
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
        this.schedule( this.m_funcHeartCallback, DefNet.Const.HEAR_GAP );
    },

    /**
     * 关闭心跳
     */
    stopHeart() {
        this.unschedule( this.m_funcHeartCallback );
    },

    /**
     * 获取状态
     * @returns {*}
     */
    getState() {
        return this.m_nState;

    },

    http( url, str, callback ) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status < 400 ) ) {
                let response = xhr.responseText;
                console.log(response);
            }
        };
        if( !Utils.isNull( str ) && str.length > 0 ) {
            xhr.open("POST", url, true);
            xhr.send();
        } else {
            xhr.open("GET", url, true);
            xhr.send();
        }
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

module.exports = NetManager;