MathItApp.controller('BottomBarCtrl', ['$scope', 'GeneralService', function($scope, GeneralService) {

    function init() {

        $scope.HighestLevelRecord = GeneralService.GetHighestLevelRecord();
        $scope.HighestScore = GeneralService.GetHighestScore();
    }


    init();

}]);
