/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 全局 对象
 */

let AudioManager = require( "AudioManager" );
let EventManager = require( "EventManager" );
let ViewManager = require( "ViewManager" );
let StoreManager = require( "StoreManager" );
let NetManager = require( "NetManager" );

let I18N = require( "I18N" );
let Game = require( "Game" );

let Global = {
    // 声音管理器
    AudioManager: AudioManager.getInstance(),
    // 事件管理器
    EventManager: EventManager.getInstance(),
    // 视图管理器
    ViewManager: ViewManager.getInstance(),
    // 存储管理器
    StoreManager: StoreManager.getInstance(),
    // 网络管理器
    NetManager: NetManager.getInstance(),

    // 国际语言
    I18N: I18N.getInstance(),
    // 游戏
    Game: Game.getInstance(),

};

module.exports = Global;