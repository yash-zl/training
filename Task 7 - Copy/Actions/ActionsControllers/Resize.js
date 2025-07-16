import { RowResizeDummy, ColResizeDummy } from '../ActionsDummy/ResizeDummy.js';

export class ColResize {
    constructor(dataController) {
        this.dataController = dataController;
        this.col = -1;
    }

    pointerDown(e) {
        this.dataController.setActionType('col-resize');

        this.col = this.dataController.exactBinarySearchX(e.clientX);

        ////////////console.log(this.col);
        let initialEnd = this.dataController.getEndOfCol(this.col);
        this.dummy = new ColResizeDummy(this.dataController, this.col, initialEnd);
    }

    pointerMove(e) {
        let newEnd = e.pageX + this.dataController.getLeft() - this.dataController.getRhw();
        ////////////console.log(newEnd);
        this.dataController.adjustColWidths(newEnd, this.col);
    }

    pointerUp(e) {
        let finalEnd = this.dataController.getEndOfCol(this.col);
        this.dummy.setFinalEnd(finalEnd);
        // this.dataController.adjustColWidths(this.col, this.colHeightDiff);
        this.col = -1;

        //////////console.log(this.dataController.getSelectedCellRange());
        return this.dummy;
    }

    hitTest(e) {
        if (e.pageX >= this.dataController.getRhw() && e.pageX <= this.dataController.getWiw() && e.pageY >= 13 && e.pageY <= this.dataController.getChh()) {
            this.col = this.dataController.exactBinarySearchX(e.pageX);
            if (this.col > 0) {
                // this.dataController.setCursor('col-resize');
                return true;
            }
            else return false;
        }
        return false;
    }

    setCursor() {
        this.dataController.setCursor('col-resize');
    }

    undo(e) { }

    changeDataController(dataController) {
        this.dataController = dataController;
    }
}

export class RowResize {
    constructor(dataController) {
        this.dataController = dataController;
        this.row = -1;
    }

    pointerDown(e) {
        this.dataController.setActionType('row-resize');
        this.row = this.dataController.exactBinarySearchY(e.clientY);
        // ////////////console.log(this.row);
        this.initialEnd = this.dataController.getEndOfRow(this.row);
        this.dummy = new RowResizeDummy(this.dataController, this.row, this.initialEnd)
    }

    pointerMove(e) {

        // //////////////console.log("resizing " + this.row, e.pageY + " whose prev end was at " + this.dataController.getPrefixRows());
        let newEnd = e.pageY - this.dataController.getChh() + this.dataController.getTop();

        this.dataController.adjustRowHeights(newEnd, this.row);
        // this.dataController.printRows(this.row - 2, this.row + 2);
    }

    pointerUp(e) {
        //put in stack
        this.finalEnd = this.dataController.getEndOfRow(this.row);
        this.dummy.setFinalEnd(this.finalEnd);

        this.row = -1;
        // ////////////console.log(this.dummy);
        return this.dummy;
    }

    hitTest(e) {
        if (e.pageX >= 13 && e.pageX <= this.dataController.getRhw() && e.pageY >= this.dataController.getChh() && e.pageY <= this.dataController.getWih()) {
            this.row = this.dataController.exactBinarySearchY(e.pageY);
            if (this.row != -1) {
                return true;
            }
            else return false;
        }
        return false;
    }

    setCursor() {
        this.dataController.setCursor('row-resize');
    }

    changeDataController(dataController) {
        this.dataController = dataController;
    }
}