MathItApp.controller('BottomBarCtrl', ['$scope', 'GeneralService','$rootScope','GameStateService','GameManagerService', function($scope, GeneralService, $rootScope, GameStateService, GameManagerService) {

    function init() {

        $scope.HighestLevelRecord = GeneralService.GetHighestLevelRecord();
        $scope.HighestScore = GeneralService.GetHighestScore();
    }

$scope.startOver= function () {

$rootScope.$broadcast('initializeGame');

GameManagerService.initialize();
};

    init();
}]);
