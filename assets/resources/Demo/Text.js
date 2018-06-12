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
let DefView = require( "DefView" );
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
        // G.ViewManager.openLoading( "爱你哟" );
        // this.arrLoading[this.index++] = G.ViewManager.openLoading();
        Http.get( "aaaa" );
    },

    onClick2() {
        G.ViewManager.openTips( "aaa" );
        // G.ViewManager.replaceScene( DefView.Scene.Lobby );
        // this.loading2 = G.ViewManager.openLoadingHttp( this.pFrame.node );
    },

    onClose1() {
        G.ViewManager.openLoading( "爱你哟" );
    },

    onClose2() {
        G.ViewManager.closeLoading( this.arrLoading[--this.index] );
    },


    // update (dt) {},
});
