$("input").focus(()=>{
  $("p").empty();
})
$("form p").css({
  "font": "400 12px/12px",
  "color":"red",
  "margin":0,
})
var userReg = /^[a-zA-Z]\w{2,11}$/; // 正则验证
var telReg = /^1[3-9]\d{9}$/;
// /^1[3456789]d{9}$/
var emailReg = /^([1-9]\d{4,10}@qq|[a-zA-Z]\w{5,17}@(163|126))\.com$/;
var passReg = /^[a-zA-Z0-9]{6,16}$/;
// 用户名验证
// 失去焦点验证
$("[name='username']").blur(()=>{
  // console.log($("[name='username']"));   // 选择元素,调用jQuery方法
  // console.log($(this));  // jQuery对象调用jQuery方法
  // console.log(this);  // window对象,调用DOM方法
  $(this).focus(()=>{
    console.log(123);
  })
  // 用户名为空验证
  var str = ""; 
  str = `用户名由3~16位数字、字母、下划线组成，且首位必须为字母`
  if(!$("[name='username']").val()){
    // layer弹窗
    layer.msg('用户名不能为空', {time: 1000,icon:2});
    // 定义提示标签
    $("[name='username']").siblings("p").text(str);
    return false;
  }

  // 用户名错误验证
  if(!userReg.test($("[name='username']").val())){
    layer.msg('请正确输入您的用户名', {time: 1000,icon:2});
    $("[name='username']").siblings("p").text(str);
    return false;
  }
})

// 手机号验证
// 失去焦点验证
$("[name='tel']").blur(()=>{
  // 手机号为空验证
  if(!$("[name='tel']").val()){
    // layer弹窗
    layer.msg('手机号不能为空', {time: 1000,icon:2});
    // 定义提示标签
    $("[name='tel']").siblings("p").text(str);
    return false;
  }

  // 手机号错误验证
  if(!telReg.test($("[name='tel']").val())){
    layer.msg('请正确输入您的手机号', {time: 1000,icon:2});
    $("[name='tel']").siblings("p").text(str);
    return false;
  }
})

// 邮箱验证
// 失去焦点验证
$("[name='email']").blur(()=>{
  // 邮箱为空验证
  if(!$("[name='email']").val()){
    // layer弹窗
    layer.msg('邮箱不能为空', {time: 1000,icon:2});
    // 定义提示标签
    $("[name='email']").siblings("p").text(str);
    return false;
  }

  // 邮箱错误验证
  if(!emailReg.test($("[name='email']").val())){
    layer.msg('请正确输入您的邮箱', {time: 1000,icon:2});
    $("[name='email']").siblings("p").text(str);
    return false;
  }
})

// 密码验证
// 失去焦点验证
$("[name='password']").blur(()=>{
  // 密码为空验证
  var str = ""; 
  str = `密码由6~16位数字、字母组成`
  if(!$("[name='password']").val()){
    // layer弹窗
    layer.msg('密码不能为空', {time: 1000,icon:2});
    // 定义提示标签
    $("[name='password']").siblings("p").text(str);
    return false;
  }

  // 密码错误验证
  if(!passReg.test($("[name='password']").val())){
    layer.msg('请正确输入您的密码', {time: 1000,icon:2});
    $("[name='password']").siblings("p").text(str);
    return false;
  }
})

$("[name='repass']").blur(()=>{
  if($("[name='repass']").val()){
    layer.msg('请正确输入您的密码', {time: 1000,icon:2});
  }
  if($("[name='password']").val()!=$("[name='repass']").val()){
    layer.msg("两次密码不一致", {time: 1000,icon:2});
    return false;
  }
})

$("form").submit(function(){
  // 序列化表单数据
  var data = $("form").serialize();
  if(!$("[name='username']").val() || !$("[name='tel']").val() || !$("[name='email']").val() || !$("[name='password']").val() || !$("[name='repass']").val()){
    layer.msg("请完善注册信息", {time: 1000,icon:2});
    return false;
  }
  // if(!userReg.test($("[name='username']").val())){
  //   layer.msg('请仔细核对用户名', {time: 1000,icon:2});
  //   $("[name='username']").siblings("p").text(str);
  //   return false;
  // }
  // if(!telReg.test($("[name='tel']").val())){
  //   layer.msg('请仔细核对手机号', {time: 1000,icon:2});
  //   $("[name='tel']").siblings("p").text(str);
  //   return false;
  // }
  // if(!emailReg.test($("[name='email']").val())){
  //   layer.msg('请仔细核对邮箱', {time: 1000,icon:2});
  //   $("[name='email']").siblings("p").text(str);
  //   return false;
  // }
  // if($(!passReg.test($("[name='password']").val()) || "[name='password']").val()!=$("[name='repass']").val()){
  //   layer.msg("请仔细核对密码", {time: 1000,icon:2});
  //   return false;
  // }
  // if(!$("[name='agree']").prop("checked")){
  //   layer.msg("请先同意协议",{time:1000,icon:2});
  //   return false;
  // }

  $.ajax({
    url:"../php/register.php",
    data,
    dataType:"json",
    type:"post",
    success:res=>{
      // console.log(res);
      var { status,msg } = res.meta;
      // console.log(status,msg);
      layer.msg(msg)
      if(status==2){
        location.href = '../html/login.html'
      }else{
        return false;
      }
    }
  })
  return false;
})

