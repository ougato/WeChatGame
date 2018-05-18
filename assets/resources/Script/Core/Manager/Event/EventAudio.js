/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 网络事件
 */

let EventBase = require( "EventBase" );
let EventCenter = require( "EventCenter" );
let DefEvent = require( "DefEvent" );

let EventAudio = cc.Class({
    extends: EventBase,

    /**
     * 构造
     */
    ctor() {

    },

    /**
     * 发送 消息事件
     * @param event
     */
    sendEvent( event ) {
        if( event.getEventId() === DefEvent.EVENT.AUDIO ) {
            this.onEvent( event );
        } else {
            EventCenter.getInstance().sendEvent( event );
        }
    },

});

module.export = EventAudio;