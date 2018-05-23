/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 游戏
 */

let Utils = require( "Utils" );

// 实例化对象
let instance = null;

let Game = cc.Class({

    /**
     * 静态
     */
    statics: {
        /**
         * 获取实例
         * @returns {Function}
         */
        getInstance() {
            if( Utils.isNull( instance ) ) {
                instance = new Game();
            }
            return instance;
        },

        /**
         * 销毁实例
         */
        destroy() {
            if( !Utils.isNull( instance ) ) {
                instance.destroy();
            }
        },

    },

    /**
     * 构造
     */
    ctor() {


    },

    /**
     * 初始化游戏需要的模块
     */
    init() {
        // 初始化SDK
        this.initSDK();
        // 初始化资源
        this.initRes();

    },

    /**
     * 初始化SDK
     */
    initSDK() {

    },

    /**
     * 初始化资源
     */
    initRes() {

    },

});

module.exports = Game;