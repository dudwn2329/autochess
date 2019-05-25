<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>오토체스</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script>
    <?php
        if(isset($_SESSION['user'])){
            $u = $_SESSION['user'];
            echo "let user = {name: '" . $u->name. "', id: '". $u->id . "'};";
        }else{
            echo "let user = null";
        }
    ?>
    </script>
</head>
<body>
<header>
        <div class="container">
            <div class="logo">
                <img src="images/autochesslogo.jpg" alt="logo" width="200" height="80">
            </div>
            <nav>
                <ul>
                    <li><a href="#" data-target="list" class="active">방 목록</a></li>
                    <li><a href="#" data-target="register">방 만들기</a></li>
                    <li><a href="#" data-target="board">게시판</a></li>
                </ul>
                <?php if( isset($_SESSION['user'])) :  ?>
                    <div class="nav-btn">
                    <span><?= $_SESSION['user']->name ?></span>
                    <span><?= $_SESSION['user']->money ?></span>
                    <a href="/logout.php" class="btn btn-red">로그아웃</a>
                </div>
                <?php  else : ?>
                <div class="nav-btn">
                    <a href="/login.php" class="btn btn-blue">로그인</a>
                    <a href="/register.php" class="btn btn-red">회원가입</a>
                    
                </div>
                <?php endif ?>
            </nav>
        </div>
    </header>
</body>
</html>