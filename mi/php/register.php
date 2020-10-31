<?php
header("content-type:text/html;charset=utf8");
$username = $_POST["username"];
$tel = $_POST["tel"];
$email = $_POST["email"];
$password = $_POST["password"];


$con = mysqli_connect("localhost","root","root","test");
mysqli_query($con,"set names utf8");
$sql = "select * from user where username='".$_POST['username']."'";
$res = mysqli_query($con,$sql);
$row = mysqli_fetch_Assoc($res);
if($row){
  $arr = [
    "meta"=>[
      "status"=>1,
      "msg"=>"用户名被占用"
    ]
    ];
}else{
  $sql = "insert user(username,tel,email,password) values('$username',$tel,'$email','$password')";
  $res = mysqli_query($con,$sql);
  if($res){
    $arr = [
      "meta"=>[
        "status"=>2,
        "msg"=>"注册成功"
      ]
    ];
  }else{
    $arr = [
      "meta"=>[
        "status"=>3,
        "msg"=>"注册失败"
      ]
    ];
  }
}

echo json_encode($arr);
