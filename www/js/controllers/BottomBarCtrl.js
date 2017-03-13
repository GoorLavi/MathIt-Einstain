MathItApp.controller('BottomBarCtrl', ['$scope', 'GeneralService','$rootScope','GameStateService', function($scope, GeneralService, $rootScope, GameStateService) {

    function init() {

        $scope.HighestLevelRecord = GeneralService.GetHighestLevelRecord();
        $scope.HighestScore = GeneralService.GetHighestScore();
    }

$scope.startOver= function () {

$rootScope.$broadcast('initializeGame');

GameStateService.initialize();
};

    init();
}]);
