/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

/**
 * 网络管理器
 */

let Utils = require( "Utils" );
let NetWebSocket = require( "NetWebSocket" );
let Log = require( "Log" );
let DefLog = require( "DefLog" );

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
        // webSocket列表
        this.m_mapWebSocket = new Map();
        // socket列表
        this.m_mapSocket = new Map();

    },

    /**
     * 销毁
     */
    destroy() {
        this.m_mapWebSocket.clear();
        this.m_mapSocket.clear();
        this.m_mapWebSocket = null;
        this.m_mapSocket = null;
    },

    /**
     * webSocket通信
     * @param gameId
     */
    webSocket( gameId ) {
        if( Utils.isNull( this.m_mapWebSocket.get( gameId ) ) ) {
            Log.error( DefLog[0] );
            return null;
        }
        this.m_mapWebSocket.set( gameId, new NetWebSocket( gameId ) );
    },


    /**
     * socket通信
     */
    socket() {

    },

    /**
     * http通信
     * @param url
     * @param str
     * @param callback
     */
    http( url, str, callback ) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status < 400 ) ) {
                let response = xhr.responseText;
                console.log( response );
            }
        };

        let mode = "";
        if( !Utils.isNull( str ) && str.length > 0 ) {
            mode = "POST";
        } else {
            mode = "GET";
            str = "";
        }

        xhr.open( mode, url, true );
        xhr.timeout = 5000;
        xhr.send( str );
    },



});

module.exports = NetManager;