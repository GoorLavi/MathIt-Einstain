

function TutorialManager()
{
	if(FirstPlayerGame())
		{
		StartTutorial();

		}

}

function FirstPlayerGame()
{
	if(!localStorage.getItem("firstGame"))
		{
		localStorage.setItem("HighestRecorde", true);
			return true;
		}
	return false;

}

function StartTutorial()
{
	$("#FirstTutorial").modal("toggle");
}
