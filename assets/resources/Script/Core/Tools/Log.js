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
     * 获取文字
     * @param type
     */
    getText( type ) {
        let text = "";
        switch( type ) {
            case DefLog.TYPE.CODER_ERROR:
                text = "程序哥哥出错啦";
                break;
            case DefLog.TYPE.CODER_WARN:
                text = "有警告哦 程序哥哥！";
                break;
            case DefLog.TYPE.CODER_PRINT:
                text = "程序哥哥 记得删除你的打印日志哦";
                break;
            case DefLog.TYPE.PLAYER_ERROR:
                text = "亲爱的用户 你刚才操作出错了 快告诉我们客服";
                break;
            case DefLog.TYPE.PLAYER_WARN:
                text = "老铁 警告了 请给客服说一下";
                break;
            case DefLog.TYPE.PLAYER_PRINT:
                text = "没毛病";
                break;
            default:

                break;
        }
        return " [" + text + "]";
    },

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