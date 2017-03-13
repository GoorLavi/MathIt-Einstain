MathItApp.service('GameManagerService', ['GameStateService', 'CalculationService', 'ProgressBarService', 'GeneralService', '$rootScope', 'ConstantsService',
    function(GameStateService, CalculationService, ProgressBarService, GeneralService, $rootScope, ConstantsService) {

        var self = this;

        var CharsList = [];

        var NextWantedNumber;

        var DotSecPressOccurred = true;
        var DotBool = false;


        self.setNextStage = function() {

            // If user finished the level without using
            // all the moves
            if (GameStateService.anyMovesLeft()) {

                var movesLeft = GameStateService.getMovesLeft();

                IncreaseLifeBy(movesLeft / 2);
            }

            CalcNextLvl();

            GameStateService.changeGameState(
                null,
                null,
                null,
                ConstantsService.defaultGameState.fullAnswer,
                null);

            initializeStage();

            $rootScope.$broadcast('setNextStage');
        }

        self.tryAgain = function() {
            // If player have life left
            if (takeLifes(1)) {

                var neededMoves = NeededMoves(GameStateService.getWantedNumber());

                var fullAnswer = ConstantsService.defaultGameState.fullAnswer;

                GameStateService.changeGameState(null, null, neededMoves, fullAnswer, null);

                initializeStage();

            } else {
                //Todo Ui to player no lifes
            }
        }

        var initializeStage = function() {
            CharsList = [];
        }

        var PressAvailable = function(PressedButton) {

            // If this is the secound time dot pressed on a single combination
            if (PressedButton == '.' && CharsList[CharsList.length - 2] == '.') {
                return false;
            }

            // In case the dot pressed and its the only time in the combination
            if (PressedButton == '.' && !DotBool) {
                DotBool = true;
                DotSecPressOccurred = false;
                return true;
            }

            // Incase its the decimal digit after the dot
            if (DotBool) {
                DotBool = false;
                DotSecPressOccurred = false;
                return true;
            }

            DotSecPressOccurred = true;

            return GameStateService.anyMovesLeft();
        };


        self.MainPress = function(PressedButton) {

            if (TypeIsCurrect(PressedButton)) {

                if (PressAvailable(PressedButton)) {


                    if (DotSecPressOccurred) {

                        var currentMoves = GameStateService.getMovesLeft();
                        GameStateService.changeMovesLeft(currentMoves - 1);
                    }

                    CalculateResult(PressedButton);


                    AnswerManager();

                    // If user passed level
                    if (LevelFinishedCheck()) {

                        $rootScope.$broadcast('stageDone');

                        UpdateRecord();

                        ProgressBarService.stageDone();

                    } else {

                        ShowPrecent(GameStateService.getAnswer());
                    }


                } else {
                    ShakeCurrectButType(PressedButton);
                }
            }
        };


        var CalculateResult = function(PressedBut) {

            if (PressedBut != '^2') {
                CharsList.push(PressedBut);

            } else {
                CharsList.push('^');
                CharsList.push(2);
            }

            var answer = CalculationService.calculator(CharsList);
            GameStateService.changeAnswer(answer);
        }

        var AnswerManager = function() {

            var answerString = "";

            var endAnswer = GameStateService.getAnswer();

            angular.forEach(CharsList, function(char) {
                answerString += char + " ";
            });

            answerString += '= ' + endAnswer;

            GameStateService.changeFullAnswer(answerString);
        };


        //check if our get type is ok
        var TypeIsCurrect = function(PressedButton) {
            if (CharsList.length % 2 === 0) {
                if (PressedButton < 10)
                    return true;
                else
                    return false;
            } else {
                if (PressedButton > '!')
                    return true;
                else
                    return false;

            }
        }




        var CalcNextLvl = function() {
            var wantedNumber = GameStateService.getWantedNumber();
            NextWantedNumber = RandomWantedNumber(wantedNumber, (wantedNumber * 1.3 + RandomWantedNumber(1, 4))) + 2;

            var NewMovesNumber = NeededMoves(NextWantedNumber);
            setStageData(NextWantedNumber, NewMovesNumber);

        }

        var RandomWantedNumber = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        //take the number needed to achive and decide how mutch moves
        var NeededMoves = function(Number) {
            if (Number < 20) {
                return 3;
            } else if (Number < 100) {
                return 5;
            } else if (Number < 500) {
                return 7;
            } else {
                return 9;
            }
        }

        // Decrement life by lifeToTake prop
        // return true is succeed
        var takeLifes = function(lifesToTake) {

            var lifeLeft = GameStateService.getLifesLeft();

            // If decrementation is possible
            if ((lifeLeft - lifesToTake) >= 0) {

                // Take lifes and return true
                GameStateService.changeLifesLeft(lifeLeft - lifesToTake);
                return true;
            }
            return false;
        }


        var IncreaseLifeBy = function(number) {

            var currentLifes = GameStateService.getLifesLeft();

            GameStateService.changeLifesLeft(currentLifes + number);
        }



        var setStageData = function(NextWantedNumber, NewMovesNumber) {

            GameStateService.changeWantedNumber(NextWantedNumber);

            var level = GameStateService.getLevel();

            GameStateService.changeLevel(level + 1);

            GameStateService.changeMovesLeft(NewMovesNumber);
        }


        // Takes the 100%
        // then the number calculate and return the precents
        var GetPrecent = function(HundredPre, Number) {

            return (Number / HundredPre) * 100;
        }

        // Func Print the Answer precents on the progressBar
        var ShowPrecent = function(Answer) {

            //Get the precents
            var Precent = GetPrecent(GameStateService.getWantedNumber(), Answer);

            var roundedPrecent = Precent.toFixed(2);

            ProgressBarService.changeWidth(Precent);



            if (Precent > 100) {

                ProgressBarService.changeToFailColor();
                ProgressBarService.changeWidth(100);
                ProgressBarService.changeText('you are in the wrong way');
            } else {

                ProgressBarService.changeText(roundedPrecent + '%');
            }
        }


        var LevelFinishedCheck = function() {

            var wantedNumber = GameStateService.getWantedNumber();
            var answer = GameStateService.getAnswer();

            var finishPrecent = GetPrecent(wantedNumber, answer);

            if (finishPrecent < 101 && finishPrecent > 99) {
                return true;
            } else {
                return false;
            }
        }

        var UpdateRecord = function() {

            // If highestLevelRecord was passed
            if (GeneralService.GetHighestLevelRecord() < GameStateService.getLevel()) {

                GeneralService.SaveHighestLevelRecord(GameStateService.getLevel());
            }
            // If HighestScore as passed
            if (GeneralService.GetHighestScore() < GameStateService.getWantedNumber()) {

                GeneralService.SaveHighestScore(GameStateService.getWantedNumber());
            }
        }


    }
]);
