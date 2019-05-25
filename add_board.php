<?php

require("db.php");

if(!isset($_SESSION['user'])) {
    sendJsonResponse("로그인을 먼저 해주세요.", false);
    exit;
}

$user = $_SESSION['user'];

$title    = isset( $_POST['title'] ) ? $_POST['title'] : "";
$content  = isset( $_POST['content'] ) ? $_POST['content'] : "";
$writer   = isset( $_POST['writer'] ) ? $_POST['writer'] : "";

if($title == "" || $content == "" || $writer == ""){
    sendJsonResponse("필수값이 누락되어 있습니다.", false);
    exit;
}

$sql = "INSERT INTO board(`title`,`content`,`writer`) VALUES(?,?,?)";

$cnt = query($con, $sql, [$title, $content, $writer]);

if($cnt == 1){
    $id = $con -> lastInsertId();
    sendJsonResponse('성공적으로 등록되었습니다.', true, ['id' => $id, 'title' => $title, 'content' =>$content, 'writer' => $writer]);
}else {
    sendJsonResponse('DB 등록중 오류 발생', false);
}
