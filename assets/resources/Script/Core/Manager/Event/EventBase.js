/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 事件基类
 */

let List = require( "List" );
let Utils = require( "Utils" );

let EventBase = cc.Class({

    /**
     * 构造
     */
    ctor() {
        // 存储消息结构 事件列表
        this.m_mapEventList = new Map();

    },

    /**
     * 销毁
     */
    destroy() {
        this.m_mapEventList.clear();
        this.m_mapEventList = null;
    },

    /**
     * 内部函数 注册事件_1
     * @param script
     * @param eventId
     * @private
     */
    _register1( script, eventId ) {
        if( Utils.isNull( this.m_mapEventList.get( eventId ) ) ) {
            this.m_mapEventList.set( eventId, new List() );
        }
        let list = this.m_mapEventList.get( eventId );
        if( Utils.isNull( list.find( script ) ) ) {
            list.insert( script );
        }
    },

    /**
     * 内部函数 注册事件_2
     * @param script
     * @param eventIds
     * @private
     */
    _register2( script, eventIds ) {
        for( let i = 0; i < eventIds.length; ++i ) {
            this._register1( script, eventIds[i] );
        }
    },

    /**
     * 注册 消息事件（注：通过参数类型来重载注册函数）
     * 一、在脚本对象内，注册一个消息ID
     * 参数1 object 脚本对象
     * 参数2 number 消息ID
     *
     * 二、在脚本对象内，注册多个消息ID
     * 参数1 object 脚本对象
     * 参数2 array 消息ID数组
     */
    register() {
        // 参数
        // [ 0.可变参数 1.可变参数 ]
        let param1 = arguments[0];
        let param2 = arguments[1];

        // 脚本 注册 一个事件ID
        if( Utils.isObject( param1 ) && Utils.isNumber( param2 ) ) {
            this._register1( param1, param2 );
        // 脚本 注册 多个事件ID
        } else if( Utils.isObject( param1 ) && Utils.isArray( param2 ) ) {
            this._register2( param1, param2 );
        }
    },

    /**
     * 内部函数 删除注册事件_1
     * @param script
     * @param eventId
     * @private
     */
    _unRegister1( script, eventId ) {
        let list = this.m_mapEventList.get( eventId );
        if( !Utils.isNull( list ) && !Utils.isNull( list.find( script ) ) ) {
            list.delete( script );
            if( list.isEmpty() ) {
                this.m_mapEventList.delete( eventId );
            }
        }
    },

    /**
     * 内部函数 删除注册事件_2
     * @param script
     * @param eventIds
     * @private
     */
    _unRegister2( script, eventIds ) {
        for( let i = 0; i < eventIds.length; ++i ) {
            this._unRegister1( script, eventIds[i] );
        }
    },

    /**
     * 卸载注册 消息事件
     * （注：通过参数类型来重载函数）
     * 一、在脚本对象内，卸载一个消息ID
     * 参数1 object 脚本对象
     * 参数2 number 消息ID
     *
     * 二、在脚本对象内，卸载多个消息ID
     * 参数1 object 脚本对象
     * 参数2 array 消息ID数组
     */
    unRegister() {
        // 参数
        // [ 0.可变参数 1.可变参数 ]
        let param1 = arguments[0];
        let param2 = arguments[1];

        if( Utils.isNumber( param1 ) && Utils.isObject( param2 ) ) {
            this._unRegister1( param1, param2 );
        } else if( Utils.isObject( param1 ) && Utils.isArray( param2 ) ) {
            this._unRegister2( param1, param2 );
        }
    },

    /**
     * 发送 消息事件（提供给子类重写函数，无需实现）
     * @param event
     */
    sendEvent( event ) {

    },

    /**
     * 接收 消息事件 回调
     * @param event {object} EventMsg 消息节点
     */
    onEvent( event ) {
        let list = this.m_mapEventList.get( event.getId() );
        if( !Utils.isNull( list ) ) {
            list.forEach( function( node ) {
                let data = node.getData();
                data.onEvent( event );
            }.bind( this ) );
        }
    },

});

module.exports = EventBase;