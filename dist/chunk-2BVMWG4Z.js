"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// lib/utils/getSelector.ts
function getSelectors(path) {
  path.reverse().filter((element) => {
    return element !== document && element !== window;
  }).map((element) => {
    let selector = "";
    if (element.id) {
      return `${element.nodeName.toLowerCase()}#${element.id}`;
    } else if (element.className && typeof element.className === "string") {
      return `${element.nodeName.toLowerCase()}#${element.className}`;
    } else {
      selector = element.nodeName.toLowerCase();
    }
    return selector;
  }).join(" ");
}
function getSelector_default(path) {
  if (Array.isArray(path)) {
    return getSelectors(path);
  }
}

// lib/utils/tracker.ts
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
function getExtraData() {
  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent
  };
}
var SendTracker = class {
  send(host, project, logstore, data) {
    const url = `http://${project}.${host}/logstores/${logstore}/track`;
    const extraData = getExtraData();
    const log = { ...extraData, ...data };
    for (let key in log) {
      if (typeof log[key] === "number") {
        log[key] = String(log[key]);
      }
    }
    const body = JSON.stringify(log);
    _axios2.default.post(url, { "__logs__": [JSON.parse(body)] }, {
      headers: {
        "x-log-apiversion": "0.6.0",
        "x-log-bodyrawsize": String(body.length)
      }
    });
  }
};
var tracker_default = new SendTracker();

// lib/jsError.ts
function JsError(props) {
  window.addEventListener("error", (event) => {
    let lastEvent = { path: "" };
    let log = {
      kind: "stability",
      type: "error",
      errorType: "jsError",
      url: window.location.href,
      message: event.message,
      filename: event.filename,
      position: `${event.lineno}:${event.colno}`,
      stack: getLines(event.error.stack),
      selector: lastEvent ? getSelector_default(lastEvent.path) : ""
    };
    tracker_default.send(props.host, props.project, props.logstore, log);
  });
  window.addEventListener("unhandledrejection", (event) => {
  });
  function getLines(stack) {
    return stack.split("\n").slice(1).map((item) => item.replace(/^s+at\s+/g, "")).join("^");
  }
}



exports.JsError = JsError;
