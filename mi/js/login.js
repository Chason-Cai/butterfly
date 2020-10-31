var remusername = getCookie("remusername");
if(remusername){
  $("[name='username']").val(remusername);
}

$("form").submit(function(){
  // 序列化表单数据
  var data = $("form").serialize();

  // return false;
  var UserReg = /^[a-zA-Z]\w{2,11}$/;
  var passReg = /^[a-zA-Z0-9]{6,16}$/;
  if(!UserReg.test($("[name='username']").val())){
    alert("请正确输入您的用户名");
    return false;
  }
  if(!passReg.test($("[name='password']").val())){
    alert("请正确输入您的密码");
    return false;
  }
  $.ajax({
    url:"../php/login.php",
    data,
    dataType:"json",
    type:"post",
    success:res=>{
      // console.log(res);
      var { status,msg } = res.meta;
      alert(msg);
      if(status == 1){
        // 存cookie
        setCookie("username",$("[name='username']").val())

        if($("[name='rem']").prop("checked")){
          setCookie("remusername",$("[name='username']").val())
        }
        location.href = "../html/home.html";
      }else{
        return false
      }
    }
  })

  return false;
})













