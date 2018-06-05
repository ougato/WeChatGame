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
const Event = {
    VIEW: SPAN * 0,
    NET: SPAN * 1,

};

/**
 * 自定义ID
 */
const Custom = {
    // VIEW
    VIEW_0: Event.VIEW + 0,
    VIEW_1: Event.VIEW + 1,
    VIEW_2: Event.VIEW + 2,

    // NET
    NET_0: Event.NET + 0,

};

module.exports = {
    SPAN: SPAN,
    Event: Event,
    Custom: Custom,
};