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
        // // 网络Socket
        // this.m_objSocket = null;
        // // 游戏ID
        // this.m_nGameId = 0;

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
    //
    // /**
    //  * 获取游戏ID
    //  * @returns {number|*}
    //  */
    // getGameId() {
    //     return this.m_nGameId;
    // },
    //
    // /**
    //  * 设置游戏ID
    //  * @param id {number} 游戏ID
    //  */
    // setGameId( id ) {
    //     this.m_nGameId = id;
    // },
    //
    // /**
    //  * 运行
    //  */
    // run( sceneName ) {
    //     if( Utils.isNull( sceneName ) ) {
    //         sceneName = G.Config.getDefaultScene();
    //     }
    //     G.ViewManager.replaceScene( sceneName );
    // },

});

module.exports = Game;