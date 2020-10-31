// 移入导航栏

$("nav .nav-heart ul li").mousemove(()=>{
  $("nav .menu").css("display" , "block");
})

$("nav .nav-heart ul li").mouseleave(()=>{
  $("nav .menu").css("display" , "none");
})