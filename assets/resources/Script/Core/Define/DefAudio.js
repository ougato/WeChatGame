/**
 * Author: oucheng(ougato@gmail.com)
 * Copyright (c) 2018-03
 */

/**
 * 状态
 */
let State = {
    ERROR: -1,
    INITIALZING: 0,
    PLAYING: 1,
    PAUSE: 2,
};

/**
 * 音效
 */
let Sound = {
    MJ2T: "resources/Audio/Sound/MJ2T.mp3",
};

/**
 * 音乐
 */
let Music = {
    GAME_BGM: "resources/Audio/Music/BGM.mp3",
};

module.exports = {
    State: State,
    Sound: Sound,
    Music: Music,
};