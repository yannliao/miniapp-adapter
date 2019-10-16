import Canvas from './Canvas'
import { _canvas } from './Canvas'
import { noop } from './util/index'


export document from './document'
export navigator from './navigator'
export XMLHttpRequest from './XMLHttpRequest'
// export WebSocket from './WebSocket'
// export Image from './Image'
// export Audio from './Audio'
// export FileReader from './FileReader'
export HTMLElement from './HTMLElement'
// export localStorage from './localStorage'
export location from './location'
export * from './WindowProperties'
export * from './constructor'

// 暴露全局的 canvas
export { _canvas as canvas }
export { Canvas }

function addEventListener(type, listener) {
    document.addEventListener(type, listener)
}
function removeEventListener(type, listener) {
    document.removeEventListener(type, listener)
}

export { addEventListener }
export { removeEventListener }
//TODO
let AudioContext = null
let webkitAudioContext = null
export { AudioContext }
export { webkitAudioContext }
export { noop as VRFrameData }

// export { setTimeout }
// export { setInterval }
// export { clearTimeout }
// export { clearInterval }
// export { requestAnimationFrame }
// export { cancelAnimationFrame }
