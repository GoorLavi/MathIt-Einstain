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















