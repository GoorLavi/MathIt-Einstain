MathItApp.controller('MainPageCtrl', ['$scope', '$ionicModal', 'GeneralService', 'ConstantsService', 'CalculationService', 'GameStateService', 'GameManagerService', '$ionicPopup', '$ionicLoading',
    function($scope, $ionicModal, GeneralService, ConstantsService, CalculationService, GameStateService, GameManagerService, $ionicPopup, $ionicLoading) {



        // Game will initialize here
        var gameInit = function() {

            // Init the bottom bar
            bottomBar.initialize();

            GameManagerService.initialize();

            $scope.gameState = GameStateService.state;


            // ProgressBar controller assign hes self
            // to $scope.progressBar
            // in ProgressBar controller initialize
            $scope.progressBar = {};
        };




        $scope.LifeToMoves = function() {
            var lifeToMovesPopup = $ionicPopup.confirm({
                title: 'Life To Moves',
                template: 'Switch 1 Life to 2 Moves?'
            });
            lifeToMovesPopup.then(function(res) {
                if (res) {
                    GameManagerService.lifeToMoves();
                }
            });
        };


        bottomBar = {
            modal: {},

            close: function() {
                this.modal.hide();
            },

            open: function() {
                this.modal.show();
            },

            initialize: function() {
                $ionicModal.fromTemplateUrl('./views/bottomBar.html', function(modal) {
                    this.modal = modal;
                }, {
                    scope: $scope,
                    backdropClickToClose: true,
                    // The animation we want to use for the modal entrance
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    this.modal = modal;
                }.bind(this));
            }
        };


        $scope.OpenBottomBar = function() {

            bottomBar.open();
        };


        $scope.$on('stageDone', function(event) {

            nextLevelFeatures();
        });

        $scope.gameButtonPressed = function(button) {

            GameManagerService.MainPress(button);
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

        $scope.tryAgain = function() {

            GameManagerService.tryAgain();
        };

        // When user start again the game
        $scope.$on('initializeGame', function(event) {

            bottomBar.close();
        });




        function ThereIsConnection() {

            return GeneralService.NetworkConnected();
        }


        $scope.setNextStage = function() {

            HideUnecessaryObjects();


            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 800,
            });


            GameManagerService.setNextStage();

            $ionicLoading.hide();

            VisibleNecessaryObjects();

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

        gameInit();
    }
]);
