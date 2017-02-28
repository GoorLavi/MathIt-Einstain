MathItApp.controller('BottomBarCtrl', ['$scope', 'GeneralService','$rootScope', function($scope, GeneralService, $rootScope) {

    function init() {

        $scope.HighestLevelRecord = GeneralService.GetHighestLevelRecord();
        $scope.HighestScore = GeneralService.GetHighestScore();
    }

$scope.startOver= function () {

$rootScope.$broadcast('initializeGame');
};

    init();
}]);
