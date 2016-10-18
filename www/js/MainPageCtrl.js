var MathItApp = angular.module('MathItApp',[]);

MathItApp.controller('MainPageCtrl', function($scope){


var progressBarGreen = "progress-bar progress-bar-success progress-bar-striped";
var progressBarOrang = "progress-bar progress-bar-danger";

var CharsList = [];


$scope.LifesLeft = 3;
$scope.MovesLeft = 3;
$scope.PlayerLvl = 1;
$scope.WantedNumber = 11;
$scope.FullAnswer = 'your answer';
$scope.Answer;
$scope.ProgressBarText = "";



var NextWantedNumber;

// Takes the 100%
// then the number calculate and return the precents
function GetPrecent(HundredPre,Number){

	return Math.round((Number/HundredPre)*100);
}

// Func Print the Answer precents on the progressBar
function ShowPrecent(Answer)
{

	//Get the precents
	var Precent = GetPrecent($scope.WantedNumber,Answer);



	$('#demo')[0].style.width = Precent+ "%";

	if (Precent > 100)
		{
			 $('#demo')[0].className= progressBarOrang;
			 $('#demo')[0].style.width = 100+ "%";
			 $scope.ProgressBarText = "you are in the wrong way";

		}
	else
		{

			 $scope.ProgressBarText = Precent +"%";
		}
}


function ProgressBarSuccess(){

	$('#demo')[0].style.width = "100%";

	 $('#demo')[0].className= progressBarGreen;
	 $scope.ProgressBarText = "Great Work";
}




var PressAvailable = function(PressedNumber){

	return PressedNumber == '.' || $scope.MovesLeft > 0;
}

function LevelFinishedCheck(){

	var finishPrecent = GetPrecent($scope.WantedNumber,$scope.Answer);

	if(finishPrecent < 101 && finishPrecent > 99){
		return true;
	}

	else {
		return false;
	}
}

$scope.MainPress = function(PressedNumber){


	if(PressAvailable(PressedNumber)){

		if(TypeIsCurrect(PressedNumber)){

		$scope.MovesLeft--;


		ClculateResault(PressedNumber)


		$scope.AnswerManager();

		// If user passed level
		if(LevelFinishedCheck()){

		    nextLevelFeatures();
		}
		else{

		ShowPrecent($scope.Answer);
		}


		}
		else{
			ShakeCurrectButType(PressedNumber);
		}
	}
	else{

		FadeTryAgainBtn();

		 ShakeAnswer();

		 navigator.vibrate(300);
	}


}

var FadeTryAgainBtn = function(){
	$('#tryagains').addClass('Fade').delay(1000).queue(function(){
			$(this).removeClass('Fade');
		});
}

var ShakeAnswer = function(){
	$('#show').addClass('ShakeResult').delay(1000).queue(function(){
			$(this).removeClass('ShakeResult');
		});
}

var ShakeCurrectButType = function(PressedBut){

	if(PressedBut > 10){
		$('.numberBut').addClass('ShakeResult').delay(1000).queue(function(){
			$(this).removeClass('ShakeResult');
		});
	}
	else{
		$('.actionBut').addClass('ShakeResult').delay(1000).queue(function(){
			$(this).removeClass('ShakeResult');
		});
	}


}


$scope.AnswerManager = function()
{

	var EndAnswer = $scope.Answer;

	var answerString ="";

	for(var i = 0 ; i < CharsList.length ; i++)
	{
		answerString += CharsList[i] + " ";
	}

	$scope.FullAnswer = answerString + " = " + EndAnswer;


}



function ClculateResault(PressedBut)
{

	// If the 3 first pressing was already made
	if(CharsList.length > 2){

		if(PressedBut == '.'){

		}
		else{
			CharsList = [];
			CharsList.push($scope.Answer);
			CharsList.push(PressedBut);
		}


	}
	 // If this is the 3 pressing
	else if(CharsList.length > 1){

		// Push the new number
		CharsList.push(PressedBut);

		switch(CharsList[1]){
	    case '+':
				$scope.Answer = CharsList[0] + PressedBut;
				break;
	    case '^':
				$scope.Answer = Math.pow(CharsList[0],PressedBut);
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
				$scope.Answer = CharsList[0] + (PressedBut/10);
				break;
		}


	$scope.Answer.toFixed(2)

	}
	else if (CharsList.length > 0){

		// In case the operator was pressed is ^2
		if(PressedBut == '^2')
		{

			$scope.Answer = Math.pow(CharsList[0],2);

			CharsList.push('^');
			CharsList.push('2');

			// The Operator coast 2 moves
			$scope.MovesLeft--;


			$scope.Answer.toFixed(2)
		}
		else{
		// Push the new MatAction to the array
		CharsList.push(PressedBut);
		}
	}
	else{

		CharsList[0] = PressedBut;

		// Print the first num after the equals mark
		$scope.Answer = CharsList[0];


	}
}



//check if our get type is ok
function TypeIsCurrect(PressedNumber)
{
	if(CharsList.length % 2 == 0)
		{
		 if(PressedNumber < 10)
				 return true;
			else
				return false;
		}
	else
		{
			if(PressedNumber > '!')
				 return true;
			else
				return false;

		}
}





function CalcNextLvl()
{
	var WantedNumber = $scope.WantedNumber;
	 NextWantedNumber = RandomWantedNumber(WantedNumber,(WantedNumber*1.3+RandomWantedNumber(1,4)))+2;

	var NewMovesNumber = NeededMoves(NextWantedNumber);
	ChangeLVLonHTML(NextWantedNumber,NewMovesNumber);

}


function RandomWantedNumber(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
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

	$scope.FullAnswer = "your answer";


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

	 $scope.FullAnswer = "your answer";


	var neededMoves = NeededMoves(WantedNumber);
	$scope.WantedNumber = neededMoves;

	InitProgressBar();

}

function InitProgressBar(){


	$scope.ProgressBarText = "";
	$('#demo')[0].style.width = "0%";
	$('#demo')[0].className = "progress-bar progress-bar-info progress-bar-success";

	}

  $scope.StartOver = function()
{
	$scope.WantedNumber = "11";
	$scope.PlayerLvl = 1;

         $scope.FullAnswer = "your answer";
	$scope.MovesLeft = 3;

	InitProgressBar();


	CharsList = [];


	//fold opend sidebar ^ stop blinking
	uib_sb.toggle_sidebar($(".uib_w_55"));
	$('#startover').removeClass('blink');
}


//check if was left moves and extand the lifes
function AnyMoveLeft()
{

	if($scope.MovesLeft > 0)
		return true;

	return false;
}

function IncreaseLifeBy(Number){

	$scope.LifesLeft += Number;
}

function PageLoadManager()
{
	HighRecord(1);
	FirstLounchDate();
	TutorialManager();

}


function onloadpop()
{

intel.xdk.notification.alert("Welcom to math it newton the app is on upgread","Welcom newton","its cool");

if (typeof(Storage) != "undefined") {

    document.getElementById("record").innerHTML = localStorage.getItem("highrec");


}
	else
	{
    	document.getElementById("record").innerHTML = "Sorry, your browser does not support Web Storage...";

	}

}

function LifeToMoves()
{
	var Lifes = parseInt(document.getElementById("lifenum").innerHTML);


	if(Lifes>0)
		{
		if(confirm("Switch 1 Life to 2 Moves?")==true)
			{
			document.getElementById("MovesNumber").innerHTML=
			parseInt(document.getElementById("MovesNumber").innerHTML)+2;
			Lifes--;
			document.getElementById("lifenum").innerHTML = Lifes;
				//vibrate
			navigator.vibrate([150, 50, 150, 50, 300]);
			}
	}
	else
		alert("Sorry no more lifes");
}

function close()
{

         $(".uib_w_47").modal("hide");

}

function HighRecord(level)
{
	//document.getElementById("PlayerLevel").innerHTML = time;
	if(localStorage.getItem("HighRecordlvl")==null || level > localStorage.getItem("HighRecordlvl"))
		{
		var thiScore = parseInt(document.getElementById("WantedNum").innerHTML);
		localStorage.setItem("HighRecordScore", thiScore);
		localStorage.setItem("HighRecordlvl", level);
		}

	document.getElementById("HighestLevelRecord").innerHTML = localStorage.getItem("HighRecordlvl");
	document.getElementById("HighestScore").innerHTML = localStorage.getItem("HighRecordScore");

}

function FirstLounch()
{
	if(localStorage.getItem("FirstLounch")==null)
	{
		localStorage.setItem("FirstLounch", true);
		return false;
	}

	return true

}

function FirstLounchDate()
{
   if(localStorage.getItem("FirstLounchDate") == null)
	{
		localStorage.setItem("FirstLounchDate", Date());
		return Date.now;
	}

	return localStorage.getItem("FirstLounchDate");

}


function ThereIsConnection()
{
	return intel.xdk.device.connection != "null";
}




 $scope.NextLVLmain = function()
{

	 // If user finished the level without using
	 // all the moves
	if(AnyMoveLeft()){

		IncreaseLifeBy($scope.MovesLeft/2);
	}

	HideUnecessaryObjects();

	VisibleNecessaryObjects();

	CalcNextLvl();

	$scope.ClearData(false);
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
	$("#MovesNumber")[0].style.visibility = "visible";

	$('.inputButton').disabled = false;


	 $("#WantedNum").removeClass('swashOut');
	 $("#WantedNum").addClass('tinUpIn');

}


function nextLevelFeatures()
{

    ProgressBarSuccess();

	  $("#nxt").css( "visibility", "visible" ).addClass("nextLvlStartBounce bounce arrow")
		  .delay(780).queue(function(){
    		$(this).removeClass("nextLvlStartBounce").dequeue(); });

	if($("#WantedNum").hasClass('tinUpIn')){
	   $("#WantedNum").removeClass('tinUpIn').addClass('swashOut');
	}
	else{
	 $("#WantedNum").addClass('magictime swashOut');
	}

	$("#MovesNumber").css("visibility", "hidden");
	$("#tryagains").css("visibility", "hidden");
	$("#lifenum").css("visibility", "hidden");
	$("#lifestxt").css("visibility", "hidden");



	$('.inputButton').disabled = true;

    if(ThereIsConnection() && $scope.PlayerLvl % 5 == 0)
	{
	    createInterstitial();
	}


}

	//printing function
function ChangeLVLonHTML(NextWantedNumber,NewMovesNumber)
{
	$scope.WantedNumber = NextWantedNumber;

	$scope.PlayerLvl++;

	$scope.MovesLeft = NewMovesNumber;
}

});
