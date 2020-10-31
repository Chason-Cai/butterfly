<?php
header("content-type:text/html;charset=utf8");
$username = $_POST["username"];
$password = $_POST["password"];


$con = mysqli_connect("localhost","root","root","test");
mysqli_query($con,"set names utf8");
$sql = "select * from user where username='".$_POST['username']."'";
$res = mysqli_query($con,$sql);
$row = mysqli_fetch_Assoc($res);
if($row){

  if($password == $row["password"]){
    $arr = [
      "meta"=>[
        "status"=>1,
        "msg"=>"登陆成功"
      ]
    ];
  }else{
    $arr = [
      "meta"=>[
        "status"=>2,
        "msg"=>"密码错误"
      ]
    ];
  }

}else{
    $arr = [
      "meta"=>[
        "status"=>3,
        "msg"=>"用户名不存在"
      ]
    ];
  
}

echo json_encode($arr);
