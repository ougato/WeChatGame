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
const Zorder = {
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
const Scene = {
    Welcome: "Welcome",
    Lobby: "Lobby",

};

/**
 * 预制
 */
const Prefab = {

};

module.exports = {
    SPAN: SPAN,
    Zorder: Zorder,
    PREFAB_PATH: PREFAB_PATH,
    SCENE_PATH: SCENE_PATH,
    Scene: Scene,
    Prefab: Prefab,
};