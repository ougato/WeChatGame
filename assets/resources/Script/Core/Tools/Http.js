/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * HTTP 工具对象
 * @type {Function}
 */

let Utils = require( "Utils" );

// 超时时间（s）
const TIMEOUT = 5;

let Http = {
    /**
     * 请求HTTP
     * @param url {string} 链接
     * @param data {string} [数据]
     * @param callback {function} [回调]
     * @private
     */
    _req() {
        let url = arguments[0];
        let data = null;
        let callback = null;
        let len = arguments.length;

        G.ViewManager.openLoading();

        let xhr = new XMLHttpRequest();
        xhr.timeout = TIMEOUT * 1000;

        // 完成回调
        xhr.onreadystatechange = function() {
            if( xhr.readyState === 4 ) {
                if( xhr.status >= 200 && xhr.status < 400 ) {
                    let response = xhr.responseText;
                    let result = JSON.parse( response );
                    if( !Utils.isNull( callback ) ) {
                        callback( result );
                    }
                } else {
                    G.ViewManager.openTips( Utils.format( G.I18N.get( 2 ), ( xhr.status ) ) );
                }
                G.ViewManager.closeLoading();
            }
        };
        // 超时回调
        xhr.ontimeout = function() {
            G.ViewManager.openTips( G.I18N.get( 4 ) );
            G.ViewManager.closeLoading();
        };

        if( len === 2 ) {
            callback = arguments[1];
            xhr.open( "GET", url, true );
            xhr.send();
        } else if( len === 3 ) {
            data = arguments[1];
            callback = arguments[2];
            xhr.open( "POST", url, true );
            if( Utils.isObject( data ) ) {
                data = JSON.stringify( data );
            }
            xhr.send( data );
        }
    },

    /**
     * POST请求
     * @param url {string} 链接
     * @param data {string} 数据
     * @param callback {function} 回调
     */
    post( url, data, callback ) {
        this._req( url, data, callback );
    },

    /**
     * GET请求
     * @param url {string} 链接
     * @param callback {function} 回调
     */
    get( url, callback ) {
        this._req( url, callback );
    },
};

module.exports = Http;