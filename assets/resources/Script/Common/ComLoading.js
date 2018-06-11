/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-05
 */

let UIBase = require( "UIBase" );

cc.Class({
    extends: UIBase,

    properties: {
        spriteBG: { default: null, type: cc.Sprite, tooltip: "背景图片" },
        labelText: { default: null, type: cc.Label, tooltip: "提示文字" },
        spriteLoading: { default: null, type: cc.Sprite, tooltip: "转圈菊花" },
    },

    onLoad () {
        this.initData();
        this.initView();
        this.register();
    },

    start () {

    },

    /**
     * 初始化数据
     */
    initData() {

    },

    /**
     * 初始化视图
     */
    initView() {

    },

    /**
     * 注册事件
     */
    register() {

    },

    /**
     * 转动菊花
     */
    runLoading() {

    },

    stopLoading() {

    },

    // update (dt) {},
});
