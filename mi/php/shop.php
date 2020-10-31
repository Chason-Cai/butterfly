<?php 
header("content-type:text/html;charset=urf8");
$ids = $_GET["ids"];
$con = mysqli_connect("localhost","root","root","test");
mysqli_query($con,"set names utf8");
$res = mysqli_query($con,"select * from mi where id in ($ids)");

$arr=[];
while($row = mysqli_fetch_assoc($res)){
  $arr[] = $row;
}
echo json_encode($arr);





