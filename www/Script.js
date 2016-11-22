//var x = 3;
//var i=0,j;
//var answer;
//var nums = [0,0,0,0,0,0,0,0,0,0];
//var wanted = 11;
//var prec;
//var shar = 100;
//var moves = 3;
//var lvl=1;
//var kaful = 1, pluse = 0, minus = 0, hiluk = 1;
//var countermoves = 0;
//var countermath = 0;
//var save = 0;
//var lifenumb = 0;
//   function change(prec) {
//
//
//       if (prec > 100) prec = "you are in the wrong way";
//       else if (prec == 100) { prec = "great work"; nextlvl(); }
//        if (99 <= prec&&prec <= 101){ prec =" close enough ";nextlvl(); }
//            document.getElementById("demo").innerHTML = prec;
//            if (prec == "you are in the wrong way") prec = 100;
//             document.getElementById("demo").style.width = prec + "%";
//
//
//        }
//
//         function calc(j) {
//             lifenumb = document.getElementById("lifenum").innerHTML;
//               wanted = document.getElementById("wantednum").innerHTML;
//             var  movesleft = document.getElementById("movesnum").innerHTML;
//
//             if (0 < movesleft) {
//                 nums[i] = j;
//                  movesleft--;
//
//                 if (nums[2] != 0) {
//                     if (nums[1] == '+')
//                         nums[0] = nums[0] + nums[2];
//                     else if (nums[1] == '-')
//                         nums[0] = nums[0] - nums[2];
//                     else if (nums[1] == '*')
//                         nums[0] = nums[0] * nums[2];
//                     else if (nums[1] == '/')
//                         nums[0] = nums[0] / nums[2];
//
//                     else if (nums[1] == '.') {
//                         nums[0] = nums[0] + (nums[2]) / 10;
//
//                     }
//                     else if (nums[1] == 'xx') {
//                         save = nums[0]
//                         for (var www = nums[2]; www > 1; www--) {
//                             save = save * nums[0];
//                         }
//                         nums[0] = save;
//                         save = 0;
//                     }
//                 }
//                 if (nums[1] == '.')
//                         movesleft++;
//
//                      if (nums[1] == 'x'){
//                  nums[0] = nums[0] * nums[0];
//                  movesleft--;
//                 i = 0;
//                  nums[1] = 0;nums[2] = 0;
//                }
//
//                 answer = nums[0];
//                 document.getElementById("show").innerHTML = answer;
//                 if (i <= 2)
//                     i++;
//                 else i = 0;
//                 if (nums[2] != 0) { i = 1;nums[1]=0;nums[2]=0; }
//             }
//             else alert("in this lvl u have " + moves + " moves");
//             prec = (answer / wanted) * shar;
//             change(prec);
//
//               document.getElementById("movesnum").innerHTML= movesleft;
//        }
//        function again() {
//            lifenumb = document.getElementById("lifenum").innerHTML;
//            if (lifenumb > 0) {
//                clear();
//                lifenumb--;
//            }
//            else{
//                alert("you dont have lifes");
//            }
//
//             document.getElementById("lifenum").innerHTML= lifenumb ;
//
//        }
//
//        function nextlvl() {
//
//             document.getElementById("demo").style.width =  "100%";
//                 document.getElementById("nxt").style.visibility = "visible";
//
//
//        }
//
//
//        function changelvl(){
//          var readmoves=document.getElementById("movesnum").innerHTML ;
//
//            readmoves--;
//            if (readmoves > 0) {
//                lifenumb++;
//                lifenumb++;
//            }
//             document.getElementById("lifenum").innerHTML= lifenumb ;
//            lvl++;
//
//            if (lvl>2){
//            }
//            if (lvl >4) {moves = 5;  }
//            if(lvl>8){kaful=lvl-lvl*0.5;moves = 5;}
//            ;pluse=lvl+6;minus=lvl-1;
//            if (lvl > 10) {}
//            wanted= Math.floor((Math.random() * 10)+1 )+lvl;
//            will= ((wanted)*kaful+pluse-minus)/hiluk ;
//
//
//            if (countermoves >= 2) {
//                countermoves = 0;
//            }
//        countermoves++;
//              clear();
//           document.getElementById("movesnum").innerHTML =  moves ;
//           document.getElementById("wantednum").innerHTML =  will;
//           document.getElementById("lvlwant").innerHTML =  "level "+lvl;
//           document.getElementById("nxt").style.visibility = "hidden";
//
//        }
//        function clear(){
//             answer = 0;
//                i = 0;
//                prec = 0;
//                nums = [0, 0, 0];
//                document.getElementById("show").innerHTML = "0";
//                document.getElementById("demo").innerHTML = "0";
//                document.getElementById("demo").style.width = "0%";
//                countermath = 0;
//                document.getElementById("movesnum").innerHTML = moves;
//
//        }
