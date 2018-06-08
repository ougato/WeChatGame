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
     * @param loadingParentNode {node} [loading父节点]
     * @private
     */
    _request() {
        let url = arguments[0];
        let data = null;
        let callback = null;
        let loadingParentNode = null;
        let len = arguments.length;

        if( len === 3 ) {
            callback = arguments[1];
            loadingParentNode = arguments[2];
        } else if( len === 4 ) {
            data = arguments[1];
            callback = arguments[2];
            loadingParentNode = arguments[3];
        }

        if( Utils.isNull( loadingParentNode ) ) {
            loadingParentNode = G.ViewManager.getScene().getNode();
        }

        let loadingHttp = G.ViewManager.openLoadingHttp( loadingParentNode );

        let xhr = new XMLHttpRequest();
        xhr.timeout = TIMEOUT * 1000;
        xhr.onreadystatechange = function() {
            let strTips = null;
            if ( xhr.readyState === 4 && ( xhr.status >= 200 && xhr.status < 400 ) ) {
                let response = xhr.responseText;
                try {
                    let result = JSON.parse( response );
                    callback( result );
                } catch( e ) {
                    strTips = G.I18N.get( 1 );
                }
            } else {
                strTips = Utils.format( G.I18N.get( 2 ), ( xhr.status ) );
            }

            G.ViewManager.closeLoadingHttp( loadingHttp );
            // if( !Utils.isNull( strTips ) ) {
            //     G.ViewManager.openTips( strTips );
            // }
        };
        if( len === 3 ) {
            xhr.open( "GET", url, true );
            xhr.send();
        } else if( len === 4 ) {
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
     * @param node {node} 父节点
     */
    post( url, str, callback, node ) {
        if( !Utils.isString( url ) ) {
            Log.error( DefLog[1] );
            return null;
        }
        if( !Utils.isString( str ) ) {
            str = "";
        }
        this._request( url, str, callback, node );
    },

    /**
     * GET请求
     * @param url {string} 链接
     * @param callback {function} 回调
     * @param node {node} 父节点
     */
    get( url, callback, node ) {
        if( !Utils.isString( url ) ) {
            Log.error( DefLog[1] );
            return null;
        }
        this._request( url, callback, node );
    },
};

module.exports = Http;