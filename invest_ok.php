<?php
require ("db.php");

if(!isset($_SESSION['user'])){
    sendJsonResponse('로그인한 사용자만 투자 가능합니다.', false);
    exit;
}

//여기까지온건 로그인한 유저
$title = isset($_POST['title']) ? $_POST['title'] : "";
$tier = isset($_POST['tier']) ? $_POST['tier'] : "";

if($title == "" || $tier == ""){
    sendJsonResponse('필요한 값이 누락되었습니다.', false);
    exit;
}


$sql = "INSERT INTO 
        chessroom(`title`, `tier`, `current`)
        VALUES (?, ?, 1)";

$cnt = query($con, $sql, [$title, $tier]);

if($cnt == 1){
    $id = $con -> lastInsertId();
    sendJsonResponse('성공적으로 등록되었습니다.', true, ['id' => $id, 'title' => $title, 'tier' =>$tier]);
}else {
    sendJsonResponse('DB 등록중 오류 발생', false);
}