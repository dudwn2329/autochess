<?php
$id = $_POST['id'];
$name = $_POST['name'];
$pw = $_POST['password'];


require ("db.php");

$sql = "insert into users (id, name, password) values (?, ?, PASSWORD(?))";
$cnt = query($con, $sql, [$id, $name, $pw]);

if($cnt == 0){
    echo "회원가입 실패";
}else{
    msgAndGO("회원가입이 성공했습니다.","/index.php");
}
