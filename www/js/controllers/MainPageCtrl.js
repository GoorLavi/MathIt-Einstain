MathItApp.controller('MainPageCtrl', ['$scope', '$ionicModal', 'GeneralService', 'ConstantsService', function($scope, $ionicModal, GeneralService, ConstantsService) {



    var CharsList = [];

    $scope.LifesLeft = 3;
    $scope.MovesLeft = 3;
    $scope.PlayerLvl = 1;
    $scope.WantedNumber = 11;
    $scope.FullAnswer = 'your answer';
    $scope.Answer = 0;
    $scope.ProgressBarText = "";



    $ionicModal.fromTemplateUrl('./views/bottomBar.html', function(modal) {
        $scope.BottonBar = modal;
    }, {
        scope: $scope,
        backdropClickToClose: true,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.buttomBar = modal;
    });


    var NextWantedNumber;

    $scope.OpenBottomBar = function() {

        $scope.BottonBar.show();
    };

    // Close the bottom bar
    // no UI access
    var closeBottomBar = function() {
        $scope.buttomBar.hide();
    };


    function UpdateRecord() {

        // If highestLevelRecord was passed
        if (GeneralService.GetHighestLevelRecord() < $scope.PlayerLvl) {

            GeneralService.SaveHighestLevelRecord($scope.PlayerLvl);
        }
        // If HighestScore as passed
        if (GeneralService.GetHighestScore() < $scope.WantedNumber) {

            GeneralService.SaveHighestScore($scope.WantedNumber);
        }
    }



    // Takes the 100%
    // then the number calculate and return the precents
    function GetPrecent(HundredPre, Number) {

        return (Number / HundredPre) * 100;
    }

    // Func Print the Answer precents on the progressBar
    function ShowPrecent(Answer) {

        //Get the precents
        var Precent = GetPrecent(gameState.getWantedNumber(), Answer);

        var roundedPrecent = Precent.toFixed(2);

        progressBar.changeWidth(Precent);



        if (Precent > 100) {

          progressBar.changeToFailColor();
          progressBar.changeWidth(100);
          progressBar.changeText('you are in the wrong way');
        } else {

          progressBar.changeText(roundedPrecent+'%');
        }
    }



    var DotSecPressOccurred = true;
    var DotBool = false;

    var PressAvailable = function(PressedNumber) {

        if (PressedNumber == '.' && !DotBool) {
            DotBool = true;
            return true;
        }

        if (DotBool) {
            DotBool = false;
            DotSecPressOccurred = false;
            return true;
        }

        if (!DotSecPressOccurred) {
            DotSecPressOccurred = true;
        }

        if ($scope.MovesLeft > 0) {
            return true;
        }

        return false;
    };

    function LevelFinishedCheck() {

        var finishPrecent = GetPrecent($scope.WantedNumber, $scope.Answer);

        if (finishPrecent < 101 && finishPrecent > 99) {
            return true;
        } else {
            return false;
        }
    }

    $scope.MainPress = function(PressedNumber) {


        if (PressAvailable(PressedNumber)) {

            if (TypeIsCurrect(PressedNumber)) {

                if (DotSecPressOccurred) {
                    $scope.MovesLeft--;
                }

                ClculateResault(PressedNumber);


                $scope.AnswerManager();

                // If user passed level
                if (LevelFinishedCheck()) {

                    UpdateRecord();

                    nextLevelFeatures();
                } else {

                    ShowPrecent($scope.Answer);
                }


            } else {
                ShakeCurrectButType(PressedNumber);
            }
        } else {

            FadeTryAgainBtn();

            ShakeAnswer();

            navigator.vibrate(300);
        }


    };

    var FadeTryAgainBtn = function() {
        $('#tryagains').addClass('Fade').delay(1000).queue(function() {
            $(this).removeClass('Fade');
        });
    };

    var ShakeAnswer = function() {
        $('#show').addClass('ShakeResult').delay(1000).queue(function() {
            $(this).removeClass('ShakeResult');
        });
    };

    var ShakeCurrectButType = function(PressedBut) {

        if (PressedBut > 10) {
            $('.numberBut').addClass('ShakeResult').delay(1000).queue(function() {
                $(this).removeClass('ShakeResult');
            });
        } else {
            $('.actionBut').addClass('ShakeResult').delay(1000).queue(function() {
                $(this).removeClass('ShakeResult');
            });
        }


    };


    $scope.AnswerManager = function() {

        var EndAnswer = $scope.Answer;

        var answerString = "";

        for (var i = 0; i < CharsList.length; i++) {
            answerString += CharsList[i] + " ";
        }

        $scope.FullAnswer = answerString + " = " + EndAnswer;


    };

    function ClculateResault(PressedBut) {

        // If the 3 first pressing was already made
        if (CharsList.length > 2) {

            if (PressedBut == '.') {} else {
                CharsList = [];
                CharsList.push($scope.Answer);
                CharsList.push(PressedBut);
            }


        }
        // If this is the 3 pressing
        else if (CharsList.length > 1) {

            // Push the new number
            CharsList.push(PressedBut);

            switch (CharsList[1]) {
                case '+':
                    $scope.Answer = CharsList[0] + PressedBut;
                    break;
                case '^':
                    $scope.Answer = Math.pow(CharsList[0], PressedBut);
                    break;
                case '-':
                    $scope.Answer = CharsList[0] - PressedBut;
                    break;
                case '/':
                    $scope.Answer = CharsList[0] / PressedBut;
                    break;
                case 'x':
                    $scope.Answer = CharsList[0] * PressedBut;
                    break;

                case '.':
                    $scope.Answer = CharsList[0] + (PressedBut / 10);
                    break;
            }


            $scope.Answer.toFixed(2);

        } else if (CharsList.length > 0) {

            // In case the operator was pressed is ^2
            if (PressedBut == '^2') {

                $scope.Answer = Math.pow(CharsList[0], 2);

                CharsList.push('^');
                CharsList.push('2');

                // The Operator coast 2 moves
                $scope.MovesLeft--;


                $scope.Answer.toFixed(2);
            } else {
                // Push the new MatAction to the array
                CharsList.push(PressedBut);
            }
        } else {

            CharsList[0] = PressedBut;

            // Print the first num after the equals mark
            $scope.Answer = CharsList[0];


        }
    }

    //check if our get type is ok
    function TypeIsCurrect(PressedNumber) {
        if (CharsList.length % 2 === 0) {
            if (PressedNumber < 10)
                return true;
            else
                return false;
        } else {
            if (PressedNumber > '!')
                return true;
            else
                return false;

        }
    }

    function CalcNextLvl() {
        var WantedNumber = $scope.WantedNumber;
        NextWantedNumber = RandomWantedNumber(WantedNumber, (WantedNumber * 1.3 + RandomWantedNumber(1, 4))) + 2;

        var NewMovesNumber = NeededMoves(NextWantedNumber);
        ChangeLVLonHTML(NextWantedNumber, NewMovesNumber);

    }

    function RandomWantedNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //take the number needed to achive and decide how mutch moves
    function NeededMoves(Number) {
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


    $scope.tryAgain = function() {


        // If player have life left
        if (takeLifes(1)) {

            var neededMoves = NeededMoves(gameState.getWantedNumber());

            var fullAnswer = ConstantsService.defaultGameState.fullAnswer;

            gameState.changeGameState(null, null, neededMoves, fullAnswer, null);

            commonInitializer();
        } else {
            //Todo Ui to player no lifes
        }
    };


    var progressBar = {

        elementId: 'progressBar',
        element: {
            id: 'progressBar',
            getElement: function() {
                return $('#' + this.id);
            }
        },

        colors: {
            defaultColorStyle: {
                class: 'progress-bar-info'
            },
            colorStyleSuccess: {
                class: 'progress-bar-success'
            },
            colorStyleFail: {
                class: 'progress-bar-danger'
            }
        },

        changeToSuccessColor: function() {

            this.changeColor(this.colors.colorStyleSuccess);
        },
        changeToFailColor: function() {
            this.changeColor(this.colors.colorStyleFail);
        },
        changeToDefaultColor: function() {
            this.changeColor(this.colors.defaultColorStyle);
        },

        changeColor: function(color) {

            // Take the dom element
            var progressBar = $(this.element.getElement());

            // If the progressBar dosent have the class already
            // add the class
            if (!progressBar.hasClass(color.class)) {
                progressBar.addClass(color.class);
            }

            var colorsList = angular.copy(this.colors);

            // If other colors classes exists remove them
            angular.forEach(colorsList, function(value, key) {
                if (value.class != color.class && progressBar.hasClass(value.class)) {
                    progressBar.removeClass(value.class);
                }
            });

        },

        changeText: function(newText) {
            $scope.ProgressBarText = newText;
        },
        changeWidth: function(precents) {
            this.element.getElement()[0].style.width = precents+'%';
        },
        initProgressBar: function() {

            // Clear the progressBar state
            this.changeText('');
            this.changeWidth(0);
            this.changeToDefaultColor();
        },
        stageDone: function() {

            this.changeText('Great Work');
            this.changeWidth(100);
            this.changeToSuccessColor();
        }
    };

    var gameState = {
        changeLifesLeft: function(newLifes) {
            $scope.LifesLeft = angular.copy(newLifes);
        },
        changeLevel: function(newLevel) {
            $scope.PlayerLvl = angular.copy(newLevel);
        },
        changeMovesLeft: function(newMoves) {
            $scope.MovesLeft = angular.copy(newMoves);
        },
        changeFullAnswer: function(newFullAnswer) {
            $scope.FullAnswer = angular.copy(newFullAnswer);
        },
        changeWantedNumber: function(newWantedNumber) {
            $scope.WantedNumber = angular.copy(newWantedNumber);
        },

        // ChangeGameState change only the included parameters
        changeGameState: function(playerLevel, wantedNumber, movesLeft, fullAnswer, lifes) {

            if (lifes) {
                this.changeLifesLeft(lifes);
            }
            if (playerLevel) {
                this.changeLevel(playerLevel);
            }
            if (movesLeft) {
                this.changeMovesLeft(movesLeft);
            }
            if (fullAnswer) {
                this.changeFullAnswer(fullAnswer);
            }
            if (wantedNumber) {
                this.changeWantedNumber(wantedNumber);
            }
        },

        getLifesLeft: function() {
            return angular.copy($scope.LifesLeft);
        },
        getLevel: function() {
            return angular.copy($scope.PlayerLvl);
        },
        getMovesLeft: function() {
            return angular.copy($scope.MovesLeft);
        },
        getFullAnswer: function() {
            return angular.copy($scope.FullAnswer);
        },
        getWantedNumber: function() {
            return angular.copy($scope.WantedNumber);
        },

    };

    // Decrement life by lifeToTake prop
    // return true is succeed
    function takeLifes(lifesToTake) {

        var lifeLeft = gameState.getLifesLeft();

        // If decrementation is possible
        if ((lifeLeft - lifesToTake) >= 0) {

            // Take lifes and return true
            gameState.changeLifesLeft(lifeLeft - lifesToTake);
            return true;
        }
        return false;
    }



    // The initializer
    // initialize level and game common things
    var commonInitializer = function() {

        progressBar.initProgressBar();


        CharsList = [];
    }

    // When user start again the game
    $scope.$on('initializeGame', function(event) {

        closeBottomBar();

        // Initialize common thing
        commonInitializer();

        var defaultGameStates = ConstantsService.defaultGameState;

        gameState.changeGameState(defaultGameStates.playerLvl,
            defaultGameStates.wantedNumber,
            defaultGameStates.movesLeft,
            defaultGameStates.fullAnswer,
            defaultGameStates.lifes
        );
    });

    //check if was left moves and extand the lifes
    function AnyMoveLeft() {

        if ($scope.MovesLeft > 0)
            return true;

        return false;
    }

    function IncreaseLifeBy(Number) {

        $scope.LifesLeft += Number;
    }

    function PageLoadManager() {
        FirstLounchDate();
        TutorialManager();

    }


    function onloadpop() {

        intel.xdk.notification.alert("Welcom to math it newton the app is on upgread", "Welcom newton", "its cool");

        if (typeof(Storage) != "undefined") {

            document.getElementById("record").innerHTML = localStorage.getItem("highrec");


        } else {
            document.getElementById("record").innerHTML = "Sorry, your browser does not support Web Storage...";

        }
    }

    $scope.LifeToMoves = function() {
        var Lifes = parseInt(document.getElementById("lifenum").innerHTML);


        if (Lifes > 0) {
            if (confirm("Switch 1 Life to 2 Moves?") === true) {
                document.getElementById("MovesNumber").innerHTML =
                    parseInt(document.getElementById("MovesNumber").innerHTML) + 2;
                Lifes--;
                document.getElementById("lifenum").innerHTML = Lifes;
                //vibrate
                navigator.vibrate([150, 50, 150, 50, 300]);
            }
        } else
            alert("Sorry no more lifes");
    };

    function close() {

        $(".uib_w_47").modal("hide");

    }


    function FirstLounch() {
        if (localStorage.getItem("FirstLounch") === null) {
            localStorage.setItem("FirstLounch", true);
            return false;
        }

        return true;

    }

    function FirstLounchDate() {
        if (localStorage.getItem("FirstLounchDate") === null) {
            localStorage.setItem("FirstLounchDate", Date());
            return Date.now;
        }

        return localStorage.getItem("FirstLounchDate");

    }


    function ThereIsConnection() {

        return GeneralService.NetworkConnected();
    }


    $scope.NextLVLmain = function() {

        // If user finished the level without using
        // all the moves
        if (AnyMoveLeft()) {

            IncreaseLifeBy($scope.MovesLeft / 2);
        }

        HideUnecessaryObjects();

        VisibleNecessaryObjects();

        CalcNextLvl();

        gameState.changeGameState(
            null,
            null,
            null,
            ConstantsService.defaultGameState.fullAnswer,
            null);

        commonInitializer();
    };

    function HideUnecessaryObjects() {
        $('#nxt')[0].style.visibility = "hidden";
    }


    function VisibleNecessaryObjects() {

        $('#tryagains')[0].style.visibility = "visible";
        $('#lifenum')[0].style.visibility = "visible";
        $('#lifestxt')[0].style.visibility = "visible";
        $("#MovesNumber")[0].style.visibility = "visible";

        $('.inputButton').each(function() {
            this.disabled = false;
        });


        $("#WantedNum").removeClass('swashOut');
        $("#WantedNum").addClass('tinUpIn');

    }


    function nextLevelFeatures() {


        progressBar.stageDone();

        $("#nxt").css("visibility", "visible").addClass("nextLvlStartBounce bounce arrow")
            .delay(780).queue(function() {
                $(this).removeClass("nextLvlStartBounce").dequeue();
            });

        if ($("#WantedNum").hasClass('tinUpIn')) {
            $("#WantedNum").removeClass('tinUpIn').addClass('swashOut');
        } else {
            $("#WantedNum").addClass('magictime swashOut');
        }

        $("#MovesNumber").css("visibility", "hidden");
        $("#tryagains").css("visibility", "hidden");
        $("#lifenum").css("visibility", "hidden");
        $("#lifestxt").css("visibility", "hidden");



        $('.inputButton').each(function() {
            this.disabled = true;
        });


        if (ThereIsConnection() && $scope.PlayerLvl % 5 === 0) {
            createInterstitial();
        }


    }

    //printing function
    function ChangeLVLonHTML(NextWantedNumber, NewMovesNumber) {
        $scope.WantedNumber = NextWantedNumber;

        $scope.PlayerLvl++;

        $scope.MovesLeft = NewMovesNumber;
    }
}]);
