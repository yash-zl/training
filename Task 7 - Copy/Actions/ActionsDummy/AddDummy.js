export class AddRowDummy {
    constructor(dataController, rowIdx){
        this.dataController = dataController;
        this.rowIdx = rowIdx;
    }

    undo(){
        this.dataController.removeRowAt(this.rowIdx);
    }

    redo(){
        this.dataController.addRowAt(this.rowIdx);
    }
}

export class AddColDummy {
    constructor(dataController, colIdx){
        this.dataController = dataController;
        this.colIdx = colIdx;
    }

    undo(){
        ////console.log('dynn')
        this.dataController.removeColAt(this.colIdx);
    }

    redo(){
        this.dataController.addColAt(this.colIdx);
    }
}

