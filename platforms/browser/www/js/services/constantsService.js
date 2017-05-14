MathItApp.service('ConstantsService', [function() {

    var self = this;

    self.defaultGameState = {
        wantedNumber: 11,
        playerLvl: 1,
        movesLeft: 3,
        fullAnswer: "your answer",
        lifes: 3
    };

    self.progressBar = {
      colors : {
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
      width: {
        default:'0%',
        done:'100%'
      },
      text:{
        default:''
      }
    }


}]);
