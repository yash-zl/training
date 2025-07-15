export class DataFunctionsDummy {
    constructor(dataHandler, pushAtRow, firstCol, lastCol, data) {
        this.pushAtRow = pushAtRow;
        this.firstCol = firstCol;
        this.lastCol = lastCol;
        this.dataHandler = dataHandler;
    }

    undo() {
        this.savedData = this.dataHandler.removeRowData(this.pushAtRow, this.firstCol, this.lastCol);
    }

    redo() {
        this.dataHandler.addRowData(this.pushAtRow, this.firstCol, this.lastCol, this.savedData);
    }
}