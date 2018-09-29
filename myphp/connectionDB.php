<?php

//服务器原来的
// $servername = "localhost";
// $username = "root";
//$password = "woaiwo1314ya..";
// $dbname = "myBlog";


//本地远程测试
$servername = "103.218.2.184";
$username = "my";
$password = "woaiwo1314ya..";
$dbname = "myBlog";
$conn = new mysqli($servername, $username, $password,$dbname);
if ($conn->connect_error) {
    die("Connection failed:" . $conn->connect_error);
}
//防止从数据库中查询的数据中文乱码
$conn->query("set names utf8");



