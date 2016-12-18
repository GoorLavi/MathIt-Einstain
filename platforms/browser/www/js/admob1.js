
function myEventHandler() {
    "use strict";

    var ua = navigator.userAgent;
    var str;

    if (window.Cordova && dev.isDeviceReady.c_cordova_ready__) {
        str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!";
    } else if (window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______) {
        str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!";
    } else {
        str = "Bad device ready, or none available because we're running in a browser.";
    }

    console.log(str);
}



// ...additional event handlers here...

function initAdMob() {
    "use strict";

    try {
        if (window.plugins && window.plugins.AdMob) {
            //Login to https://apps.admob.com to get AD-UNIT-ID
            var ad_units = {
                ios: {

                    banner: 'ca-app-pub-6659330629355362/3490539536',
                    interstitial: 'ca-app-pub-6659330629355362/3490539536'
                },
                android: {
                    banner: 'ca-app-pub-6659330629355362/3490539536',
                    interstitial: 'ca-app-pub-6659330629355362/3490539536'
                },
                wp8: {
                    banner: 'ca-app-pub-6659330629355362/3490539536',
                    interstitial: 'ca-app-pub-6659330629355362/3490539536'
                }
            };
            var admobid = "";
            if (/(android)/i.test(navigator.userAgent)) {
                admobid = ad_units.android;
            } else if (/(iphone|ipad)/i.test(navigator.userAgent)) {
                admobid = ad_units.ios;
            } else {
                admobid = ad_units.wp8;
            }
            window.plugins.AdMob.setOptions({
                publisherId: admobid.banner,
                interstitialAdId: admobid.interstitial,
                bannerAtTop: false, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                isTesting: false, // receiving test ad
                autoShow: true // auto show interstitial ad when loaded
            });
            registerAdEvents();

        } else {
//            alert('This app uses a third party Admob plugin. Please build app to test.');
        }


    } catch (e) {
    }

}

function createInterstitial() {
    "use strict";

    try {
        if (window.tinyHippos) {
            console.log(fName, "emulator alert");
        } else {
            window.plugins.AdMob.createInterstitialView();
        }
    } catch (e) {
    }

}

function showInterstitial() {
    "use strict";

    try {
        if (window.tinyHippos) {
            console.log(fName, "emulator alert");
        } else {

            window.plugins.AdMob.showInterstitialAd(true, function () {}, function (e) {
                alert(JSON.stringify(e));
            });
        }
    } catch (e) {
    }

}
