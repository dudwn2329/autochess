class Board{
    constructor(id, title, content, writer){
        this.id = id;
        this.title = title;
        this.content = content;
        this.writer = writer;
    }

    getTemplate(){
        let div = document.createElement("div");
        div.classList.add("board");
        div.innerHTML = `<span>${this.id}</span>
                    <span>${this.title}</span>
                    <span>${this.content}</span>
                    <span>${this.writer}</span>`;
                    
        return div;
    }
}

