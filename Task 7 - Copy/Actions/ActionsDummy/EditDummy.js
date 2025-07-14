export class EditDummy{
    constructor(idx, dataHandler, rowIdx, colIdx, initialValue){
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
        this.initialValue = initialValue;
        this.dataHandler = dataHandler;
        this.idx = idx;
    }

    setFinalValue(finalValue){
        this.finalValue = finalValue;
    }

    undo(){
        // ////console.log(this.dataController.getDataHandler());
        this.dataHandler.addAt(this.rowIdx, this.colIdx, this.initialValue);
    }

    redo(){
        this.dataHandler.addAt(this.rowIdx, this.colIdx, this.finalValue)
    }
}