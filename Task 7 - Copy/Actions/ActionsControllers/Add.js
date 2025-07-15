import { AddRowDummy, AddColDummy } from "../ActionsDummy/AddDummy.js";

export class AddRow {
    constructor(dataController) {
        this.dataController = dataController;
    }

    pointerDown(e) {
        this.rowIdx = this.dataController.exactBinarySearchY(e.clientY);

        this.dataController.addRowAt(this.rowIdx);

        this.dummy = new AddRowDummy(this.dataController, this.rowIdx);
    }

    hitTest(e) {
        // let rowIdx = this.dataController.getOnRowIdx();
        let rowIdx = this.dataController.exactBinarySearchY(e.clientY);

        // ////console.log(rowIdx);

        if (rowIdx != -1 && e.clientX >= 6 && e.clientX <= 14) return true;
        // this.dataController.


    }

    pointerUp() {
        return this.dummy;
    }

    setCursor() {
        this.dataController.setCursor('row-add');
    }
}

export class AddCol {
    constructor(dataController, colIdx) {
        this.dataController = dataController;
        this.colIdx = colIdx;
    }

    pointerDown(e) {
        this.colIdx = this.dataController.exactBinarySearchX(e.clientX);
        // ////console.log(this.dataController.getPrefixCols(), this.dataController.getCols());
        this.dataController.addColAt(this.colIdx);
        // ////console.log(this.dataController.getPrefixCols(), this.dataController.getCols());

        this.dummy = new AddColDummy(this.dataController, this.colIdx);
    }

    hitTest(e) {
        // let colIdx = this.dataController.getOnColIdx();
        let colIdx = this.dataController.exactBinarySearchX(e.clientX);

        // ////console.log(colIdx);

        if (colIdx != -1 && e.clientY >= 6 && e.clientY <= 14) return true;
        // this.dataController.


    }

    pointerUp() {
        return this.dummy;
    }

    setCursor() {
        this.dataController.setCursor('col-add');
    }
}