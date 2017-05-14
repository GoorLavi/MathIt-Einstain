MathItApp.service('CalculationService', [function() {

    var self = this;

    self.calculator = function(mathFormulaArray) {

            var result = mathFormulaArray[0];

            for (var i = 0;
                (i < mathFormulaArray.length) && (mathFormulaArray[i + 2]); i = i + 2) {


                switch (mathFormulaArray[i + 1]) {
                    case '+':
                        result = result + mathFormulaArray[i + 2];
                        break;
                    case '^':
                        result = Math.pow(result, mathFormulaArray[i + 2]);
                        break;
                    case '-':
                        result = result - mathFormulaArray[i + 2];
                        break;
                    case '/':
                        result = result / mathFormulaArray[i + 2];
                        break;
                    case 'x':
                        result = result * mathFormulaArray[i + 2];
                        break;
                    case '~':
                        result = Math.log(result) / Math.log(mathFormulaArray[i + 2]);
                        break;
                    case '~2':
                        result = Math.log(result) / Math.log(2);
                        break;
                    case '.':

                        // If thats the first fomula combinetions
                        if (i == 0) {
                            result = result + (mathFormulaArray[i + 2] / 10);
                        } else {

                            // Revers the last combination to get the old result
                            var oldResult = reversCalculation(result, mathFormulaArray[i - 1], mathFormulaArray[i]);

                            // Create the new decimal number
                            var decimalNumber = mathFormulaArray[i] + (mathFormulaArray[i + 2] / 10);

                            // Recalculate the combination with the new number(decimal)
                            result = self.calculator([oldResult, mathFormulaArray[i - 1], decimalNumber]);
                        }

                        break;
                }
            }
            return result;
        }


        // Func revers the calculation
        var reversCalculation = function(result, action, number) {

            var reversedAction = '';

            // Get the opposit operator
            switch (action) {
                case '+':
                    reversedAction = '-';
                    break;
                case '^':
                    reversedAction = '~';
                    break;
                case '^2':
                    reversedAction = '~2';
                    break;
                case '-':
                    reversedAction = '+';
                    break;
                case '/':
                    reversedAction = '*';
                    break;
                case 'x':
                    reversedAction = '/';
                    break;
            }

            // Return the reversed number
            return self.calculator([result, reversedAction, number]);
        }
}]);
