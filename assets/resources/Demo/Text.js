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
let DefLoading = require( "DefLoading" );

cc.Class({
    extends: cc.Component,

    properties: {
        pBG: { default: null, type: cc.Sprite },
        pFrame: { default: null, type: cc.Sprite },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onClick() {
        G.ViewManager.openLoading( DefLoading.HTTP, this.pBG.node, this.pFrame.node );
    },

    onClose() {
        G.ViewManager.closeLoading( DefLoading.HTTP );
    },

    onClick2() {
        G.ViewManager.openLoading( DefLoading.HTTP, this.pFrame.node );
    }

    // update (dt) {},
});
