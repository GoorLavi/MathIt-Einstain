MathItApp.service('GeneralService',['$cordovaNetwork', function($cordovaNetwork) {

    var self = this;

    self.NetworkConnected = function () {

      return $cordovaNetwork.isOnline();
    };

    self.GetHighestScore = function() {

        if (LocalStorageExist()) {
            return localStorage.getItem("HighestScore");
        }
    };

    self.SaveHighestScore = function(highestScore) {

        if (LocalStorageExist()) {

            // Save the best level record to local storage
            localStorage.setItem("HighestScore", highestScore);
        }
    };


    self.GetHighestLevelRecord = function() {

        if (LocalStorageExist()) {

            return localStorage.getItem("HighestLevelRecord");
        }
    };

    self.SaveHighestLevelRecord = function(highestLevelRecord) {

        if (LocalStorageExist()) {

            // Save the best level record to local storage
            localStorage.setItem("HighestLevelRecord", highestLevelRecord);
        }
    };

    // Return true is there is local storage
    function LocalStorageExist() {

        // If storage is available return true
        if (typeof(Storage) != "undefined") {
            return true;
        } else {

            console.log(' Local Storage is not exist');
        }
    }

}]);
