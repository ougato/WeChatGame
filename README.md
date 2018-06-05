# 框架说明文档

## AudioManager

> * 控制应用内的声音管理器
> * **`播放 停止 暂停 恢复`**

### 播放

```javascript
    /**
     * 播放音乐
     * @param path {string} 路径+文件
     * @param loop {boolean} 是否循环
     * @param volume {number} 音量
     * @returns id {number} 音乐id
     */
    AudioManager.playMusic( path, loop, volume );

    /**
     * 播放音效
     * @param path {string} 路径+文件
     * @param volume {number} 音量
     * @returns id {number} 音效id
     */
    AudioManager.playSound( path, volume );
```

### 停止

```javascript
    /**
     * 停止音乐
     */
    AudioManager.stopMusic()

    /**
     * 停止音效
     * @param id {number} 音效ID
     */
    AudioManager.stopSound( id )

    /**
     * 停止所有声音
     */
    AudioManager.stopAll()
```

### 暂停

```javascript
    /**
     * 暂停音乐
     */
    AudioManager.pauseMusic();

    /**
     * 暂停音效
     * @param id {number} 音效ID
     */
    AudioManager.pauseSound( id );

    /**
     * 暂停所有声音
     */
    AudioManager.pauseAll();
```

### 恢复

```javascript
    /**
     * 恢复音乐
     */
    AudioManager.resumeMusic();

    /**
     * 恢复音效
     * @param id {number} 音效ID
     */
    AudioManager.resumeSound( id );

    /**
     * 恢复所有声音
     */
    AudioManager.resumeAll();
```


## EventManager

## ViewManager

## StoreManager

## NetManager
