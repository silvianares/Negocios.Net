import {
  WebPlugin
} from "./chunk-YM4WWGZ7.js";
import {
  __async
} from "./chunk-HLNXGIF7.js";

// node_modules/@capacitor/geolocation/dist/esm/web.js
var GeolocationWeb = class extends WebPlugin {
  getCurrentPosition(options) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
          resolve(pos);
        }, (err) => {
          reject(err);
        }, Object.assign({
          enableHighAccuracy: false,
          timeout: 1e4,
          maximumAge: 0
        }, options));
      });
    });
  }
  watchPosition(options, callback) {
    return __async(this, null, function* () {
      const id = navigator.geolocation.watchPosition((pos) => {
        callback(pos);
      }, (err) => {
        callback(null, err);
      }, Object.assign({
        enableHighAccuracy: false,
        timeout: 1e4,
        maximumAge: 0,
        minimumUpdateInterval: 5e3
      }, options));
      return `${id}`;
    });
  }
  clearWatch(options) {
    return __async(this, null, function* () {
      window.navigator.geolocation.clearWatch(parseInt(options.id, 10));
    });
  }
  checkPermissions() {
    return __async(this, null, function* () {
      if (typeof navigator === "undefined" || !navigator.permissions) {
        throw this.unavailable("Permissions API not available in this browser");
      }
      const permission = yield window.navigator.permissions.query({
        name: "geolocation"
      });
      return {
        location: permission.state,
        coarseLocation: permission.state
      };
    });
  }
  requestPermissions() {
    return __async(this, null, function* () {
      throw this.unimplemented("Not implemented on web.");
    });
  }
};
var Geolocation = new GeolocationWeb();
export {
  Geolocation,
  GeolocationWeb
};
//# sourceMappingURL=web-ZFCWWJDS.js.map
