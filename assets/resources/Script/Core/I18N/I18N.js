/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 国际语言
 */

let Utils = require( "Utils" );

// 实例化对象
let instance = null;

let I18N = cc.Class({

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
                instance = new I18N();
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
        // 语言
        this.m_objLanguage = null;
    },

    /**
     * 销毁
     */
    destroy() {
        if( Utils.isNull( this.m_objLanguage ) ) {
            this.m_objLanguage = null;
        }
    },


});

module.exports = I18N;