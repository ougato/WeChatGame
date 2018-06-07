# 框架说明文档

##  [**AudioManager**](https://github.com/ougato/WeChatGame/blob/master/assets/resources/Script/Core/Manager/Audio/AudioManager.js) **声音管理器**

> * 控制应用内的声音管理器
> * **`播放 停止 暂停 恢复`**

### **播放**

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

### **停止**

```javascript
    /**
     * 停止音乐
     */
    AudioManager.stopMusic();

    /**
     * 停止音效
     * @param id {number} 音效ID
     */
    AudioManager.stopSound( id );

    /**
     * 停止所有声音
     */
    AudioManager.stopAll();
```

### **暂停**

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

### **恢复**

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

##  [**AudioManager**](https://github.com/ougato/WeChatGame/blob/master/assets/resources/Script/Core/Manager/View/ViewManager.js) **视图管理器**

> * 控制应用内 **场景 预制** 打开和关闭的管理器
> * **打开预制 关闭预制 切换场景 打开提示 关闭提示**

### **打开**

```javascript
    /**
     * 打开预制体
     * @param pathName {string} 预制名（prefab文件夹后的路径+预制名）
     * @param data {object} 数据
     * @param zorder {number} 层级
     * @param callback {function} 预制体加载完成 回调
     */
    openPrefab( pathName, data, zorder, callback );
    
    /**
     * 打开飘动提示
     * @param text {string} 提示文字
     */
    openTips( text );
```

### **关闭**

```javascript
    /**
     * 关闭预制体
     * @param pathName {string} 预制名（prefab后的 路径+预制名）
     */
    closePrefab( pathName );
    
    /**
     * 关闭飘动提示
     */
    closeTips();
```

### **切换**
```javascript
    /**
     * 切换场景
     * @param name
     * @param data
     * @param callback {function} 场景加载完后回调
     */
    replaceScene( name, data, callback );
```