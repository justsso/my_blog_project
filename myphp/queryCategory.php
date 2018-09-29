<?php
require 'connectionDB.php';

$sql = "select category,count(*) from artical group by category";

$result = mysqli_query($conn, $sql);

$arr = array();
while ($row  = mysqli_fetch_object($result)) {
    array_push($arr, $row);
}
echo json_encode($arr,JSON_UNESCAPED_UNICODE);//数组
$conn->close();