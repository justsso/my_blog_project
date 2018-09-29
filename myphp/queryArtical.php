<?php
header("Content-type: text/html; charset=utf-8");
// 右侧搜索板块
// 根据 搜索关键字searchTitle 查找相关文章
// 模糊匹配查找
if(!empty($_POST["searchTxt"])){
    $searchTitle = $_POST["searchTxt"];
//     $searchTitle = iconv("gbk", "utf-8", $searchTitle);
//     echo $searchTitle;
    require 'connectionDB.php';
    $sql = "select * from artical where title like '%".$searchTitle."%' order by time desc";
    $result = $conn->query($sql);
    $arr = array();
    while ($row  = mysqli_fetch_object($result)) {
        array_push($arr, $row);
    }
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $conn->close();
}else if(!empty($_POST["category"])){
    //根据类别查找文章,按日期排列 由最近日期到最远日期
    $category = $_POST["category"];
    require 'connectionDB.php';
    $sql = "select * from artical where category='$category' order by time desc";
    $result = $conn->query($sql);
    $arr = array();
    while ($row  = mysqli_fetch_object($result)) {
        array_push($arr, $row);
    }
//解决中文unicode转码的问题
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $conn->close();
}else{
    //查找全部的文章,按日期排列 由最近日期到最远日期
    require 'connectionDB.php';
    $sql = "select * from artical order by time desc";
    $result = $conn->query($sql);
    $arr = array();
    while ($row  = mysqli_fetch_object($result)) {
        array_push($arr, $row);
    }
    //解决中文unicode转码的问题
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $conn->close();
}






