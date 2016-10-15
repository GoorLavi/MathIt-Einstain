var MathItApp = angular.module('MathItApp',[]);

MathItApp.controller('MainPageCtrl', function($scope){


var CharsList = [0,0,0,0,0];
var OldCharsList = [0,0,0,0,0];
//where is my position in the list
var ListPosition = 0;

var progressBarGreen = "progress-bar progress-bar-success progress-bar-striped";
var progressBarOrang = "progress-bar progress-bar-danger";

//check if the type is currect
var TypeCheck = true;

$scope.LifesLeft = 3;
$scope.MovesLeft = 3;
$scope.PlayerLvl = 1;
$scope.WantedNumber = 11;
$scope.Answer = 'your answer';

function ShowPrecent(Answer)
{
	//math the precents
	var Precent = (Answer/parseInt(document.getElementById("WantedNum").innerHTML))*100;
	Precent = Math.round(Precent);

	document.getElementById("demo").style.width = Precent+ "%";

	if(Precent==100)
		{
			 document.getElementById("demo").className= progressBarGreen;
			 document.getElementById("demo").innerHTML="Great Work";
			 nextLevelFeatures();
		}
	else if (Precent > 100)
		{
			 document.getElementById("demo").className= progressBarOrang;
			 document.getElementById("demo").style.width = 100+ "%";
			 document.getElementById("demo").innerHTML="you are in the wrong way";

		}
	else
		{

			 document.getElementById("demo").innerHTML=Precent +"%";

		}




}


function checkDotBug()
{
	if(CharsList[1] == '.')
			{

				 if(!(OldCharsList[0] == 0))
					{

					 CharsList[0] = OldCharsList[0];
					 CharsList[1] = OldCharsList[1];
					 CharsList[2] = OldCharsList[2]+CharsList[2]/10;
					}

			}

}

function DoubelDot(thisNumber)
{
	if(OldCharsList[1] == '.' && thisNumber == '.')
					return false;

	return true;

}


function nextLevelFeatures()
{

	$('#nxt')[0].style.visibility="visible";
	$('#tryagains')[0].style.visibility="hidden";
	$('#lifenum')[0].style.visibility="hidden";
	$('#lifestxt')[0].style.visibility="hidden";


	$('.inputButton').disabled = true;

}



$scope.MainPress = function(ThisNumber){
	//check if its the right type and its not the dot bugs
	if(TypeIsCurrect(ThisNumber) && DoubelDot(ThisNumber))
	{
		if($scope.MovesLeftFunc(ThisNumber))
			{

				CharsList[ListPosition]=ThisNumber;

					ListPosition++;
					$scope.AnswerManager();
					ShowPrecent(GetAnswer());
			}

	}

}

$scope.MovesLeftFunc = function(CurrentNumber)
{

	var CurrentMovesNumber = $scope.MovesLeft;

	if(CurrentNumber == '.')
		{
		$scope.MovesLeft++;
		return true;

		}
	else if(CurrentMovesNumber == 0 || (CurrentNumber == 'x'&&CurrentMovesNumber<2))
	 {
		 $('#tryagains').addClass('Fade');

		 $('#show').addClass('ShakeResult');
		 navigator.vibrate(300);
		 return false;
          }

	else
	{
	switch(CurrentNumber)
	{
    case '.':
			CurrentMovesNumber++;
			break;
    case '^2':
			CurrentMovesNumber-=2;
			break;
    default:
		         CurrentMovesNumber--;
			break;
	}

		$scope.MovesLeft = CurrentMovesNumber;

		$('#show').removeClass('ShakeResult');
		$('#tryagains').removeClass('Fade');


		return true;
	}
}




$scope.AnswerManager = function()
{
	var answerString ="";

	var EndAnswer="";
		EndAnswer = GetAnswer();

			for(var i = 0 ; i < ListPosition ; i++)
			{
				answerString+=CharsList[i]+" ";
			}
		$scope.Answer = answerString+" = "+EndAnswer;


}



function GetAnswer()
{
	var Answer ;

	if(ListPosition == 3)
		{
			//if the dot is in spot 4 in chars list
			checkDotBug();

	switch(CharsList[1])
		{
	    case '+':
				Answer = CharsList[0] + CharsList[2];
				break;
	    case '^':
				Answer = Math.pow(CharsList[0],CharsList[2]);
				break;
	    case '-':
				Answer = CharsList[0] - CharsList[2];
				break;
	    case '/':
				Answer = CharsList[0] / CharsList[2];
				break;
	    case 'x':
				Answer = CharsList[0] * CharsList[2];
				break;

	    case '.':
				Answer = CharsList[0] + (CharsList[2]/10);
				break;
		}

			OldCharsList = CharsList.slice();
			CharsList[0] = Answer;
			CharsList[1] = 0;
			CharsList[2] = 0;
			ListPosition = 1;
	}
	else if(ListPosition == 2 && CharsList[1] == '^2')
		{
		CharsList[0]= Math.pow(CharsList[0],2);
		Answer = CharsList[0];
		ListPosition = 1;

		}
	else
		{
			Answer = CharsList[0];
		}

	Answer.toFixed(2);
	return Answer;
}



//check if our get type is ok
function TypeIsCurrect(ThisNumber)
{
	if(ListPosition%2 == 0)
		{
		 if(ThisNumber<10)
				 return true;
			else
				return false;
		}
	else
		{
			if(ThisNumber>'!')
				 return true;
			else
				return false;

		}
}




 $scope.NextLVLmain = function(LvlsToJump)
{
   while(LvlsToJump>0)
	{
	LvlsToJump--;
	AnyMoveLeft();
	HideUnecessaryObjects();
	VisibleNecessaryObjects();
	CalcNextLvl();

	$scope.ClearData(false);
	}
	//save the new record
	HighRecord($scope.PlayerLvl);
}

function HideUnecessaryObjects()
{
	$('#nxt')[0].style.visibility = "hidden";
}


function VisibleNecessaryObjects()
{

	$('#tryagains')[0].style.visibility = "visible";
	$('#lifenum')[0].style.visibility = "visible";
	$('#lifestxt')[0].style.visibility = "visible";

	$('.inputButton').disabled = false;

}

var NextWantedNumber;

function CalcNextLvl()
{
	var WantedNumber = parseInt(document.getElementById("WantedNum").innerHTML);
	 NextWantedNumber = RandomWantedNumber(WantedNumber,(WantedNumber*1.3+RandomWantedNumber(1,4)))+2;

	var NewMovesNumber = NeededMoves(NextWantedNumber);
	ChangeLVLonHTML(NextWantedNumber,NewMovesNumber);

}


function RandomWantedNumber(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

//printing function
function ChangeLVLonHTML(NextWantedNumber,NewMovesNumber)
{
	$scope.WantedNumber = NextWantedNumber;

	$scope.PlayerLvl++;

	$scope.MovesLeft = NewMovesNumber;
}

//take the number needed to achive and decide how mutch moves
function NeededMoves(Number)
{
	if(Number < 20 ){
		return 3;
	}
	else if(Number < 100){
		return 5;
	}
	else if(Number < 500){
		return 7;
}
	else{
		return 9;
	}
}

//takeAlife =  true he lose false won
$scope.ClearData = function(TakeAlife)
{

	CharsList = [];
	OldCharsList = [];

	ListPosition = 0;

	InitProgressBar();

	$scope.Answer = "your answer";


	if($('#tryagains').hasClass('Fade')){
	$('#tryagains').removeClass('Fade');
	}




	//if player pressed Try Again button
	if(TakeAlife && $scope.LifesLeft > 0 )
		{
		$scope.LifesLeft--;
		$scope.MovesLeft = NeededMoves($scope.WantedNumber);
		}


	//if player dont have more try again points
	else if (TakeAlife && $scope.LifesLeft == 0)
		{
			$('#lifenum').addClass('ShakeResult');

//         		uib_sb.toggle_sidebar($(".uib_w_55"));

//		         $('#startover').addClass('blink');
		}


	    //if he passed level
	     else
		{

		$scope.MovesLeft = NeededMoves(NextWantedNumber);
		}

}

function StartAgain(){

	 $scope.Answer = "your answer";


	var neededMoves = NeededMoves(WantedNumber);
	$scope.WantedNumber = neededMoves;

	InitProgressBar();

}

function InitProgressBar(){

	var ProgressBar = $('#demo')[0];
	ProgressBar.text = "0";
	ProgressBar.style.width = "0%";
	ProgressBar.className = "progress-bar progress-bar-info progress-bar-success";

	}

function StartOver()
{
	$scope.WantedNumber = "11";
	$scope.PlayerLvl = 1;

         $scope.Answer = "your answer";
	$scope.MovesLeft = "3";

	InitProgressBar();


	CharsList = [];

	ListPosition = 0;

	//fold opend sidebar ^ stop blinking
	uib_sb.toggle_sidebar($(".uib_w_55"));
	$('#startover').removeClass('blink');
}


//check if was left moves and extand the lifes
function AnyMoveLeft()
{

	if($scope.MovesLeft > 0)
		$scope.LifesLeft++;
}



});
