var window = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get document () { return document$1; },
	get navigator () { return navigator; },
	get XMLHttpRequest () { return XMLHttpRequest; },
	get HTMLElement () { return HTMLElement; },
	get location () { return location; },
	get canvas () { return _canvas; },
	get Canvas () { return Canvas; },
	get addEventListener () { return addEventListener; },
	get removeEventListener () { return removeEventListener; },
	get AudioContext () { return AudioContext; },
	get webkitAudioContext () { return webkitAudioContext; },
	get VRFrameData () { return noop; },
	get innerWidth () { return innerWidth; },
	get innerHeight () { return innerHeight; },
	get devicePixelRatio () { return devicePixelRatio; },
	get screen () { return screen; },
	get ontouchstart () { return ontouchstart; },
	get ontouchmove () { return ontouchmove; },
	get ontouchend () { return ontouchend; },
	get performance () { return performance$1; },
	get HTMLImageElement () { return HTMLImageElement; },
	get HTMLCanvasElement () { return HTMLCanvasElement; }
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var _events = new WeakMap();

var EventTarget =
/*#__PURE__*/
function () {
  function EventTarget() {
    _classCallCheck(this, EventTarget);

    _events.set(this, {});
  }

  _createClass(EventTarget, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var events = _events.get(this);

      if (!events) {
        events = {};

        _events.set(this, events);
      }

      if (!events[type]) {
        events[type] = [];
      }

      events[type].push(listener);

      if (options.capture) {
        console.warn('EventTarget.addEventListener: options.capture is not implemented.');
      }

      if (options.once) {
        console.warn('EventTarget.addEventListener: options.once is not implemented.');
      }

      if (options.passive) {
        console.warn('EventTarget.addEventListener: options.passive is not implemented.');
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      var listeners = _events.get(this)[type];

      if (listeners && listeners.length > 0) {
        for (var i = listeners.length; i--; i > 0) {
          if (listeners[i] === listener) {
            listeners.splice(i, 1);
            break;
          }
        }
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var listeners = _events.get(this)[event.type];

      if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
          listeners[i](event);
        }
      }
    }
  }]);

  return EventTarget;
}();

var Node =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(Node, _EventTarget);

  function Node() {
    var _this;

    _classCallCheck(this, Node);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Node).call(this));

    _defineProperty(_assertThisInitialized(_this), "childNodes", []);

    return _this;
  }

  _createClass(Node, [{
    key: "appendChild",
    value: function appendChild(node) {
      if (node instanceof Node) {
        this.childNodes.push(node);
      } else {
        throw new TypeError('Failed to executed \'appendChild\' on \'Node\': parameter 1 is not of type \'Node\'.');
      }
    }
  }, {
    key: "cloneNode",
    value: function cloneNode() {
      var copyNode = Object.create(this);
      Object.assign(copyNode, this);
      return copyNode;
    }
  }, {
    key: "removeChild",
    value: function removeChild(node) {
      var index = this.childNodes.findIndex(function (child) {
        return child === node;
      });

      if (index > -1) {
        return this.childNodes.splice(index, 1);
      }

      return null;
    }
  }]);

  return Node;
}(EventTarget);

var ELement =
/*#__PURE__*/
function (_Node) {
  _inherits(ELement, _Node);

  function ELement() {
    var _this;

    _classCallCheck(this, ELement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ELement).call(this));

    _defineProperty(_assertThisInitialized(_this), "className", '');

    _defineProperty(_assertThisInitialized(_this), "children", []);

    return _this;
  }

  return ELement;
}(Node);

function noop() {}

var performance;

if (wx.getPerformance) {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
      platform = _wx$getSystemInfoSync.platform;

  var wxPerf = wx.getPerformance();
  var initTime = wxPerf.now();
  var clientPerfAdapter = Object.assign({}, wxPerf, {
    now: function now() {
      return (wxPerf.now() - initTime) / 1000;
    }
  });
  performance = platform === 'devtools' ? wxPerf : clientPerfAdapter;
}

var performance$1 = performance;

var _wx$getSystemInfoSync$1 = wx.getSystemInfoSync(),
    screenWidth = _wx$getSystemInfoSync$1.screenWidth,
    screenHeight = _wx$getSystemInfoSync$1.screenHeight,
    devicePixelRatio = _wx$getSystemInfoSync$1.devicePixelRatio;

var innerWidth = screenWidth;
var innerHeight = screenHeight;
var screen = {
  availWidth: innerWidth,
  availHeight: innerHeight
};
var ontouchstart = null;
var ontouchmove = null;
var ontouchend = null;

var HTMLElement =
/*#__PURE__*/
function (_Element) {
  _inherits(HTMLElement, _Element);

  function HTMLElement() {
    var _this;

    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, HTMLElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HTMLElement).call(this));

    _defineProperty(_assertThisInitialized(_this), "className", '');

    _defineProperty(_assertThisInitialized(_this), "childern", []);

    _defineProperty(_assertThisInitialized(_this), "style", {
      width: "".concat(innerWidth, "px"),
      height: "".concat(innerHeight, "px")
    });

    _defineProperty(_assertThisInitialized(_this), "insertBefore", noop);

    _defineProperty(_assertThisInitialized(_this), "innerHTML", '');

    _this.tagName = tagName.toUpperCase();
    return _this;
  }

  _createClass(HTMLElement, [{
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this[name] = value;
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      return this[name];
    }
  }, {
    key: "getBoundingClientRect",
    value: function getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: innerWidth,
        height: innerHeight
      };
    }
  }, {
    key: "focus",
    value: function focus() {}
  }, {
    key: "clientWidth",
    get: function get() {
      var ret = parseInt(this.style.fontSize, 10) * this.innerHTML.length;
      return Number.isNaN(ret) ? 0 : ret;
    }
  }, {
    key: "clientHeight",
    get: function get() {
      var ret = parseInt(this.style.fontSize, 10);
      return Number.isNaN(ret) ? 0 : ret;
    }
  }]);

  return HTMLElement;
}(ELement);

function Image() {
  var image = _canvas.createImage();
  return image;
}

var HTMLMediaElement =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(HTMLMediaElement, _HTMLElement);

  function HTMLMediaElement(type) {
    _classCallCheck(this, HTMLMediaElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(HTMLMediaElement).call(this, type));
  }

  _createClass(HTMLMediaElement, [{
    key: "addTextTrack",
    value: function addTextTrack() {}
  }, {
    key: "captureStream",
    value: function captureStream() {}
  }, {
    key: "fastSeek",
    value: function fastSeek() {}
  }, {
    key: "load",
    value: function load() {}
  }, {
    key: "pause",
    value: function pause() {}
  }, {
    key: "play",
    value: function play() {}
  }]);

  return HTMLMediaElement;
}(HTMLElement);

var HTMLAudioElement =
/*#__PURE__*/
function (_HTMLMediaElement) {
  _inherits(HTMLAudioElement, _HTMLMediaElement);

  function HTMLAudioElement() {
    _classCallCheck(this, HTMLAudioElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(HTMLAudioElement).call(this, 'audio'));
  }

  return HTMLAudioElement;
}(HTMLMediaElement);

var HAVE_NOTHING = 0;
var HAVE_METADATA = 1;
var HAVE_CURRENT_DATA = 2;
var HAVE_FUTURE_DATA = 3;
var HAVE_ENOUGH_DATA = 4;

var _innerAudioContext = new WeakMap();

var _src = new WeakMap();

var Audio =
/*#__PURE__*/
function (_HTMLAudioElement) {
  _inherits(Audio, _HTMLAudioElement);

  function Audio(url) {
    var _this;

    _classCallCheck(this, Audio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Audio).call(this));

    _defineProperty(_assertThisInitialized(_this), "HAVE_NOTHING", HAVE_NOTHING);

    _defineProperty(_assertThisInitialized(_this), "HAVE_METADATA", HAVE_METADATA);

    _defineProperty(_assertThisInitialized(_this), "HAVE_CURRENT_DATA", HAVE_CURRENT_DATA);

    _defineProperty(_assertThisInitialized(_this), "HAVE_FUTURE_DATA", HAVE_FUTURE_DATA);

    _defineProperty(_assertThisInitialized(_this), "HAVE_ENOUGH_DATA", HAVE_ENOUGH_DATA);

    _defineProperty(_assertThisInitialized(_this), "readyState", HAVE_NOTHING);

    _src.set(_assertThisInitialized(_this), '');

    var innerAudioContext = wx.createInnerAudioContext();

    _innerAudioContext.set(_assertThisInitialized(_this), innerAudioContext);

    innerAudioContext.onCanplay(function () {
      _this.dispatchEvent({
        type: 'load'
      });

      _this.dispatchEvent({
        type: 'loadend'
      });

      _this.dispatchEvent({
        type: 'canplay'
      });

      _this.dispatchEvent({
        type: 'canplaythrough'
      });

      _this.dispatchEvent({
        type: 'loadedmetadata'
      });

      _this.readyState = HAVE_CURRENT_DATA;
    });
    innerAudioContext.onPlay(function () {
      _this.dispatchEvent({
        type: 'play'
      });
    });
    innerAudioContext.onPause(function () {
      _this.dispatchEvent({
        type: 'pause'
      });
    });
    innerAudioContext.onEnded(function () {
      _this.dispatchEvent({
        type: 'ended'
      });

      _this.readyState = HAVE_ENOUGH_DATA;
    });
    innerAudioContext.onError(function () {
      _this.dispatchEvent({
        type: 'error'
      });
    });

    if (url) {
      _innerAudioContext.get(_assertThisInitialized(_this)).src = url;
    }

    return _this;
  }

  _createClass(Audio, [{
    key: "load",
    value: function load() {
      console.warn('HTMLAudioElement.load() is not implemented.');
    }
  }, {
    key: "play",
    value: function play() {
      _innerAudioContext.get(this).play();
    }
  }, {
    key: "pause",
    value: function pause() {
      _innerAudioContext.get(this).pause();
    }
  }, {
    key: "canPlayType",
    value: function canPlayType() {
      var mediaType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (typeof mediaType !== 'string') {
        return '';
      }

      if (mediaType.indexOf('audio/mpeg') > -1 || mediaType.indexOf('audio/mp4')) {
        return 'probably';
      }

      return '';
    }
  }, {
    key: "cloneNode",
    value: function cloneNode() {
      var newAudio = new Audio();
      newAudio.loop = _innerAudioContext.get(this).loop;
      newAudio.autoplay = _innerAudioContext.get(this).autoplay;
      newAudio.src = this.src;
      return newAudio;
    }
  }, {
    key: "currentTime",
    get: function get() {
      return _innerAudioContext.get(this).currentTime;
    },
    set: function set(value) {
      _innerAudioContext.get(this).seek(value);
    }
  }, {
    key: "src",
    get: function get() {
      return _src.get(this);
    },
    set: function set(value) {
      _src.set(this, value);

      _innerAudioContext.get(this).src = value;
    }
  }, {
    key: "loop",
    get: function get() {
      return _innerAudioContext.get(this).loop;
    },
    set: function set(value) {
      _innerAudioContext.get(this).loop = value;
    }
  }, {
    key: "autoplay",
    get: function get() {
      return _innerAudioContext.get(this).autoplay;
    },
    set: function set(value) {
      _innerAudioContext.get(this).autoplay = value;
    }
  }, {
    key: "paused",
    get: function get() {
      return _innerAudioContext.get(this).paused;
    }
  }]);

  return Audio;
}(HTMLAudioElement);

var events = {};
var document$1 = {
  readyState: 'complete',
  visibilityState: 'visible',
  documentElement: window,
  hidden: false,
  style: {},
  location: location,
  ontouchstart: null,
  ontouchmove: null,
  ontouchend: null,
  head: new HTMLElement('head'),
  body: new HTMLElement('body'),
  createElementNS: function createElementNS(_, type) {
    if (type === 'canvas') return _canvas;
    if (type === 'img') return _canvas.createImage();
  },
  createElement: function createElement(tagName) {
    if (tagName === 'canvas') {
      return new Canvas();
    } else if (tagName === 'audio') {
      return new Audio();
    } else if (tagName === 'img') {
      return new Image();
    }

    return new HTMLElement(tagName);
  },
  getElementById: function getElementById(id) {
    if (id === _canvas.id) {
      return _canvas;
    }

    return null;
  },
  getElementsByTagName: function getElementsByTagName(tagName) {
    if (tagName === 'head') {
      return [document$1.head];
    } else if (tagName === 'body') {
      return [document$1.body];
    } else if (tagName === 'canvas') {
      return [_canvas];
    }

    return [];
  },
  getElementsByName: function getElementsByName(tagName) {
    if (tagName === 'head') {
      return [document$1.head];
    } else if (tagName === 'body') {
      return [document$1.body];
    } else if (tagName === 'canvas') {
      return [_canvas];
    }

    return [];
  },
  querySelector: function querySelector(query) {
    if (query === 'head') {
      return document$1.head;
    } else if (query === 'body') {
      return document$1.body;
    } else if (query === 'canvas') {
      return _canvas;
    } else if (query === "#".concat(_canvas.id)) {
      return _canvas;
    }

    return null;
  },
  querySelectorAll: function querySelectorAll(query) {
    if (query === 'head') {
      return [document$1.head];
    } else if (query === 'body') {
      return [document$1.body];
    } else if (query === 'canvas') {
      return [_canvas];
    }

    return [];
  },
  addEventListener: function addEventListener(type, listener) {
    if (!events[type]) {
      events[type] = [];
    }

    events[type].push(listener);
  },
  removeEventListener: function removeEventListener(type, listener) {
    var listeners = events[type];

    if (listeners && listeners.length > 0) {
      for (var i = listeners.length; i--; i > 0) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }
  },
  dispatchEvent: function dispatchEvent(event) {
    var listeners = events[event.type];

    if (listeners) {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i](event);
      }
    }
  }
};

// import { HTMLCanvasElement, CanvasRenderingContext2D, WebGLRenderingContext } from './constructor'
var _canvas = null;
function Canvas(canvas) {
  if (_canvas) {
    return _canvas;
  }

  if (!canvas) {
    throw new Error('need a canvas');
  }

  canvas.type = 'canvas';
  canvas.style = {
    width: canvas.width + 'px',
    height: canvas.height + 'px'
  };

  canvas.focus = function () {};

  canvas.blur = function () {};

  canvas.addEventListener = function (type, listener) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // console.log('canvas.addEventListener', type);
    document$1.addEventListener(type, listener, options);
  };

  canvas.removeEventListener = function (type, listener) {
    // console.log('canvas.removeEventListener', type);
    document$1.removeEventListener(type, listener);
  };

  canvas.dispatchEvent = function () {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    console.log('canvas.dispatchEvent', event.type, event); // nothing to do
  };

  canvas.getBoundingClientRect = function () {
    var ret = {
      top: 0,
      left: 0,
      width: innerWidth,
      height: innerHeight
    };
    return ret;
  };

  _canvas = canvas;
  return _canvas;
}

var _wx$getSystemInfoSync$2 = wx.getSystemInfoSync(),
    platform$1 = _wx$getSystemInfoSync$2.platform;

var navigator = {
  platform: platform$1,
  language: 'zh-cn',
  appVersion: '5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/zh_CN',
  onLine: true,
  // TODO 用 wx.getNetworkStateChange 和 wx.onNetworkStateChange 来返回真实的状态
  // TODO 用 wx.getLocation 来封装 geolocation
  geolocation: {
    getCurrentPosition: noop,
    watchPosition: noop,
    clearWatch: noop
  }
};

var _requestHeader = new WeakMap();

var _responseHeader = new WeakMap();

var _requestTask = new WeakMap();

function _triggerEvent(type) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  event.target = event.target || this;

  if (typeof this["on".concat(type)] === 'function') {
    this["on".concat(type)].call(this, event);
  }
}

function _changeReadyState(readyState) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.readyState = readyState;
  event.readyState = readyState;

  _triggerEvent.call(this, 'readystatechange', event);
}

function _isRelativePath(url) {
  return !/^(http|https|ftp|wxfile):\/\/.*/i.test(url);
}

var XMLHttpRequest =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(XMLHttpRequest, _EventTarget);

  function XMLHttpRequest() {
    var _this;

    _classCallCheck(this, XMLHttpRequest);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(XMLHttpRequest).call(this));
    /*
     * TODO 这一批事件应该是在 XMLHttpRequestEventTarget.prototype 上面的
     */

    _this.onabort = null;
    _this.onerror = null;
    _this.onload = null;
    _this.onloadstart = null;
    _this.onprogress = null;
    _this.ontimeout = null;
    _this.onloadend = null;
    _this.onreadystatechange = null;
    _this.readyState = 0;
    _this.response = null;
    _this.responseText = null;
    _this.responseType = 'text';
    _this.dataType = 'string';
    _this.responseXML = null;
    _this.status = 0;
    _this.statusText = '';
    _this.upload = {};
    _this.withCredentials = false;

    _requestHeader.set(_assertThisInitialized(_this), {
      'content-type': 'application/x-www-form-urlencoded'
    });

    _responseHeader.set(_assertThisInitialized(_this), {});

    return _this;
  }

  _createClass(XMLHttpRequest, [{
    key: "abort",
    value: function abort() {
      var myRequestTask = _requestTask.get(this);

      if (myRequestTask) {
        myRequestTask.abort();
      }
    }
  }, {
    key: "getAllResponseHeaders",
    value: function getAllResponseHeaders() {
      var responseHeader = _responseHeader.get(this);

      return Object.keys(responseHeader).map(function (header) {
        return "".concat(header, ": ").concat(responseHeader[header]);
      }).join('\n');
    }
  }, {
    key: "getResponseHeader",
    value: function getResponseHeader(header) {
      return _responseHeader.get(this)[header];
    }
  }, {
    key: "open",
    value: function open(method, url
    /* async, user, password 这几个参数在小程序内不支持*/
    ) {
      this._method = method;
      this._url = url;

      _changeReadyState.call(this, XMLHttpRequest.OPENED);
    }
  }, {
    key: "overrideMimeType",
    value: function overrideMimeType() {}
  }, {
    key: "send",
    value: function send() {
      var _this2 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (this.readyState !== XMLHttpRequest.OPENED) {
        throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
      } else {
        var url = this._url;

        var header = _requestHeader.get(this);

        var responseType = this.responseType;
        var dataType = this.dataType;

        var relative = _isRelativePath(url);

        var encoding;

        if (responseType === 'arraybuffer') ; else {
          encoding = 'utf8';
        }

        delete this.response;
        this.response = null;

        var onSuccess = function onSuccess(_ref) {
          var data = _ref.data,
              statusCode = _ref.statusCode,
              header = _ref.header;
          statusCode = statusCode === undefined ? 200 : statusCode;

          if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
            try {
              data = JSON.stringify(data);
            } catch (e) {
              data = data;
            }
          }

          _this2.status = statusCode;

          if (header) {
            _responseHeader.set(_this2, header);
          }

          _triggerEvent.call(_this2, 'loadstart');

          _changeReadyState.call(_this2, XMLHttpRequest.HEADERS_RECEIVED);

          _changeReadyState.call(_this2, XMLHttpRequest.LOADING);

          _this2.response = data;

          if (data instanceof ArrayBuffer) {
            Object.defineProperty(_this2, 'responseText', {
              enumerable: true,
              configurable: true,
              get: function get() {
                throw "InvalidStateError : responseType is " + this.responseType;
              }
            });
          } else {
            _this2.responseText = data;
          }

          _changeReadyState.call(_this2, XMLHttpRequest.DONE);

          _triggerEvent.call(_this2, 'load');

          _triggerEvent.call(_this2, 'loadend');
        };

        var onFail = function onFail(_ref2) {
          var errMsg = _ref2.errMsg;

          // TODO 规范错误
          if (errMsg.indexOf('abort') !== -1) {
            _triggerEvent.call(_this2, 'abort');
          } else {
            _triggerEvent.call(_this2, 'error', {
              message: errMsg
            });
          }

          _triggerEvent.call(_this2, 'loadend');

          if (relative) {
            // 用户即使没监听error事件, 也给出相应的警告
            console.warn(errMsg);
          }
        };

        if (relative) {
          var fs = wx.getFileSystemManager();
          var options = {
            'filePath': url,
            'success': onSuccess,
            'fail': onFail
          };

          if (encoding) {
            options['encoding'] = encoding;
          }

          fs.readFile(options);
          return;
        }

        wx.request({
          data: data,
          url: url,
          method: this._method,
          header: header,
          dataType: dataType,
          responseType: responseType,
          success: onSuccess,
          fail: onFail
        });
      }
    }
  }, {
    key: "setRequestHeader",
    value: function setRequestHeader(header, value) {
      var myHeader = _requestHeader.get(this);

      myHeader[header] = value;

      _requestHeader.set(this, myHeader);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      var _this3 = this;

      if (typeof listener !== 'function') {
        return;
      }

      this['on' + type] = function () {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        event.target = event.target || _this3;
        listener.call(_this3, event);
      };
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      if (this['on' + type] === listener) {
        this['on' + type] = null;
      }
    }
  }]);

  return XMLHttpRequest;
}(EventTarget); // TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态
XMLHttpRequest.UNSEND = 0;
XMLHttpRequest.OPENED = 1;
XMLHttpRequest.HEADERS_RECEIVED = 2;
XMLHttpRequest.LOADING = 3;
XMLHttpRequest.DONE = 4;

var location = {
  href: 'game.js',
  reload: function reload() {}
};

var HTMLImageElement =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(HTMLImageElement, _HTMLElement);

  function HTMLImageElement() {
    _classCallCheck(this, HTMLImageElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(HTMLImageElement).call(this, 'img'));
  }

  return HTMLImageElement;
}(HTMLElement);
var HTMLCanvasElement =
/*#__PURE__*/
function (_HTMLElement2) {
  _inherits(HTMLCanvasElement, _HTMLElement2);

  function HTMLCanvasElement() {
    _classCallCheck(this, HTMLCanvasElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(HTMLCanvasElement).call(this, 'canvas'));
  }

  return HTMLCanvasElement;
}(HTMLElement);

function addEventListener(type, listener) {
  document.addEventListener(type, listener);
}

function removeEventListener(type, listener) {
  document.removeEventListener(type, listener);
}

var AudioContext = null;
var webkitAudioContext = null;
// export { setInterval }
// export { clearTimeout }
// export { clearInterval }
// export { requestAnimationFrame }
// export { cancelAnimationFrame }

export { AudioContext, Canvas, HTMLCanvasElement, HTMLElement, HTMLImageElement, noop as VRFrameData, XMLHttpRequest, addEventListener, _canvas as canvas, devicePixelRatio, document$1 as document, innerHeight, innerWidth, location, navigator, ontouchend, ontouchmove, ontouchstart, performance$1 as performance, removeEventListener, screen, webkitAudioContext };
