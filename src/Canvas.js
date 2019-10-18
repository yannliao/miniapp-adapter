// import { HTMLCanvasElement, CanvasRenderingContext2D, WebGLRenderingContext } from './constructor'
import HTMLElement from './HTMLElement'
import EventTarget from './EventTarget'

import * as Mixin from './util/mixin'

let hasModifiedCanvasPrototype = false
let hasInit2DContextConstructor = false
let hasInitWebGLContextConstructor = false

let _canvas = null
function Canvas(canvas) {
    if (!_canvas) {
        if (!canvas) {
            throw new Error('need a canvas')
        }
        _canvas = canvas
        _canvas.type = 'canvas';
        let element = new HTMLElement('canvas')
        Mixin.copyProperties(_canvas, element); // 拷贝实例属性
        Mixin.copyProperties(_canvas.constructor.prototype, EventTarget.prototype); // 拷贝EventTarget原型属性
        Mixin.copyProperties(_canvas.constructor.prototype, HTMLElement.prototype); // 拷贝HTMLElement原型属性
    }
    return _canvas
}

export { _canvas }
export default Canvas