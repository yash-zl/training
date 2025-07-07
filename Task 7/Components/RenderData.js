import { Row } from './Row.js';
import { Column } from './Column.js';
import { Utils } from './Utils.js';

export class RenderData {
    constructor() {
        this.drh = 30;
        this.dcw = 90;

        this.chh = 30;
        this.rhw = 60;

        this.stRow = 0;
        this.stOffRow = 0;

        this.stCol = 0;
        this.stOffCol = 0;

        this.top = 0;
        this.left = 0;

        this.editCellInfo = {
            row: -1, col: -1, val: '',
        }

        this.rowSelected = false;
        this.colSelected = false;

        this.selectedCellRange = [{ row: -1, col: -1 }, { row: -1, col: -1 }];


        this.scroll = false;

        this.prefixRows = [];
        this.rows = [];
        this.prefixCols = [];
        this.cols = [];
        let prs = 0;
        let pcs = 0;

        this.window = window;
        this.wiw = this.window.innerWidth;
        this.wih = this.window.innerHeight;

        for (let i = 0; i * this.drh < this.wih * 1.5; i++) {
            this.rows.push(new Row(i));
            this.prefixRows.push(prs);
            prs += this.drh;
        }

        for (let i = 0; i * this.dcw < this.wiw * 1.5; i++) {
            this.cols.push(new Column(i));
            this.prefixCols.push(pcs);
            pcs += this.dcw;
        }



        this.rowsTotalHeight = prs;
        this.colsTotalWidth = pcs;


        // this.outer_container.height = "100%";
        // this.outer_container.width = "100%";

        this.rows_fit_in_view = Math.ceil((this.wih - this.chh) / this.drh);
        this.cols_fit_in_view = Math.ceil((this.wiw - this.rhw) / this.dcw);

        // // // // // // console.log(this.cols);

        this.stRow = 0;
        // this.colHeaderInitStyle();
        this.visibleRows = [];
        this.visibleCols = [];

        console.log(this);

        this.calculateVisibleRows();
        this.calculateVisibleCols();

        let y = 0;
        let i = 0;

        this.topxSelection = 0;
        this.topySelection = 0;
        this.bottomxSelection = 0;
        this.bottomySelection = 0;

        this.DPR = this.window.devicePixelRatio || 1;

        // this.editCell = 
        this.editCell = { row: -1, col: -1 };

        this.utils = new Utils();
    }

    calculateVisibleData() {
        this.calculateVisibleRows();
        this.calculateVisibleCols();
    }

    calculateVisibleRows() {
        // Calculate the visible rows based on the current scroll position
        this.stRow = this.binarySearch(this.top, this.prefixRows, 0, this.prefixRows.length - 1);
        this.stOffRow = this.top - this.prefixRows[this.stRow];
        this.visibleRows = [];
        let y = this.stOffRow;
        let rowIdx = this.stRow;
        this.editCellRowThere = false;
        while (y < this.wih) {
            if (rowIdx >= this.rows.length) {
                this.rows.push(new Row(rowIdx));
                this.prefixRows.push(this.prefixRows[this.prefixRows.length - 1] + this.drh);
                if (this.colSelected) {
                    this.selectedCellRange[1].row = rowIdx;
                    // // // console.log("changing selected range", this.selectedCellRange);
                }

            }

            if (this.editCellInfo.row == rowIdx) {
                this.editCellRowThere = true;
            }

            this.visibleRows.push(this.rows[rowIdx]);
            y += this.rows[rowIdx].height;
            rowIdx++;
        }

        this.rowsTotalHeight = y;

    }

    calculateVisibleCols() {

        // Calculate the visible columns based on the current scroll position   
        this.stCol = this.binarySearch(this.left, this.prefixCols, 0, this.prefixCols.length - 1);
        this.stOffCol = this.left - this.prefixCols[this.stCol];
        this.visibleCols = [];
        let x = this.stOffCol;
        let colIdx = this.stCol;
        this.editCellColThere = false;
        while (x < this.wiw) {
            if (colIdx >= this.cols.length) {
                this.cols.push(new Column(colIdx));
                this.prefixCols.push(this.prefixCols[this.prefixCols.length - 1] + this.dcw);
                if (this.rowSelected) {
                    this.selectedCellRange[1].col = colIdx;
                    // // // console.log("changing selected range", this.selectedCellRange);
                }
            }

            if (colIdx == this.editCellInfo.col) this.editCellColThere = true;

            this.visibleCols.push(this.cols[colIdx]);
            x += this.cols[colIdx].width;
            colIdx++;
        }

        // // // console.log("All Columns:", this.cols);

        // if (colIdx >= this.cols.length) {
        //     this.cols.push(new Column(colIdx));
        //     this.prefixCols.push(this.prefixCols[this.prefixCols.length - 1] + this.dcw);
        // }

        // this.visibleCols.push(this.cols[colIdx]);
        // x += this.cols[colIdx].width;
        // colIdx++;

        this.colsTotalWidth = x;

        // // // // console.log(this.indexToColumnLabel(this.visibleCols[0].index), this.indexToColumnLabel(this.visibleCols[this.visibleCols.length - 1].index));
    }

    getAdjustedSelectedRange() {

        let adjustedCellSelection = [{ row: this.selectedCellRange[0].row, col: this.selectedCellRange[0].col }, { row: this.selectedCellRange[1].row, col: this.selectedCellRange[1].col }];

        console.log("Adjusting Cell Selection:", adjustedCellSelection[0].row, adjustedCellSelection[0].col, adjustedCellSelection[1].row, adjustedCellSelection[1].col);

        if (adjustedCellSelection[0].row >= adjustedCellSelection[1].row) {
            let temp = adjustedCellSelection[0].row;
            adjustedCellSelection[0].row = adjustedCellSelection[1].row;
            adjustedCellSelection[1].row = temp;
        }

        if (adjustedCellSelection[0].col >= adjustedCellSelection[1].col) {
            let temp = adjustedCellSelection[0].col;
            adjustedCellSelection[0].col = adjustedCellSelection[1].col;
            adjustedCellSelection[1].col = temp;
        }

        if (this.rowSelected) {
            // this.selectedCellRange[0].col = 0;
            adjustedCellSelection[1].col = this.cols.length - 1;
            // // console.log("Row selected, adjusting range:", this.selectedCellRange);
        }

        if (this.colSelected) {
            // this.selectedCellRange[0].row = 0;
            adjustedCellSelection[1].row = this.rows.length - 1;
            // // console.log("Col selected, adjusting range:", this.selectedCellRange);
        }

        console.log("Final Adjusted Cell Selection:", adjustedCellSelection[0].row, adjustedCellSelection[0].col, adjustedCellSelection[1].row, adjustedCellSelection[1].col);

        return adjustedCellSelection;
    }

    findCellAt(pointerX, pointerY) {
        // Adjust for header sizes
        const x = pointerX - this.rhw;
        const y = pointerY - this.chh;

        // Ignore clicks in header areas
        if (x < 0 || y < 0) return null;

        // Find column and row index using binary search
        const colIdx = this.utils.binarySearch(x + this.left, this.prefixCols, 0, this.prefixCols.length - 1);
        const rowIdx = this.utils.binarySearch(y + this.top, this.prefixRows, 0, this.prefixRows.length - 1);

        // // // // console.log("Cell found at:", rowIdx, colIdx);

        return { row: rowIdx, col: colIdx };
    }

    editCellInput() {
        document.getElementById('cellEdit') != null ? document.getElementById("cellEdit").remove() : () => { };


        let r = this.editCell.row;
        let c = this.editCell.col;
        console.log(r, c);
        console.log("checking", this.editCellColThere, this.editCellRowThere);

        // this.gtx.beginPath();
        // this.gtx.clearRect(this.prefixCols[c] + 2, this.prefixRows[r] + 2, this.cols[c].width - 4, (this.rows[r].height || this.drh) - 4);

        let input = document.createElement('input');
        // if(this.outer_container.childNodes.contains(input)) this.outer_container.removeChild(input);
        input.setAttribute("id", "cellEdit");
        input.style.position = "absolute";
        input.style.left = this.prefixCols[c] + 2 + this.rhw + "px";
        input.style.top = this.prefixRows[r] + 2 + this.chh + "px";
        input.style.height = this.rows[r].height - 4 + 'px';
        input.style.width = this.cols[c].width - 4 + 'px';
        input.style.zIndex = +100;
        input.style.border = "none";
        input.style.outline = "none";
        this.canvas_wrapper.appendChild(input);
        input.focus();

        if(!this.editCellColThere && !this.editCellRowThere) input.remove();
    }

    binarySearch(value, arr, low = 0, high = arr.length - 1) {
        console.log(value);

        let ogLow = low;
        // // // // // console.log("called for", value, arr, low, high, ogLow);
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (mid == 0 || (arr[mid] >= value && (mid == 0 || arr[mid - 1] < value) && (mid == arr.length - 1 || arr[mid + 1] > value))) {
                return mid == 0 ? mid : mid - 1;
            } else if (arr[mid] > value) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ogLow;
    }
}