/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * HTTP 工具对象
 * @type {Function}
 */

let Log = require( "Log" );
let DefLog = require( "DefLog" );
let Utils = require( "Utils" );
let DefLoading = require( "DefLoading" );

// 超时时间（s）
const TIMEOUT = 5;

let Http = {
    /**
     * 获取HTTP
     * @param url {string} 链接
     * @param str {string} [数据]
     * @param callback {function} [回调]
     * @private
     */
    _request() {
        G.ViewManager.openLoading( DefLoading.HTTP );
        let url = arguments[0];
        let data = null;
        let callback = null;
        let len = arguments.length;

        if( len === 2 ) {
            callback = arguments[1];
        } else if( len === 3 ) {
            data = arguments[1];
            callback = arguments[2];
        }

        let xhr = new XMLHttpRequest();
        xhr.timeout = TIMEOUT * 1000;
        xhr.onreadystatechange = function() {
            if ( xhr.readyState === 4 && ( xhr.status >= 200 && xhr.status < 400 ) ) {
                let response = xhr.responseText;
                try {
                    let result = JSON.parse( response );
                    callback( result );
                } catch( e ) {
                    G.ViewManager.openTips( G.I18N.get( 1 ) );
                }
            } else {
                G.ViewManager.openTips( Utils.format( G.I18N.get( 2 ), ( xhr.status ) ) );
            }
            G.ViewManager.closeLoading( DefLoading.HTTP );
        };
        if( len === 2 ) {
            xhr.open( "GET", url, true );
            xhr.send();
        } else if( len === 3 ) {
            xhr.open( "POST", url, true );
            if( Utils.isObject( data ) ) {
                try {
                    data = JSON.stringify( data );
                } catch( e ) {
                    G.ViewManager.openTips( G.I18N.get( 3 ) );
                    return null;
                }
            }
            xhr.send( data );
        }
    },

    /**
     * POST请求
     * @param url {string} 链接
     * @param str {string} 数据
     * @param callback {function} 回调
     */
    post( url, str, callback ) {
        if( !Utils.isString( url ) ) {
            Log.error( DefLog[1] );
            return null;
        }
        if( !Utils.isString( str ) ) {
            str = "";
        }
        if( !Utils.isObject( callback ) ) {
            Log.error( DefLog[2] );
            return null;
        }
        this._request( url, str, callback );
    },

    /**
     * GET请求
     * @param url {string} 链接
     * @param callback {function} 回调
     */
    get( url, callback ) {
        if( !Utils.isString( url ) ) {
            Log.error( DefLog[1] );
            return null;
        }
        if( !Utils.isObject( callback ) ) {
            Log.error( DefLog[2] );
            return null;
        }
        this._request( url, callback );
    },
};

module.exports = Http;