export class ColResize {
    constructor(dataController) {
        this.dataController = dataController;
        this.col = -1;
    }

    pointerDown(e) {
        this.dataController.setActionType('col-resize');

        this.col = this.dataController.getCol(e.clientX);
    }

    pointerMove(e) {
        this.colWidthDiff = this.dataController.getColWidthDiff(this.col, e.pageX);
        this.dataController.adjustColWidths(this.col, this.colHeightDiff);
    }

    pointerUp(e) {
        this.dataController.adjustColWidths(this.col, this.colHeightDiff);
        return this;
    }

    hitTest(e) {
        if (e.pageX >= this.dataController.getRhw() && e.pageX <= this.dataController.getWiw() && e.pageY >= 0 && e.pageY <= this.dataController.getChh()) {
            this.col = this.dataController.exactBinarySearchX(e.pageX);
            if (this.col != -1) {
                // this.dataController.setCursor('col-resize');
                return true;
            }
            else return false;
        }
        return false;
    }

    setCursor(){
        this.dataController.setCursor('col-resize');
    }

    undo(e) { }
}

export class RowResize {
    constructor(dataController) {
        this.dataController = dataController;
        this.row = -1;
    }

    pointerDown(e) {
        this.dataController.setActionType('row-resize');
        this.row = this.dataController.exactBinarySearchY(e.clientY);
        console.log(this.row);
    }

    pointerMove(e) {

        // //console.log("resizing " + this.row, e.pageY + " whose prev end was at " + this.dataController.getPrefixRows());
        let newEnd = e.pageY - this.dataController.getChh() + this.dataController.getTop();

        let start = this.dataController._prefixRows[this.row - 1];

        let newHeight = newEnd - start;

        this.dataController.adjustRowHeights(newHeight, newEnd, this.row);
        // this.dataController.printRows(this.row - 2, this.row + 2);
    }

    pointerUp(e) {
        //put in stack
        this.row = -1;

        return;
    }

    hitTest(e) {
        if (e.pageX >= 0 && e.pageX <= this.dataController.getRhw() && e.pageY >= this.dataController.getChh() && e.pageY <= this.dataController.getWih()) {
            this.row = this.dataController.exactBinarySearchY(e.pageY);
            if (this.row != -1){
                return true;
            }
            else return false;
        }
        return false;
    }

    setCursor(){
        this.dataController.setCursor('row-resize');
    }

    undo() {

    }
}