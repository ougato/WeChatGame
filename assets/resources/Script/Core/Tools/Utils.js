/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 常用 工具对象
 * @type {Function}
 */

let Utils = {

    /**
     * 判断是否为空
     * @param value
     * @returns {boolean}
     */
    isNull: function( value ) {
        let flag = false;
        if( value === null || value === undefined ) {
            flag = true
        }
        return flag;
    },

    /**
     * 判断是否类型为对象
     * @param value
     * @returns {boolean}
     */
    isObject( value ) {
        let flag = false;
        if( typeof( value ) === "object" ) {
            if( !(value instanceof Array) ) {
                flag = true;
            }
        }
        return flag;
    },

    /**
     * 判断是否类型为数组
     * @param value
     * @returns {boolean}
     */
    isArray( value ) {
        let flag = false;
        if( typeof( value ) === "object" ) {
            if( value instanceof Array ) {
                flag = true;
            }
        }
        return flag;
    },

    /**
     * 判断是否类型为数字
     * @param value
     * @returns {boolean}
     */
    isNumber( value ) {
        let flag = false;
        if( typeof( value ) === "number" ) {
            flag = true;
        }
        return flag;
    },

    /**
     * 判断是否类型为字符串
     * @param value
     * @returns {boolean}
     */
    isString( value ) {
        let flag = false;
        if( typeof( value ) === "string" ) {
            flag = true;
        }
        return flag;
    },

    /**
     * 判断是否类型为布尔
     * @param value
     * @returns {boolean}
     */
    isBoolean( value ) {
        let flag = false;
        if( typeof( value ) === "boolean" ) {
            flag = true;
        }
        return flag;
    },

    /**
     * 获取key 通过value
     * @param object
     * @param value
     * @returns {*}
     */
    getKeyByValue( object, value ) {
        let key = null;
        for( let k in object ){
            if( object[k] === value ) {
                key = k;
                break;
            }
        }
        return key;
    },

};

module.exports = Utils;