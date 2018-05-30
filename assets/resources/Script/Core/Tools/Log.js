/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 日志 工具对象
 * @type {Function}
 */

let DefLog = require( "DefLog" );

let Log = {

    /**
     * 错误提示
     */
    error( text, type ) {
        let suffix = "";
        if( !Utils.isNull( type ) ) {
            suffix = this.getText( type );
        }
        cc.error( text + suffix );
    },

    /**
     * 警告提示
     */
    warn( text, type ) {
        let suffix = "";
        if( !Utils.isNull( type ) ) {
            suffix = this.getText( type );
        }
        cc.warn( text + suffix );
    },

    /**
     * 正常提示
     */
    print( text, type ) {
        let suffix = "";
        if( !Utils.isNull( type ) ) {
            suffix = this.getText( type );
        }
        cc.log( text + suffix );
    },

};

module.exports = Log;