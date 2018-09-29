<?php
header("Content-type: text/html; charset=utf-8");
$title = $_POST["title"];
require 'connectionDB.php';

$sql = "update artical set likes = likes+1 where title='$title'";
mysqli_query($conn, $sql);
echo "喜欢+1";
$conn->close(); 
