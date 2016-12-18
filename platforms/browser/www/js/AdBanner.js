

function createBanner() {
    "use strict";
    var fName = "createBanner():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            console.log(fName, "emulator alert");
        } else {

            window.plugins.AdMob.createBannerView();
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

function showBanner() {
    "use strict";
    var fName = "showBanner():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            console.log(fName, "emulator alert");
        } else {
            window.plugins.AdMob.showAd(true, function () {}, function (e) {
                alert(JSON.stringify(e));
            });
        }

    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

function hideBanner() {
    "use strict";
    var fName = "hideBanner():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            console.log(fName, "emulator alert");
        } else {
            window.plugins.AdMob.showAd(false);
        }

    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

function removeBanner() {
    "use strict";
    var fName = "removeBanner():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            console.log(fName, "emulator alert");
        } else {
            window.plugins.AdMob.destroyBannerView();
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}
