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


// 发送ajax获取数据
$.ajax({
  url:"../php/list.php",
  type:"get",
  dataType:"json",
  success:res=>{
    var pageSize = 5;       
    new Page("page",{
      language:{ // 因为用户可以不传，所以需要定义默认值
        first:"首页",
        prev:"上一页",
        next:"下一页",
        last:"尾页"
      },
      pageInfo:{ // 因为用户可以不传，所以需要定义默认值
        total:res.length,
        pageSize:pageSize
      },
      showData:function(currentPage){
        var arr = res.slice((currentPage-1)*pageSize,currentPage*pageSize);
        str = '';
        // console.log(arr);
        for(var i=0;i<arr.length;i++){
          str += `<li>
            <a href="../html/details.html?id=${arr[i].id}">
              <img src="${arr[i].imgpath}" alt="">
              <div class="name">${arr[i].name}</div>
                <div class="price">
                  <span>${arr[i].price}</span>元
                </div>
            </a>
          </li>`
        }
        $("main .main-heart .content ul").empty().html(str);
      }
    })
    
    
  }
})





