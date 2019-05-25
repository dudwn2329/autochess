class Fund {
    constructor(number, title, tier, total, current = 0){
        this.number = number;
        this.title = title;
        this.tier = tier;
        this.total = total * 1;
        this.current = current * 1;
        this.canvas = null;
    }

    drawCircle(){
        if(this.canvas == null) return;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        
        let x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        let r = x - 50; //전체 너비보다 30픽셀 작게 설정
        let PI = Math.PI;
        let p = Math.floor(this.current / this.total * 100); 
        

        let ctx = this.canvas.getContext("2d");
        
        ctx.beginPath();
        ctx.arc(x, y, r, - PI / 2, - PI / 2 + 2 * PI);
        ctx.fillStyle = "#e2eced";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, r, - PI / 2, - PI / 2 + PI * p / 50);
        ctx.fillStyle = "#01b794";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, r - 20, - PI / 2, - PI / 2 + 2 * PI);
        ctx.fillStyle = "#fff";
        ctx.fill();

        ctx.font = "25px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";
        ctx.fillText(this.current + "/" + this.total, x, y);
    }

    getTemplate(){
        let div = document.createElement("div");
        div.classList.add("fund");
        div.innerHTML = `
            <div class="canvas-container">
                <canvas></canvas>
            </div>
            <div class="info">
                <h4>${this.title}</h4>
                <p class="name">${this.tier}</p>
                <p class="data-set">
                    <span class="current">${this.current.toLocaleString()}</span> /
                    <span class="total">${this.total.toLocaleString()}</span>
                </p>
                <div class="button-row">
                    <button class="btn btn-blue btn-sm">참가</button>
                </div>
            </div>`;
        this.canvas = div.querySelector("canvas");
        return div;
    }
}