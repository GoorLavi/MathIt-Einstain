MathItApp.controller('ProgressBarCtrl', ['$scope', 'GeneralService', 'ConstantsService','ProgressBarService', function($scope, GeneralService, ConstantsService, ProgressBarService) {

    var self = this;

    self.init = function() {

        $scope.progressBar = ProgressBarService.state;

        // Two way binding
        $scope.MainCtrl = $scope.$parent;
        $scope.MainCtrl.progressBar = self;
    };
    
    self.init();

}]);
