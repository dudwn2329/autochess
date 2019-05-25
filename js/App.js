class App {
    
    constructor(){
        //펀드 리스트
        this.fundList = [];
        this.boardList = [];
        this.fundCnt = 1; //현재 펀드번호
        this.nav = document.querySelectorAll("nav > ul a");
        this.nav.forEach(x => {
            x.addEventListener("click", this.changeMenu.bind(this));
        });     
        
        //투자자 리스트
        this.invList = [];

        this.articleList = document.querySelectorAll("article");

        this.loadingMethod = {
            "list": this.loadingList.bind(this),
            "register": this.loadingRegister.bind(this),
            "board": this.loadingBoardList.bind(this)
        }

        //투자자들을 담는 공간
        //펀드들을 담는 공간
        this.fundContainer = document.querySelector(".fund-list");
        this.boardContainer = document.querySelector(".board-list");
        

        document.querySelector("#register button")
                .addEventListener("click", this.registerFund.bind(this));
        document.querySelector("#board button").addEventListener("click", this.openPopup.bind(this));
        this.popup = document.querySelector(".popup");
        document.querySelector("#btnClose")
            .addEventListener("click", this.closePopup.bind(this));
        
        this.beforePoint = {x:0, y:0};
        this.startDraw = false;
        
        this.toastContainer = document.querySelector("#toastList")
        this.loadingFundList();
        this.getBoardList();
    }

    loadingFundList() {
        let req = new XMLHttpRequest();
        req.open("GET", "/fundlist.php");
        this.fundList = [];
        req.onreadystatechange = () => {
            if(req.readyState === XMLHttpRequest.DONE){
                if(req.status === 200 ){
                    console.log(req.responseText);
                    let json = JSON.parse(req.responseText);
                    console.log(json.data);
                    json.data.forEach(x => {
                        let fund = new Fund(x.id, x.title, x.tier, 8, x.current * 1);
                        this.fundList.push(fund);
                    });
                }else {
                    this.showMsg("전송중 오류 발생");
                }
                this.nav[0].click();
            }
        }
        req.send();
    }
    getBoardList() {
        let req = new XMLHttpRequest();
        req.open("GET", "/getBoardList.php");
        this.boardList = [];
        req.onreadystatechange = () => {
            if(req.readyState === XMLHttpRequest.DONE){
                if(req.status === 200 ){
                    let json = JSON.parse(req.responseText);
                    console.log(json.data);
                    json.data.forEach(x => {
                        let board = new Board(x.id, x.title, x.content, x.writer);
                        this.boardList.push(board);
                    });
                }else {
                    this.showMsg("전송중 오류 발생");
                }
                
            }
        }
        
        req.send();
    }
   
    // investFund(){
    //     let fundNo = document.querySelector("#investNo").value;
    //     let money = document.querySelector("#money").value * 1;
        
    //     if(money <= 0){
    //         this.showMsg("금액을 올바르게 입력하세요");
    //         return;
    //     }

    //     let signData = this.signCanvas.toDataURL();

    //     let req = new XMLHttpRequest();
    //     req.open("POST", "/add_fund.php");

    //     req.onreadystatechange = () => {
    //         if(req.readyState === XMLHttpRequest.DONE){
    //             if(req.status === 200 ){
    //                 let json = JSON.parse(req.responseText);
                    
    //                 this.showMsg(json.msg);
    //                 if(json.success){
    //                     this.popup.querySelector("#btnClose").click();
    //                     this.loadingFundList(); //펀드리스트 갱신
    //                     this.loadingInvestorList(); //투자자 리스트 갱신
    //                 }

    //             }else {
    //                 this.showMsg("전송 오류 발생");
    //             }
    //         }
    //     };

    //     let formData = new FormData();
    //     formData.append("id", fundNo);
    //     formData.append("money", money);
    //     formData.append("sign", signData);

    //     req.send(formData);
    // }
    insertBoard(){
        let boardTitle = document.querySelector("#boardTitle").value;
        let boardContent = document.querySelector("#boardContent").value;
        let boardWriter = document.querySelector("#boardWriter").value;

        if(boardContent == "" || boardTitle == "" || boardWriter ==""){
            this.showMsg("값이 누락되어 있습니다.");
            return;
        }

        let req = new XMLHttpRequest();
        req.open("POST", "/add_board.php");

        req.onreadystatechange = () => {
            if(req.readyState === XMLHttpRequest.DONE){
                if(req.status === 200 ){
                    console.log(req.responseText);
                    let json = JSON.parse(req.responseText);
                    
                    
                    if(json.success){
                        $(".popup #btnClose").click();
                    }

                }else {
                    this.showMsg("전송 오류 발생");
                }
            }
        };

        let formData = new FormData();
        formData.append("title", boardTitle);
        formData.append("content", boardContent);
        formData.append("writer", boardWriter);

        req.send(formData);
    }
    

    openPopup(){
        if(user == null){
            this.showMsg("로그인 후 투자하실 수 있습니다.");
            return;
        }
        
        this.popup.querySelector("#boardWriter").value = user.name;
        this.popup.querySelector("#btnBoard").addEventListener("click", this.insertBoard.bind());
        this.popup.classList.add("active");
    }

    closePopup(){
        this.popup.classList.remove("active");
    }

    changeMenu(e){
        e.preventDefault();
        let target = e.target.dataset.target;

        this.articleList.forEach(x => x.classList.remove("active"));
        document.querySelector("#" + target).classList.add("active");
        
        this.nav.forEach(x => x.classList.remove("active"));
        e.target.classList.add("active");
        
        this.loadingMethod[target]();

        //크기조절 코드
        let inner = document.querySelector(".inner-content");
        let h = document.querySelector("#" + target).clientHeight;
        inner.style.height = h + 'px';
    }

    //펀드 등록페이지
    loadingRegister(){
     

        //document.querySelector("#fundNo").value = no;
        
    }

    //펀드 등록하는 로직
    registerFund(){
        let title = document.querySelector("#title").value;
        let tier = $("#tier option:selected").val();
        console.log(tier);
        let total = 8;
        if(title == "" || tier == ""){
            console.log("a");
            this.showMsg("값이 누락되어 있습니다.");
            return;
        }

        let req = new XMLHttpRequest();
        req.open("POST", "/invest_ok.php");

        req.onreadystatechange = () =>{
            if(req.readyState === XMLHttpRequest.DONE) {
                if(req.status === 200){
                    console.log(req.responseText);
                    let json = JSON.parse(req.responseText);
                    this.showMsg(json.msg);
                    if(json.success ){
                        let recvData = json.data;
                        //let fund = new Fund(recvData.id, name, endDate, total);
                        let chessroom = new Fund(recvData.id, title, tier, total);
                        this.fundList.push(chessroom);
                        this.fundCnt++;
                        this.nav[0].click();              
                    }
                }else {
                    console.log('문제 발생');
                }
            }
            
        }

        let formData = new FormData();
        formData.append("title", title);
        formData.append("tier", tier);
        

        req.send(formData);
    }

    //펀드 리스트 페이지
    loadingList(){
        this.fundContainer.innerHTML = "";
        this.fundList.forEach(x => {
            let div = x.getTemplate();
            this.fundContainer.appendChild(div);
            div.querySelector("button")
                .addEventListener("click", ()=>{
                    this.openPopup(x);
                });
            x.drawCircle();
        });
    }
    loadingBoardList(){
        this.boardContainer.innerHTML = "";
        this.boardList.forEach(x => {
            this.boardContainer.appendChild(x.getTemplate());
        });
    }
    //투자자 보는 페이지
    loadingInvestor(){
        this.invContainer.innerHTML = "";
        this.invList.forEach(x => {
            this.invContainer.appendChild(x.getTemplate());
        });
    }

    showMsg(msg){
        let div = document.createElement("div");
        div.classList.add("toast");
        div.innerHTML = `<p class="msg">${msg}</p>
            <span class="close">&times;</span>`;
        let closed = false;

        let closeTimer = setTimeout( ()=>{
            if(closed) return;
            closed = true;
            div.style.opacity = 0;
            setTimeout(()=>{
                this.toastContainer.removeChild(div);
            }, 600);
        }, 2500);

        div.querySelector(".close").addEventListener("click", ()=>{
            if(closed) return;
            closed = true;
            div.style.opacity = 0;
            setTimeout(()=>{
                this.toastContainer.removeChild(div);
            }, 600);
        });

        this.toastContainer.appendChild(div);
    }
}



window.onload = function(){
    const app = new App();
}