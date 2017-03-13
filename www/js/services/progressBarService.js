    MathItApp.service('ProgressBarService', ['GameStateService', 'ConstantsService', '$rootScope', function(GameStateService, ConstantsService, $rootScope) {

        var self = this;

        var colors = ConstantsService.progressBar.colors;

        self.initialize = function() {
            self.state.color = colors.defaultColorStyle.class;
            self.state.width = ConstantsService.progressBar.width.default;
            self.state.text = ConstantsService.progressBar.text.default;


        }

        self.state = {
            color: '',
            width: '',
            text: '',
        };

        $rootScope.$on('setNextStage', function(event) {
            self.initialize();
        });

        self.changeToSuccessColor = function() {

            self.changeColor(colors.colorStyleSuccess);
        }
        self.changeToFailColor = function() {
            self.changeColor(colors.colorStyleFail);
        }
        self.changeToDefaultColor = function() {
            self.changeColor(colors.defaultColorStyle);
        }

        self.changeColor = function(color) {

            self.state.color = angular.copy(color.class);
        }

        self.changeText = function(newText) {
            self.state.text = angular.copy(newText);
        }
        self.changeWidth = function(precents) {
            self.state.width = precents + '%';
        }

        self.stageDone = function(text) {

            if (text) {
                self.changeText(text);
            } else {
                self.changeText('Great Work');
            }

            self.changeWidth(100);
            self.changeToSuccessColor();
        }

        self.initialize();

    }]);
