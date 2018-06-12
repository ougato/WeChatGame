/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 配置
 * @type {{}}
 */

let DefLanguage = require( "DefLanguage" );
let DefView = require( "DefView" );

const Config = {
    // 是否调试模式
    isDebug: false,
    // 默认场景
    defaultScene: DefView.Scene.Welcome,
    // 默认语言
    defaultLanguage: DefLanguage.CN,

};

module.exports = Config;