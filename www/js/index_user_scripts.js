

(function()
{
 "use strict";
 /*
   hook up event handlers
 */

 function register_event_handlers()
 {


        /* button  .uib_w_43 */
    $(document).on("click", ".buttomSideBar", function(evt)
    {
         /* Other possible functions are:
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */

         uib_sb.toggle_sidebar($(".uib_w_42"));
    });

        /* button  #howtoplay */
    $(document).on("click", "#howtoplay", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals
            */
        uib_sb.close_all_sidebars();

        $(".uib_w_47").modal("toggle");
    });



	     /* button  #closepop */
    $(document).on("click", "#closepop", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals
            */

        $(".uib_w_47").modal("toggle");
    });

        /* button  #startover */
    $(document).on("click", "#startover", function(evt)
    {
        //start();

        ButtonsState();

            uib_sb.close_all_sidebars();

         uib_sb.toggle_sidebar($(".uib_w_42"));
    });

        /* button  #buttom-bar */


        /* button  #buttom-bar */
    $(document).on("click", "#buttom-bar", function(evt)
    {
	ButtonsState();
         uib_sb.toggle_sidebar($(".uib_w_55"));

    });

        /* button  #Toturial */
    $(document).on("click", "#Toturial", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals
            */
        ButtonsState();
	uib_sb.toggle_sidebar($(".uib_w_55"));
         $("#FirstTutorial").modal("toggle");
    });


	     $(document).on("click", "#nextTutorial2", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals
            */

         $("#FirstTutorial").modal("toggle");
	$("#SecoundTutorial").modal("toggle");

    });


	 	     $(document).on("click", "#nextTutorial3", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals
            */

         $("#SecoundTutorial").modal("toggle");
	$("#ThirdTrial").modal("toggle");

    });


	 	 	     $(document).on("click", "#nextTutorial4", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals
            */

         $("#ThirdTrial").modal("toggle");
	$("#FourTutorial").modal("toggle");

    });



	 	 	 	     $(document).on("click", "#CloseTutorial", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals
            */
	$("#FourTutorial").modal("toggle");

    });
	 //CloseTutorial

    }
 document.addEventListener("app.Ready", register_event_handlers, false);


})();
