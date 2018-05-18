/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 消息节点
 */

let DefEvent = require( "DefEvent" );

let EventMsg = cc.Class({

    /**
     * 构造
     */
    ctor() {
        // 消息ID
        this.m_nId = 0;
        // 数据
        this.m_objData = null;
        // 错误
        this.m_strError = "";

    },

    /**
     * 获取事件ID
     * @returns {number}
     */
    getEventId() {
        let eventId = Math.floor( this.m_nId / DefEvent.SPAN );
        return eventId * DefEvent.SPAN;
    },

    /**
     * 设置消息ID
     * @param id
     */
    setId( id ) {
        this.m_nId = id;
    },

    /**
     * 获取消息ID
     * @returns {number|*}
     */
    getId() {
        return this.m_nId;
    },

    /**
     * 设置数据
     * @param data
     */
    setData( data ) {
        this.m_objData = data;
    },

    /**
     * 获取数据
     * @returns {null|*}
     */
    getData() {
        return this.m_objData;
    },

    /**
     * 设置错误原因
      * @param error
     */
    setError( error ) {
        this.m_strError = error;
    },

    /**
     * 获取错误原因
     * @returns {string|*}
     */
    getError() {
        return this.m_strError;
    },

});

module.exports = EventMsg;