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
     * 判断是否类型为JSON
     * @param value
     */
    isJson( value ) {
        let flag = false;
        if( typeof( value ) === "string" ) {
            try {
                let obj = JSON.parse( value );
                if( this.isObject( obj ) ) {
                    flag = true;
                } else {
                    flag = false;
                }
            } catch( e ) {
                flag = false;
            }
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

    /**
     * 格式化字符串
     * let str = "a={0} b={1}"
     * format( str, 1, 2 );
     * "a=1 b=2"
     * @param str {string} 字符串
     * @param [] 变长参数
     * @returns {*} 格式化后的字符串
     */
    format( str ) {
        function _removeFirst( arg ) {
            let args = [];
            for( let i = 1; i < arg.length; ++i ) {
                args[i-1] = arg[i];
            }
            return args;
        }

        let result = str;
        let args = _removeFirst( arguments );
        if( args.length > 0 ) {
            for( let i = 0; i < args.length; ++i ) {
                if( args[i] !== undefined ) {
                    //let reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题
                    let reg = new RegExp( "({)" + i + "(})", "g" );
                    result = result.replace( reg, args[i] );
                }
            }
        }
        return result;
    }

};

module.exports = Utils;