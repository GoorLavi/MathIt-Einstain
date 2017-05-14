MathItApp.service('NeededMovesService', [function() {

    var self = this;

    var List = [];

    var initializeService = function() {

        List = [];
    }

    self.calculateNeededMoves = function(wantedNumber) {

        var currentDepth = 1;

        while (List.length == 0) {
            calcFunc(wantedNumber, 9, currentDepth, 1);
            currentDepth++;
        }

        var lowestMoves = getLowestCalculatedMoves();

        initializeService();

        return lowestMoves;
    }


    var calcFunc = function(wantedNumber, numberToTry, maxDepth, currentDepth) {

        // thats the answer
        if (wantedNumber < 10 && wantedNumber % 1 == 0) {

            List.push(currentDepth + currentDepth -1);
            return true;
        } else if (wantedNumber < 10 || wantedNumber % 1 != 0) {
            return false;
        }


        currentDepth++;


        if (maxDepth - 1 == 0) {
            return false;
        }

        numberToTry = 10;

        do {
            if (numberToTry - 1 < 1) {
                break;
            }
            numberToTry--;
        }
        while (!(calcFunc(wantedNumber / numberToTry, numberToTry, maxDepth - 1, currentDepth) || calcFunc(wantedNumber - numberToTry, numberToTry, maxDepth - 1, currentDepth)));

        return false;
    }

    var getLowestCalculatedMoves = function() {

        var lowestMoves = List[0];

        angular.forEach(List, function(calculationMoves) {

            if (lowestMoves > calculationMoves) {
                lowestMoves = calculationMoves;
            }
        });

        return lowestMoves;
    }



    // calcFunc = function(num, path, numberToTry, maxDepth, currentDepth) {
    //
    //
    //
    //     // thats the answer
    //     if (num < 10 && num % 1 == 0) {
    //
    //         path += ' = ' + num;
    //
    //         print(currentDepth, path);
    //         return true;
    //     } else if (num < 10 || num % 1 != 0) {
    //         return false;
    //     }
    //
    //     path += ' ' + num;
    //
    //
    //     currentDepth++;
    //
    //
    //     if (maxDepth - 1 == 0) {
    //         return false;
    //     }
    //
    //     numberToTry = 9;
    //
    //     do {
    //         if (numberToTry - 1 < 1) {
    //             break;
    //         }
    //         numberToTry--;
    //     }
    //     while (!(calcFunc(num / numberToTry, path + '*' + numberToTry, numberToTry, maxDepth - 1, currentDepth) || calcFunc(num - numberToTry, path + '+' + numberToTry, numberToTry, maxDepth - 1, currentDepth)));
    //
    //     return false;
    // }
    //

}]);
