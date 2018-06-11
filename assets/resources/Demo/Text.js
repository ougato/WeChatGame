// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let Utils = require( "Utils" );

let Http = require( "Http" );

cc.Class({
    extends: cc.Component,

    properties: {
        pBG: { default: null, type: cc.Sprite },
        pFrame: { default: null, type: cc.Sprite },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.index = 0;
        this.arrLoading = [];
        this.loading1 = null;
        this.loading2 = null;
    },

    callfunc() {

    },

    onClick() {
        // this.arrLoading[this.index++] = G.ViewManager.openLoadingHttp( this.pFrame.node );
        Http.get( "http://localhost:7456/" );
    },

    onClick2() {
        // this.loading2 = G.ViewManager.openLoadingHttp( this.pFrame.node );
    },

    onClose1() {
        G.ViewManager.closeLoadingHttp( this.arrLoading[--this.index] );
    },

    onClose2() {
        G.ViewManager.closeLoadingHttp( this.arrLoading[--this.index] );
    },


    // update (dt) {},
});
