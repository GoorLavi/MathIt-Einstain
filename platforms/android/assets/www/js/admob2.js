/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested initialization place for your code.
// It is completely optional and not required.
// It implements a Cordova "hide splashscreen" function, that may be useful.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false */
/*global myEventHandler:false, cordova:false, device:false */



window.app = window.app || {}; // there should only be one of these...
var builtApp = false;



// Set to "true" if you want the console.log messages to appear.

app.LOG = app.LOG || true;

app.consoleLog = function () { // only emits console.log messages if app.LOG != false
    if (app.LOG) {
        var args = Array.prototype.slice.call(arguments, 0);
        console.log.apply(console, args);
    }
};


app.initEvents = function () {
    "use strict";
    myEventHandler();

    var el, evt;

    if (navigator.msPointerEnabled || !('ontouchend' in window)) // if on Win 8 machine or no touch
        evt = "click"; // let touch become a click event
    else // else, assume touch events available
        evt = "touchend"; // not optimum, but works

    app.initDebug(); // just for debug, not required; keep it if you want it or get rid of it
    app.hideSplashScreen(); // after init is good time to remove splash screen; using a splash screen is optional
    initAdMob();

};
document.addEventListener("app.Ready", app.initEvents, false);



app.initDebug = function () {
    "use strict";

    if (window.device && device.cordova) { // old Cordova 2.x version detection
        app.consoleLog("device.version: " + device.cordova); // print the cordova version string...
        app.consoleLog("device.model: " + device.model);
        app.consoleLog("device.platform: " + device.platform);
        app.consoleLog("device.version: " + device.version);
        var str = getWebRoot();
//        app.consoleLog(fName, "getWebRoot() => ", str) ;
        if (str.indexOf("emulator") >= 0) {
            console.log("Running on Emulator");
        }
        else if (str.indexOf("AppMobiCache") >= 0) {
            console.log("Running on App Preview");
        }
        else {
            console.log("Running on Built App");
        }
    }

    if (window.cordova && cordova.version) { // only works in Cordova 3.x
        app.consoleLog("cordova.version: " + cordova.version); // print new Cordova 3.x version string...

        if (cordova.require) { // print included cordova plugins
            app.consoleLog("Included Cordova plugins: " + JSON.stringify(cordova.require('cordova/plugin_list').metadata, null, 1));
        }
    }

};
app.hideSplashScreen = function () {
    "use strict";

    if (navigator.splashscreen && navigator.splashscreen.hide) { // Cordova API detected
        navigator.splashscreen.hide();
    }
    if (window.intel && intel.xdk && intel.xdk.device) { // Intel XDK device API detected, but...
        if (intel.xdk.device.hideSplashScreen) // ...hideSplashScreen() is inside the base plugin
            intel.xdk.device.hideSplashScreen();
    }
};
