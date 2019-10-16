// import { HTMLCanvasElement, CanvasRenderingContext2D, WebGLRenderingContext } from './constructor'
// import HTMLElement from './HTMLElement'
import * as window from './window'
import document from './document'

let hasModifiedCanvasPrototype = false
let hasInit2DContextConstructor = false
let hasInitWebGLContextConstructor = false
let _canvas = null
export default function Canvas(canvas) {
  if (_canvas) {
    return _canvas
  }
  if (!canvas) {
    throw new Error('need a canvas')
  }
  canvas.type = 'canvas'
  canvas.style = { width: canvas.width + 'px', height: canvas.height + 'px' }
  canvas.focus = function () { };
  canvas.blur = function () { };

  canvas.addEventListener = function (type, listener, options = {}) {
    // console.log('canvas.addEventListener', type);
    document.addEventListener(type, listener, options);
  }

  canvas.removeEventListener = function (type, listener) {
    // console.log('canvas.removeEventListener', type);
    document.removeEventListener(type, listener);
  }

  canvas.dispatchEvent = function (event = {}) {
    console.log('canvas.dispatchEvent', event.type, event);
    // nothing to do
  }

  canvas.getBoundingClientRect = () => {
    const ret = {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
    return ret
  }
  _canvas = canvas
  return _canvas
}
export { _canvas }