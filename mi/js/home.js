
// 从Cookie中读取用户名,设置用户名
var username = getCookie("username");
if(username){
  var login = $("<a href=\"javascript:;\">"+username+"的世界</a>");
  var register = $("<a href=\"javascript:;\">退出</a>")
  $(".login").empty().append(login);
  $(".register").empty().append(register);
  $(".register").click(()=>{
    var define = confirm("确定退出登录???");
    if(define){
      removeCookie("username")
      $(".login").empty().html("<a href=\"../html/login.html\">登录</a>")
      $(".register").empty().html("<a href=\"../html/register.html\">注册</a>")
    }else{
      return false;
    }
  })
}

// 移入导航栏
$("nav .nav-heart ul li").mousemove(()=>{
  $("nav .menu").css("display" , "block");
})
$("nav .menu").mousemove(()=>{
  $("nav .menu").css("display" , "block");
})
$("nav .nav-heart ul li").mouseleave(()=>{
  $("nav .menu").css("display" , "none");
})
$("nav .menu").mouseleave(()=>{
  $("nav .menu").css("display" , "none");
})

// 轮播图
// 点击圆点
var index = 0;
var timer;
$(".banner .banner-heart .point li").click(function(){
  index = $(this).index();
  $(".banner .banner-heart .ban li").eq(index).addClass("current").siblings().removeClass("current").parent().next().children().eq(index).addClass("current").siblings().removeClass("current");
})

// 点击右箭头
$(".banner .banner-heart .gt").click(function(){
  index++;
  if(index === $(".banner .banner-heart .ban li").length){
      index = 0;
  }
  $(".banner .banner-heart .ban li").eq(index).addClass("current").siblings().removeClass("current").parent().next().children().eq(index).addClass("current").siblings().removeClass("current");
})
// 点击左箭头
$(".banner .banner-heart .lt").click(function(){
  index--;
  if(index === -1){
      index = $(".banner .banner-heart .ban li").length-1;
  }
  $(".banner .banner-heart .ban li").eq(index).addClass("current").siblings().removeClass("current").parent().next().children().eq(index).addClass("current").siblings().removeClass("current");
})

// 自动轮播
timer = setInterval(function(){
  index++;
  if(index === $(".banner .banner-heart .ban li").length){
      index = 0;
  }
  $(".banner .banner-heart .ban li").eq(index).addClass("current").siblings().removeClass("current").parent().next().children().eq(index).addClass("current").siblings().removeClass("current");
},3000)
// 鼠标移入移出
$(".banner .banner-heart").hover(()=>{
  clearInterval(timer);
},()=>{
  timer = setInterval(function(){
    index++;
    if(index === $(".banner .banner-heart .ban li").length){
        index = 0;
    }
    $(".banner .banner-heart .ban li").eq(index).addClass("current").siblings().removeClass("current").parent().next().children().eq(index).addClass("current").siblings().removeClass("current");
  },3000)
})


// 周期性倒计时
setInterval(function(){
  var t = +new Date("2222,12,12");
  var now = +new Date();
  var time = (t - now)/1000;
  var day = parseInt(time/(12*60*60));
  var afterday = time - day*12*60*60;
  var hour = parseInt(afterday/(60*60));
  var afterhour = time - day*12*60*60 - hour*60*60;
  var min = parseInt(afterhour/(60));
  var aftermin = time - day*12*60*60 - hour*60*60 - min*60;
  var sec  = parseInt(aftermin);
  if(hour <= 9){
      hour = "0" + hour;
  }
  if(min <= 9){
      min = "0" + min;
  }
  if(sec <= 9){
      sec = "0" + sec;
  }
  // console.log($("main .main-heart .time .ti span")[1].innerText);
  $("main .main-heart .time .ti span")[0].innerText =  hour;
  $("main .main-heart .time .ti span")[1].innerText =  min;
  $("main .main-heart .time .ti span")[2].innerText =  sec;
},1000)


// 


