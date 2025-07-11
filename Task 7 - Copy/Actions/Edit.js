export class Edit {
    constructor(dataController) {
        this.dataController = dataController;
        this.input = this.dataController.getInput();
        this.cell = this.dataController.getEditCell();
        this.input.value = this.dataController.getDataHandler().getAt(this.cell.row, this.cell.col);
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