import { noop } from './util/index.js'

import { _canvas, _canvasMap, registerCanvas, unregisterCanvas, clearCanvas } from './Canvas'// 暴露全局的 canvas

import CommonComputedStyle from './style/CommonComputedStyle'
import getImageComputedStyle from './style/ImageComputedStyle'
import getCanvasComputedStyle from './style/CanvasComputedStyle'
import Event from './Event'

export { default as location } from './location'
export { default as document } from './document'
export { default as navigator } from './navigator'
export { default as XMLHttpRequest } from './XMLHttpRequest'
export { default as Image } from './Image'
export { default as Element } from './Element'
export { default as HTMLElement } from './HTMLElement'
export * from './WindowProperties'

const { platform } = wx.getSystemInfoSync()

// export { default as HTMLImageElement } from './HTMLImageElement'
// export { default as HTMLCanvasElement } from './HTMLCanvasElement'
// export { default as WebGLRenderingContext } from './WebGLRenderingContext'


// export { TouchEvent, PointerEvent, MouseEvent } from './EventIniter/index.js'
import { TouchEvent, Touch } from './EventIniter/index.js'


// export { btoa, atob } from './Base64.js'
// export { default as localStorage } from './localStorage'
// export { default as Symbol } from './Symbol'
// export { default as WebSocket } from './WebSocket'
// export { default as Worker } from './Worker'
// export { default as ImageBitmap } from './ImageBitmap'
// export { default as Audio } from './Audio'
// export { default as FileReader } from './FileReader'
// export { default as HTMLMediaElement } from './HTMLMediaElement'
// export { default as HTMLAudioElement } from './HTMLAudioElement'
// export { default as HTMLVideoElement } from './HTMLVideoElement'

//helpers
function getComputedStyle(dom) {
    const tagName = dom.tagName;

    if (tagName === "CANVAS") {
        return getCanvasComputedStyle(dom);
    } else if (tagName === "IMG") {
        return getImageComputedStyle(dom);
    }

    return CommonComputedStyle;
}

function scrollTo(x, y) {
    // x = Math.min(window.innerWidth, Math.max(0, x));
    // y = Math.min(window.innerHeight, Math.max(0, y));
    // We can't scroll the page of WeChatTinyGame, so it'll always be 0.

    // window.scrollX = 0;
    // window.scrollY = 0;
}

function scrollBy(dx, dy) {
    // window.scrollTo(window.scrollX + dx, window.scrollY + dy);
}

function alert(msg) {
    console.log(msg);
}

function focus() { }

function blur() { }

if (platform !== 'devtools') {
    const wxPerf = wx.getPerformance ? wx.getPerformance() : Date;
    const consoleTimers = {};
    console.time = function (name) {
        consoleTimers[name] = wxPerf.now();
    };

    console.timeEnd = function (name) {
        const timeStart = consoleTimers[name];
        if (!timeStart) {
            return;
        }

        const timeElapsed = wxPerf.now() - timeStart;
        console.log(name + ": " + timeElapsed / 1000 + "ms");
        delete consoleTimers[name];
    };
}

if (wx.onWindowResize) {
    wx.onWindowResize((res) => {
        const event = new Event('resize')

        event.target = document;
        event.timeStamp = Date.now();
        event.res = res;
        event.windowWidth = res.windowWidth;
        event.windowHeight = res.windowHeight;
        document.dispatchEvent(event);
    })
}
function touchEventHandlerFactory(target, type) {
    return (rawEvent) => {
        const event = new TouchEvent(type)
        event.changedTouches = rawEvent.changedTouches.map(touch => new Touch(touch))
        event.touches = rawEvent.touches.map(touch => new Touch(touch))
        event.targetTouches = Array.prototype.slice.call(rawEvent.touches.map(touch => new Touch(touch)))
        event.timeStamp = rawEvent.timeStamp

        if (target == 'document') {
            event.target = document
            event.currentTarget = document
            document.dispatchEvent(event)
        } else {
            event.target = _canvas
            event.currentTarget = _canvas
            _canvas.dispatchEvent(event)
        }
    }
}

// const _setTimeout = setTimeout;
// const _clearTimeout = clearTimeout;
// const _setInterval = setInterval;
// const _clearInterval = clearInterval;
const _requestAnimationFrame = _canvas ? _canvas.requestAnimationFrame : noop

const _cancelAnimationFrame = _canvas ? _canvas.cancelAnimationFrame : noop

//TODO
let AudioContext = null
let webkitAudioContext = null
function addEventListener(type, listener) {
    document.addEventListener(type, listener)
}
function removeEventListener(type, listener) {
    document.removeEventListener(type, listener)
}
const arrayBufferToBase64 = wx.arrayBufferToBase64 || noop
const base64ToArrayBuffer = wx.base64ToArrayBuffer || noop

export {
    // 暴露全局的 canvas
    _canvas as canvas,
    _canvasMap,
    registerCanvas, unregisterCanvas, clearCanvas,

    AudioContext,
    webkitAudioContext,

    noop as VRFrameData,
    addEventListener,
    removeEventListener,

    alert,
    focus,
    blur,
    getComputedStyle,
    scrollTo,
    scrollBy,

    touchEventHandlerFactory,
    TouchEvent,
    _requestAnimationFrame as requestAnimationFrame,
    _cancelAnimationFrame as cancelAnimationFrame,
    arrayBufferToBase64,
    base64ToArrayBuffer
    // _setTimeout as setTimeout,
    // _clearTimeout as clearTimeout,
    // _setInterval as setInterval,
    // _clearInterval as clearInterval,
}
