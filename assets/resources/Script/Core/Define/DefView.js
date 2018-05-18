/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 间隔
 */
const SPAN = 100;

/**
 * 视图 层级
 */
const ZORDER = {
    BOTTOM: SPAN * 0,
    UI: SPAN * 1,
    TOP: SPAN * 2,
    POPUP: SPAN * 3,
    SYSTEM: SPAN * 4,
};

/**
 * 预制路径
 */
const PREFAB_PATH = "Prefab/";

/**
 * 场景路径
 */
const SCENE_PATH = "Scene/";

/**
 * 场景
 */
const SCENE = {
    WelCome: "WelCome",
    Lobby: "Lobby",

};

/**
 * PREFAB
 */
const PREFAB = {

};

module.exports = {
    SPAN: SPAN,
    ZORDER: ZORDER,
    PREFAB_PATH: PREFAB_PATH,
    SCENE_PATH: SCENE_PATH,
    SCENE: SCENE,
    PREFAB: PREFAB,
};