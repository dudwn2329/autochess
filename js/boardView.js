class BoardView{
    constructor(id, title, content, writer){
        this.id = id;
        this.title = title;
        this.content = content;
        this.writer = writer;
    }

    getTemplate(){
        let div = document.createElement("div");
        div.classList.add("board");
        div.innerHTML = `<h2 id="bv-title">${title}</h2>
                        <h3 id="bv-writer">${writer}</h3>
                        <div id="bv-content">
                            ${content}
                        </div>`;
        return div;
    }
}

