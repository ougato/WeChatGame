/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 状态
 */
let State = {
    // 错误
    ERROR: -1,
    // 默认
    NONE: 0,
    // 连接
    CONNECT: 1,
    // 连上
    OPEN: 2,
    // 重连
    RECONNECT: 3,
    // 断开
    CLOSE: 4,


};

/**
 * 常量
 */
let Const = {
    // 重连最大次数
    RECONNECT_COUNT: 5,
    // 发送消息超时(s)
    MESSAGE_TIMEOUT: 3,
    // 重连间隔时间(s)
    RECONNECT_GAP: 3,
    // 心跳间隔时间(s)
    PING_GAP: 3,

};

module.exports = {
    State: State,
    Const: Const,
};