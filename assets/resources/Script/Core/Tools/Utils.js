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

    /**
     * 解包
     * @param str {string|*}
     * @returns {*}
     */
    unpack( str ) {
        function _detect( str ) {
            return /^let _0x[a-f0-9]+ ?\= ?\[/.test( str );
        }

        function _smart_split( str ) {
            let strings = [];
            let pos = 0;
            while( pos < str.length ) {
                if( str.charAt(pos) == '"' ) {
                    // new word
                    let word = '';
                    pos += 1;
                    while( pos < str.length ) {
                        if( str.charAt(pos) == '"' ) {
                            break;
                        }
                        if( str.charAt(pos) == '\\' ) {
                            word += '\\';
                            pos++;
                        }
                        word += str.charAt(pos);
                        pos++;
                    }
                    strings.push( '"' + word + '"' );
                }
                pos += 1;
            }
            return strings;
        }

        function _unescape( str ) {
            for ( let i = 32; i < 128; i++ ) {
                str = str.replace( new RegExp( '\\\\x' + i.toString(16 ), 'ig' ), String.fromCharCode(i) );
            }
            return str;
        }

        if( _detect(str) ) {
            let matches = /let (_0x[a-f\d]+) ?\= ?\[(.*?)\];/.exec(str);
            if( matches ) {
                let let_name = matches[1];
                let strings = _smart_split( _unescape(matches[2]) );
                let str = str.substring( matches[0].length );
                for ( let k in strings ) {
                    str = str.replace(new RegExp(let_name + '\\[' + k + '\\]', 'g'), strings[k]);
                }
            }
        }

        return str;
    },

    /**
     * 格式化字符串
     * let str = "a={0} b={1}"
     * format( str, 1, 2 );
     * "a=1 b=2"
     * @param str {string} 字符串
     * @param [] 变长参数
     * @returns {Utils}
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
            for( let i = 0; i < args.length; i++ ) {
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