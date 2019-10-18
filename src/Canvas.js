// import { HTMLCanvasElement, CanvasRenderingContext2D, WebGLRenderingContext } from './constructor'
import HTMLElement from './HTMLElement'
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
        Mixin.copyProperties(_canvas.constructor, HTMLElement); // 拷贝静态属性
        Mixin.copyProperties(_canvas.constructor.prototype, element.prototype); // 拷贝原型属性
    }
    return _canvas
}

export { _canvas }
export default Canvas