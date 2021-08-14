# FGO scripting
主要功能使用指南：https://github.com/csvwolf/fgo-auto-scripts/wiki

## 说明
安卓 App FGO 自动刷图（使用前请开启技能确认功能）。

**不保证都能用，坐标偏移不修（可能是不同设备分辨率之类的奇怪的问题）**

确定可以的测试设备：
- MI 10(MiUI 12.5)

### Features
#### 刷图

1. 默认脚本打手固定二号位，<del>不支持配置</del>（口嫌体正直的做了），配置见自定义语法。
2. 自动检测 Caber 助战（别的助战暂不支持<del>现在满大街 Caber 怎么刷别的助战</del>，只检测从者，不检测礼装）
3. 自动吃苹果
4. 无脑自定义多 T

#### 友情池

1. 自动抽友情池（只负责抽，不负责 new 和卖或者搓丸子，可能之后会加，有点麻烦）

#### 无限池

1. 还没做，因为没有无限池，就没有图片素材和测试

### 下载
> 先在 release 里捞到安卓安装包。兼容性我也母鸡啊，如果你打不开不是因为第 0 点的原因那就是不支持吧。

GitHub Relaease: <https://github.com/csvwolf/fgo-auto-scripts/releases>

### 使用

0. 第一次打开辅助需要授权显示在其他应用上方和无障碍模式，请授权。
1. 辅助主界面配置，点击 Start!
2. 进入 1T 战斗界面，点击悬浮框「开始运行」
3. 等待执行（建议先观察一下自己能不能光炮扫荡再放置 play）

> 不吃苹果：体力清空，结束战斗
> 吃苹果，苹果吃完或手动停止脚本。
> （苹果吃完这一点暂不确定但是找不到苹果应该会识别失败如果吃了石头别怪我）

### 吐槽

- auto.js 制作。（但是由于语法太 TM 难用是低版 ES 还有 bug 我哭了。）
- **安卓好难哦。UI 到底怎么画拉**
- <del>MMP 写了个 Bug 把石头当苹果吃了，好气</del>

## TODO
- **UI 过丑，但是 android UI 好难哦 -^-**

## Screenshot
安卓 UI 我不会啊！

![Screenshot_2021-08-08-15-02-01-375_org autojs aut](https://user-images.githubusercontent.com/8280645/128623898-1edf583a-ea39-4dd1-b061-c28f82cbbe9c.jpg)
![Screenshot_2021-08-08-15-02-05-522_org autojs aut](https://user-images.githubusercontent.com/8280645/128623901-459d9c90-c935-43d8-9dba-7e655d4ef2f1.jpg)
![Screenshot_2021-08-08-15-02-07-903_org autojs aut](https://user-images.githubusercontent.com/8280645/128623904-27190928-3705-42ba-8094-a6a07270e64b.jpg)

