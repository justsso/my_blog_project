<?php
header("Content-type: text/html; charset=utf-8");

$code = $_POST["s"];
$user = $_POST["user"] ;
$views = $_POST["views"];
$likes = $_POST["likes"];
$img = $_POST["img"];
$title = $_POST["title"];
$content =  $_POST["content"]; //简介
$category =  $_POST["category"];
$link = $_POST["link"];
//存入数据库
require 'connectionDB.php';
$conn->query("set names 'utf8'");
//先查找是不是已经存在该篇文章
$SQL = "select * from artical where title ='$title'";
$result = mysqli_query($conn, $SQL);
if( mysqli_num_rows($result)>0){
    echo "已经存在了\n";
    mysqli_query($conn, "delete from artical where title ='$title'");
}
$SQL = "INSERT INTO artical (title,user,views, likes, link, time, content,category,img) values ('$title','$user','$views','$likes','$link',now(),'$content','$category','$img')";
if ($conn->query($SQL) === TRUE) {
    echo "文章存入数据库成功\n";
} else {
    echo "Error: " . $SQL . "<br>" . $conn->error;
}
$conn->close(); 

//新创建文件,存入本地
//把title的编码从utf-8改为gbk的
// $title = iconv("utf-8", "gbk", $title);
$filename = "../../articals/".$title.".txt";
echo $filename;
//w 会重写文件
$mode = "w";
$myfile = fopen($filename, $mode);// or die("Unable to open file!");
if( ! fwrite($myfile,$code)){
    echo ("写入文件失败");
    fclose($myfile);
    exit();
}
echo ("写入文件".iconv("gbk","utf-8",$title)."成功");
fclose($myfile);


