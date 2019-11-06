// import { HTMLCanvasElement, CanvasRenderingContext2D, WebGLRenderingContext } from './constructor'
import HTMLElement from './HTMLElement'
import EventTarget from './EventTarget'

import * as Mixin from './util/mixin'

let hasModifiedCanvasPrototype = false
let hasInit2DContextConstructor = false
let hasInitWebGLContextConstructor = false

let _canvas = null //目前使用的canvas
let _canvasMap = new Map()
function registerCanvas(...argus) {
    let id = null
    let canvas = null
    if (argus.length === 0) {
        throw new Error('need arguments')
    } else if (argus.length === 1 && argus[0]._canvasId) {
        canvas = argus[0]
        id = argus[0]._canvasId
    } else if (argus.length === 2 && typeof argus[0] === 'string' && argus[1]._canvasId) {
        id = argus[0]
        canvas = argus[1]
    }

    if (!id || !canvas) {
        throw new Error('parameter err')
    }
    if (_canvasMap.size >= 5) {
        console.warn('canvas map size bigger 5 please remove unused canvas!')
        let key = _canvasMap.keys().next().value
        if (key) {
            _canvasMap.delete(key)
        }
    }
    if (_canvasMap.has(id)) {
        _canvas = _canvasMap.get(id)
    } else {
        let element = new HTMLElement('canvas')
        if (!canvas.tagName || canvas.tagName.toUpperCase() != 'CANVAS') {
            canvas.type = 'canvas';
            Mixin.copyProperties(canvas, element); // 拷贝实例属性
            Mixin.copyProperties(canvas.constructor.prototype, EventTarget.prototype); // 拷贝EventTarget原型属性
            Mixin.copyProperties(canvas.constructor.prototype, HTMLElement.prototype); // 拷贝HTMLElement原型属性
        }
        _canvasMap.set(id, canvas)
        _canvas = canvas
    }
    return _canvas
}

function unregisterCanvas(argu) {
    if (!argu) {
        throw new Error('need arguments')
    }
    if (typeof argu === 'string') {
        return _canvasMap.delete(argu)
    } else if (argu._canvasId) {
        return _canvasMap.delete(argu._canvasId)
    }
    _canvas = null
    return false
}

function clearCanvas() {
    _canvasMap.clear()
    _canvas = null
}

export { _canvas, registerCanvas, unregisterCanvas, clearCanvas, _canvasMap }