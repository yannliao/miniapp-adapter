# miniapp-adapter
miniapp-adapter 的目的是为了使 three.js 能够在小程序里面运行的适配层。类似于微信小游戏[weapp-adapter](https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/base/adapter.html)

----

本项目基于 [finscn/weapp-adapter](https://github.com/finscn/weapp-adapter), 但是只适用于小程序。针对 [three.js](https://github.com/mrdoob/three.js/) 框架做适配, 如需在小程序中使用 three.js 请使用 我fork的 three.js. [https://github.com/yannliao/three.js](https://github.com/yannliao/three.js)

## 辅助函数或变量
`window.anvas` 为当前使用的Canvas对象。

`window._canvasMap`  为当前注册了的canvas对象的Map集合。

`window.registerCanvas` 注册canvas对象。 当传入`(id<string>, canvas<object>)`时将使用id作为key， canvas作为value插入到_canvasMap中。当传入`(canvas<object>)`时，key为`canvas._canvasId`, value 为 canvas 对象。 注册时将当canvas对象作为使用对象。canvas为小程序中的Canvas对象。 通过wx.createSelectorQuery()获得。**canvas对象使用完后一定要及时`unregisterCanvas`,否则可能造成内存消耗过多。目前_canvasMap设置为5,多余的会被随机清除。**

`window.unregisterCanvas` 反注册canvas对象。可以传入`id<string>`或`canvas<object>`. **canvas对象使用完后一定要及时`unregisterCanvas`,否则可能造成内存消耗过多。目前_canvasMap设置为5,多余的会被随机清除。**

`window.clearCanvas` 函数清空_canvasMap。

`window.touchEventHandlerFactory`  该函数用于生成小程序事件处理函数。由于小程序架构原因, 需要手动绑定事件到canvas或者document上。如在小程序`touchstart`事件处理函数中调用 `window.touchEventHandlerFactory('canvas', 'touchstart')(e)` 可以触发当前canvas对象上的 `touchstart` 事件,从而可以回调相应事件处理函数。主要用于three.js中的 OrbitControl 等。