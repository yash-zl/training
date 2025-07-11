export class Cell{
    constructor(content=''){
        this.content = content;
    }

    edit(newContent){
        this.content = newContent;
    }

    getContent(){
        return this.content;
    }
}