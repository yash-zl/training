export class Edit {
    constructor(dataHandler, cellInfo) {
        this.dataHandler = dataHandler;
        this.cellInfo = cellInfo;        
    }

    pointerDown(e) {
        
    }

    pointerMove(e) { }

    pointerUp(e) { }

    onInput(val) {
        let cell = this.dataController.getInputCell();
        let row = cell.row;
        let col = cell.col;

        this.dataController.getDataHandler().setAt(row, col, val);
    }

    // hitTest(e) { }

    setCursor(e) { }
}