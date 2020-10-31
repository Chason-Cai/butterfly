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

var reg = /id=(\d+)/;
var id = reg.exec(location.search);
// console.log(res);
if(!id){
  alert("此路不通");
  location.assign("../html/list.html")
}
id = id[1];
$.ajax({
  url:"../php/detail.php",
  data:{id},
  type:"get",
  dataType:"json",
  success(res){

    // var number = arr.find(v=>v.goodsid = res[i].id).number;
    // console.log(number);
    var imgSmall0 = res.imgpath.split("----------")[0];
    var imgSmall1 = res.imgpath.split("----------")[1];
    var imgSmall2 = res.imgpath.split("----------")[2];
    var imgSmall3 = res.imgpath.split("----------")[3];
    var imgSmall4 = res.imgpath.split("----------")[4];

    $("main .main_heart .left .big img").attr("src",imgSmall0);
    $("main .main_heart .left .middle img").attr("src",imgSmall0);
    $("main .main_heart .left .small img:nth-child(1)").attr("src",imgSmall0);
    $("main .main_heart .left .small img:nth-child(2)").attr("src",imgSmall1);
    $("main .main_heart .left .small img:nth-child(3)").attr("src",imgSmall2);
    $("main .main_heart .left .small img:nth-child(4)").attr("src",imgSmall3);
    $("main .main_heart .left .small img:nth-child(5)").attr("src",imgSmall4);


    $("main .main_heart .right h1").text(res.name);
    $("main .main_heart .right .price span").text(res.price);
    $("main .main_heart .right .toAll span").text(res.price);
    $(".desc p").text(res.desc);

    // 数量加减
    $("[name='add']").click(function(){
      var num = $(this).prev().val()-0
      num++;
      if(num>=5){
        num = 5
        $(this).prev().val(num)
        $(this).css({background:"red"})
      }else{
        $(this).css({background:"#fff"})
        $(this).prev().prev().css({background:"#fff"})
      }
      $(this).prev().val(num);
      $("main .main_heart .right .toAll span").text(res.price*num);

      
    })

    $("[name='reduce']").click(function(){
      var num = $(this).next().val()-0
      // console.log(num);
      num--;
      if(num<=$(this).next().attr("ta")-0){
        num = $(this).next().attr("ta")-0
        $(this).next().val(num)
        $(this).css({background:"red"})
      }else{
        $(this).css({background:"#fff"})
        $(this).next().next().css({background:"#fff"})
      }
      $(this).next().val(num);
      $("main .main_heart .right .toAll span").text(res.price*num);


    })

  }
})



$(".cart").click(()=>{
  // console.log(username);
  if(!username){
    alert("请先登录");
    location.href="../html/login.html";
    return false;
  }

  var data = localStorage.getItem("cart");

  if(data){
    data = JSON.parse(data);
    var res = data.some(function(v){
      return v.username == username && v.goodsid == id;
    })
    if(res){
      var oldObj = data.find(function(v){
        return v.username == username && v.goodsid == id;
      })
      
      oldObj.number++
      data = JSON.stringify(data);
      localStorage.setItem("cart",data)
      // console.log(data);
    }else{
      var newObj = {
        username,
        goodsid:id,
        number:1
      }
      data.push(newObj);
      // console.log(newObj);
      data = JSON.stringify(data);
      localStorage.setItem("cart",data) 
    }
  }else{
    var obj = {
      username,
      goodsid:id,
      number:1
    }
    var arr = [];
    arr.push(obj);
    var cart = JSON.stringify(arr);
    localStorage.setItem("cart",cart);
  }

  alert("您的宝贝入车啦...");
  return false;
})

// 放大镜
var small = document.querySelector(".small");
var middle = document.querySelector(".middle");
var shade = document.querySelector(".middle .shade");
var big = document.querySelector(".big");
var box = document.querySelector(".left");

enlarge();
function enlarge(){
    // 点小图换大图和中图
    var smallImgs = document.querySelectorAll(".small img");
    var that = document.querySelector(".small .active");
    var middleImg = document.querySelector(".middle img");
    // console.log(middleImg);
    var bigImg = document.querySelector(".big img");
    for(var i=0;i<smallImgs.length;i++){
        smallImgs[i].onclick = function(){
            that.className = '';
            this.className = 'active';
            that = this;
            // 换大图和中图 - 路径和自己一样
            middleImg.src = this.src
            bigImg.src = this.src
        }
    }

    // 中盒子做鼠标移入事件 - 让遮罩显示，让大盒子显示
    middle.onmouseover = function(){
        shade.style.display = 'block';
        big.style.display = 'block';
        // 鼠标移动事件
        middle.onmousemove = function(e){
            var e = e || window.event;
            // 获取鼠标位置
            var x = e.pageX;
            var y = e.pageY;
            // 计算遮罩的位置
            var l = x - middle.offsetLeft/2 - shade.offsetWidth/2 -box.offsetLeft;

            var t = y - shade.offsetHeight - middle.offsetHeight/2

            // 限制遮罩
            if(l<=0){
                l=0
            }
            if(t<=0){
                t = 0;
            }
            if(l>=middle.offsetWidth - shade.offsetWidth){
                l=middle.offsetWidth - shade.offsetWidth
            }
            if(t>=middle.offsetHeight - shade.offsetHeight){
                t=middle.offsetHeight - shade.offsetHeight
            }
            // 将计算好位置设置给遮罩
            shade.style.left = l + "px"
            shade.style.top = t + "px"

            // 计算比例：l/中盒子 = -大图的l/大图
            var xpercent = l/middle.offsetWidth
            var ypercent = t/middle.offsetHeight
            // console.log(xpercent,ypercent);
            // 将比例乘以大盒子的大小就是大图的l和t
            var bigl = xpercent * bigImg.offsetWidth
            var bigt = ypercent * bigImg.offsetHeight

            bigImg.style.left = -bigl + "px"
            bigImg.style.top = -bigt + "px"
        }
    }

    // middle移出
    middle.onmouseout = function(){
        shade.style.display = 'none';
        big.style.display = 'none';
        middle.onmousemove = null
    }
}