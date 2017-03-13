MathItApp.service('GameStateService', ['ConstantsService', function(ConstantsService) {

    var self = this;

    self.state = {
        LifesLeft: 0,
        PlayerLvl: 0,
        MovesLeft: 0,
        FullAnswer: '',
        WantedNumber: 0,
        Answer: 0
    };


    self.changeLifesLeft = function(newLifes) {
        self.state.LifesLeft = angular.copy(newLifes);
    }
    self.changeLevel = function(newLevel) {
        self.state.PlayerLvl = angular.copy(newLevel);
    }
    self.changeMovesLeft = function(newMoves) {
        self.state.MovesLeft = angular.copy(newMoves);
    }
    self.changeFullAnswer = function(newFullAnswer) {
        self.state.FullAnswer = angular.copy(newFullAnswer);
    }
    self.changeWantedNumber = function(newWantedNumber) {
        self.state.WantedNumber = angular.copy(newWantedNumber);
    }
    self.changeAnswer = function(newAnswer) {
        self.state.Answer = angular.copy(newAnswer);
    }


    // ChangeGameState change only the included parameters
    self.changeGameState = function(playerLevel, wantedNumber, movesLeft, fullAnswer, lifes) {

            if (lifes) {
                self.changeLifesLeft(lifes);
            }
            if (playerLevel) {
                self.changeLevel(playerLevel);
            }
            if (movesLeft) {
                self.changeMovesLeft(movesLeft);
            }
            if (fullAnswer) {
                self.changeFullAnswer(fullAnswer);
            }
            if (wantedNumber) {
                self.changeWantedNumber(wantedNumber);
            }
        },

        self.getLifesLeft = function() {
            return angular.copy(self.state.LifesLeft);
        },
        self.getLevel = function() {
            return angular.copy(self.state.PlayerLvl);
        },
        self.getMovesLeft = function() {
            return angular.copy(self.state.MovesLeft);
        },
        self.getFullAnswer = function() {
            return angular.copy(self.state.FullAnswer);
        },
        self.getWantedNumber = function() {
            return angular.copy(self.state.WantedNumber);
        },
        self.getAnswer = function() {
            return angular.copy(self.state.Answer);
        },

        self.initialize = function() {
            var defaultGameStates = ConstantsService.defaultGameState;

            self.changeGameState(
                defaultGameStates.playerLvl,
                defaultGameStates.wantedNumber,
                defaultGameStates.movesLeft,
                defaultGameStates.fullAnswer,
                defaultGameStates.lifes
            );
        },

        self.anyMovesLeft = function() {

            return self.getMovesLeft() > 0;
        }
}]);
