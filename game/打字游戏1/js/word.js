var oGrade = document.getElementById("grade");
var ungrade = document.getElementById("ungrade");
var shi = document.getElementById("time");
// var time = document.getElementById("time");
var oBox = document.getElementById("box");
var oStart = document.getElementById("start");
var oEnd = document.getElementById("end");
var str = 'abcdef';   //abcdefghigklmnopqrstuvwxyz1234567890
var s;
var score = 0;
var unscore = 0;
oStart.onclick = start;
function start(){
    var timer = 0;  
    clearInterval(timerBall);
    var timerBall = setInterval(function creat(){
        var span = document.createElement("span");
        oBox.appendChild(span);
        s = str[Math.floor(Math.random()*(str.length))];
        span.innerText = s;
        span.style.left = randomNum(0,560) + 'px';
        span.style.top = '0px';
        clearInterval(timerLuo);
        var timerLuo = setInterval(function() {
            span.style.top = span.offsetTop + 8 + 'px';
            if(span.offsetTop > 375){
                clearInterval(timerLuo);
                oBox.removeChild(span);
            }
            return false;
        }, 100);

        oEnd.onclick = function(){
            if(confirm("你确定要退出游戏吗？")){
				var spans = document.querySelectorAll("span");
                for(let i = 0;i < spans.length;i++){
                   oBox.removeChild(spans[i]);
                   console.log(oBox);
                   clearInterval(timerBall);
                    clearInterval(timerLuo);
                    oGrade.innerText = 0;
                    ungrade.innerText = 0;
                    shi.innerText = 0;
                }
            }
            else{
                clearInterval(timerBall);
                start();
            }
            
        }
        
        document.onkeypress = function(e){
            var ev = e || window.event;
            var spans = document.getElementsByTagName("span");
            for(let i = 0;i < spans.length;i++){
                if(ev.keyCode == spans[i].innerText.charCodeAt()){
                    // clearInterval(timerLuo); 
                    score += 1;
                    oGrade.innerText = score;
                    oBox.removeChild(spans[i]);
                }else{
                    unscore += 1;
                    console.log(unscore);
                    ungrade.innerText = unscore;
                    oBox.removeChild(spans[i]);
                }
            }            
        }
    timer += 1;
    time.innerText = timer;
    },1000);   
}
        


function randomNum(min,max){
    return parseInt(Math.random()*(max - min) + min);
}