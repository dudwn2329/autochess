<?php
    require("db.php");
?>
<!DOCTYPE html>
<html lang="ko">

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
    <script src="/js/Board.js"></script>
    <script src="/js/Fund.js"></script>
    <script src="/js/App.js"></script>
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
    <section id="content">
        <div class="inner-content">
            <article id="list" class="active">
                <h2>방 목록</h2>
                <div class="fund-list">

                </div>
            </article>

            <article id="register">
                <h2>게시판</h2>
                <div class="form-container">
                    <form>
                        <div class="form-group">
                            <label for="fundName">방제목</label>
                            <input type="text" id="title">
                        </div>
                        <div class="form-group">
                            <label for="endDate">티어</label>
                            <select name=tier size=1 id="tier"> 
                                <option value="queen">퀸</option> 
                                <option value="king">킹</option> 
                                <option value="rook">룩</option> 
                                <option value="bishop">비숍</option> 
                                <option value="knight"  selected>나이트</option> 
                                <option value="pawn">폰</option> 
                            </select>
                        </div>
                    

                        <div class="button-row">
                            <button type="button" class="btn btn-blue btn-lg">
                                등록
                            </button>
                        </div>
                    </form>
                </div>
            </article>

            <article id="board">
                <h2>오토체스 게시판</h2>
                <div class="board-list">
                    
                </div>
                <div class="button-row">
                        <button type="button" class="btn btn-blue" id="btnWrite">
                            글쓰기
                        </button>
                    </div>
            </article>

        </div>
    </section>
    <div id="toastList">
        
    </div>
    <div class="boardView">
         <div class="inner">
             <div class="bv-container">
                <h2 id="bv-title">제목</h2>
                <h3 id="bv-writer">김영주</h3>
                <div id="bv-content">
                    sdaaa ad sal; sa  ldads jdjka s a djaks as asd asd isajd alsd kasjmd.
                </div>
             </div>
            <div class="buttons">
                <button type="button" class="btn btn-red" id="btnDelete">
                    삭제
                </button>
                <button type="button" class="btn btn-red" id="btnClose">
                    닫기
                </button>
            </div>
            
        </div>
    </div>
    <div class="popup">
        <div class="inner">
            <h2>글쓰기</h2>
            <form>
            <div class="form-group">
                    <label for="boardTitle">글제목</label>
                    <input type="text" id="boardTitle">
                </div>
                <div class="form-group">
                    <label for="boardContent">내용</label>
                    <textarea id="boardContent"></textarea>
                </div>
                <div class="form-group">
                    <label for="boardWriter">작성자</label>
                    <input type="text" id="boardWriter"  readonly disabled>
                <div class="button-row">
                    <button type="button" class="btn btn-blue" id="btnBoard">
                        작성완료
                    </button>
                    <button type="button" class="btn btn-red" id="btnClose">
                        닫기
                    </button>
                </div>
            </form>
        </div>

    


    
</body>

</html>