/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 事件处理中心
 * @type {Function}
 */
let DefEvent = require( "DefEvent" );
let EventManager = require( "EventManager" );

// 实例化对象
let instance = null;

let EventCenter = cc.Class({

    /**
     * 静态
     */
    statics: {

        /**
         * 获取实例
         * @returns {Function}
         */
        getInstance() {
            if( instance === null ) {
                instance = new EventCenter();
            }
            return instance;
        },
    },

    /**
     * 构造
     */
    ctor() {

    },

    /**
     * 发送消息
     * @param event
     */
    sendEvent( event ) {
        let eventId = event.getEventId();
        switch( eventId ) {
            case DefEvent.EVENT.VIEW:
                EventManager.getEventView().sendEvent( event );
                break;
            case DefEvent.EVENT.NET:
                EventManager.getEventNet().sendEvent( event );
                break;
            default:

                break;
        }
    },
});

module.exports = EventCenter;
