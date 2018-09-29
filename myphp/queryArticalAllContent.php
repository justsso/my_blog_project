<?php

$title = $_POST["title"];
require 'connectionDB.php';
//给这篇文章的"看过"+1
$sql = "update artical set views=views+1 where title='$title'";
mysqli_query($conn, $sql);
//根据title 查找本地文件 返回给前台
$sql = "select * from artical where title ='$title'";
$arr = array();
$result = $conn->query($sql);
if( mysqli_num_rows($result)){
    while ($row  = mysqli_fetch_object($result)) {
        array_push($arr, $row);
    }
    //获取指定目录下的文件名为$title文件
    $title = iconv("utf-8", "gbk", $title);
    $file_path = "../../articals/$title.txt";
//     $file_path = iconv("utf-8", "gbk", $file_path);
    $str = file_get_contents($file_path);
    //把文章内容发送回前台
    echo $str;
}else{
    echo "<p>抱歉,该文章不存在</p>";
    $conn->close();
}


















