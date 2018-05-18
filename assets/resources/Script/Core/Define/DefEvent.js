/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 间隔ID
 */
const SPAN = 3000;

/**
 * 事件ID段
 */
const EVENT = {
    VIEW: SPAN * 0,
    NET: SPAN * 1,
    AUDIO: SPAN * 2,
};

/**
 * 自定义ID
 */
const CUSTOM = {
    // VIEW
    VIEW_0: EVENT.VIEW + 0,
    VIEW_1: EVENT.VIEW + 1,
    VIEW_2: EVENT.VIEW + 2,

    // NET
    NET_0: EVENT.NET + 0,

    // AUDIO
    AUDIO_0: EVENT.AUDIO + 0,
};

module.exports = {
    SPAN: SPAN,
    EVENT: EVENT,
    CUSTOM: CUSTOM,
};