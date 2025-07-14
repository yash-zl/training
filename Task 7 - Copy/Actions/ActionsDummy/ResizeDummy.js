

export class RowResizeDummy{
    constructor(dataController, rowIdx, initialEnd){
        this.rowIdx = rowIdx;
        this.initialEnd = initialEnd;
        this.dataController = dataController;
    }

    setFinalEnd(val){
        this.finalEnd = val;
    }

    undo(){
        this.dataController.adjustRowHeights(this.initialEnd, this.rowIdx);
    }

    redo(){
        this.dataController.adjustRowHeights(this.finalEnd, this.rowIdx);
    }
}

export class ColResizeDummy{
    constructor(dataController, colIdx, initialEnd){
        this.colIdx = colIdx;
        this.initialEnd = initialEnd;
        this.dataController = dataController;
    }

    setFinalEnd(val){
        this.finalEnd = val;
    }

    undo(){
        this.dataController.adjustColWidths(this.initialEnd, this.colIdx);
    }

    redo(){
        this.dataController.adjustColWidths(this.finalEnd, this.colIdx);
    }
}