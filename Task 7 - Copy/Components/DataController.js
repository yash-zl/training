// import { Data } from '../Components/RenderData.js'

export class DataController {
    constructor(renderData) {
        this.renderData = renderData;
    }

    getRow(y) {
        let visRows = this.renderData.visibleRows;

        return this.binarySearch(y, this.renderData.prefixRows, visRows[0].index, visRows[visRows.length - 1].index, 'row');
    }

    getCol(x) {
        let visCols = this.visibleCols();
        return this.binarySearch(x, this.renderData.prefixCols, visCols[0].index, visCols[visCols.length - 1].index, 'col');
    }

    binarySearch(value, arr, low = 0, high = arr.length - 1, type = 'col') {
        if (type == 'row') value -= this.chh + this.top;
        else value -= this.rhw + this.left;
        let ogLow = low;
        // // // // // // // //////console.log("called for", value, arr, low, high, ogLow);
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[mid] < value && arr[mid + 1] >= value) {
                return mid;
            } else if (arr[mid] > value) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ogLow;
    }

    exactBinarySearch(val, arr) {

    }

    getRowInfo(rowIdx) { }

    getColInfo(colIdx) { }

    getRowHeight(rowIdx) {

    }

    getColWidth(colIdx) { }

    getRowHeightDiff(rowIdx, y) {
        return this.renderData.top + y - this.renderData.chh - this.renderData.prefixRows[rowIdx + 1];
    }

    getColWidthDiff(colIdx, x) {
        return this.renderData.left + x - this.renderData.rhw - this.renderData.prefixCols[colIdx + 1];
    }

    exactBinarySearchY(y) {
        let arr = this.renderData.prefixRows;

        let low = 0;
        let high = arr.length - 1;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            // // // //////console.log(val, arr[mid]);
            if (arr[mid] + 2 >= val && arr[mid] - 2 <= val) return mid;
            else if (arr[mid] > val) high = mid - 1;
            else low = mid + 1;
        }

        return -1;
    }

    exactBinarySearchX(x) {
        let arr = this.renderData.prefixCols;
        let low = 0;
        let high = arr.length - 1;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            // // // //////console.log(val, arr[mid]);
            if (arr[mid] + 2 >= val && arr[mid] - 2 <= val) return mid;
            else if (arr[mid] > val) high = mid - 1;
            else low = mid + 1;
        }

        return -1;
    }

    setRow(rowIdx) { }

    setCol(colIdx) { }

    setRowResize(rowIdx, diff) { }

    setColResize(rowIdx, diff) { }

    adjustRowHeights(rowIdx, diff) {
        this.renderData.rows[rowIdx].height += diff;
        for (let i = rowIdx; i < this.renderData.prefixRows.length; i++) {
            this.renderData.prefixRows[i] += diff;
        }
    }

    adjustColWidths(colIdx, diff) {
        this.renderData.cols[colIdx].height += diff;
        for (let i = colIdx; i < this.renderData.prefixCols.length; i++) {
            this.renderData.prefixCols[i] += diff;
        }
    }

    setCursor(cursorType) {
        this.renderData.cursorType = cursorType;
    }

    calculateVisibleRows() {
        // Calculate the visible rows based on the current scroll position
        this.renderData.stRow = this.binarySearch(this.renderData.top, this.renderData.prefixRows, 0, this.renderData.prefixRows.length - 1);
        this.renderData.stOffRow = this.renderData.top - this.renderData.prefixRows[this.renderData.stRow];
        this.renderData.visibleRows = [];
        let y = this.renderData.stOffRow;
        // //////console.log("Strow:", this.stRow);
        let rowIdx = this.renderData.stRow;
        const dub = rowIdx;
        // // //////console.log("row: ", dub);

        while (y <= this.renderData.wih * 2) {
            if (rowIdx >= this.renderData.rows.length) {
                for (let i = rowIdx; i < rowIdx + 50; i++) {
                    this.renderData.rows.push(new Row(i));
                    this.renderData.prefixRows.push(this.renderData.prefixRows[this.renderData.prefixRows.length - 1] + this.renderData.drh);
                    if (this.renderData.colSelected) {
                        this.renderData.selectedCellRange[1].row = i;
                        // // // // // //////console.log("changing selected range", this.selectedCellRange);
                    }
                }
            }

            // // //////console.log(this.rows, this.prefixRows)

            if (this.renderData.editCell.row == rowIdx) {
                this.renderData.editCellRowThere = true;
            }

            this.renderData.visibleRows.push(this.renderData.rows[rowIdx]);
            y += this.renderData.rows[rowIdx].height;
            rowIdx++;
        }
        // // //////console.log("vis", this.visibleRows);
        this.renderData.rowsTotalHeight = y;

    }

    calculateVisibleCols() {

        // Calculate the visible columns based on the current scroll position   
        this.renderData.stCol = this.binarySearch(this.renderData.left, this.renderData.prefixCols, 0, this.renderData.prefixCols.length - 1);
        this.renderData.stOffCol = this.renderData.left - this.renderData.prefixCols[this.renderData.stCol];
        this.renderData.visibleCols = [];
        let x = this.renderData.stOffCol;
        let colIdx = this.renderData.stCol;
        this.renderData.editCellColThere = false;
        while (x <= this.renderData.wiw) {
            if (colIdx >= this.renderData.cols.length) {
                this.renderData.cols.push(new Column(colIdx));
                this.renderData.prefixCols.push(this.renderData.prefixCols[this.renderData.prefixCols.length - 1] + this.renderData.dcw);
                if (this.renderData.rowSelected) {
                    //console.log("changing", colIdx);
                    this.renderData.selectedCellRange[1].col = colIdx;
                    // // // // // //////console.log("changing selected range", this.selectedCellRange);
                }
            }

            if (colIdx == this.renderData.editCell.col) this.renderData.editCellColThere = true;

            this.renderData.visibleCols.push(this.renderData.cols[colIdx]);
            x += this.renderData.cols[colIdx].width;
            colIdx++;
        }

        this.renderData.colsTotalWidth = x;

        // // // // // // //////console.log(this.indexToColumnLabel(this.visibleCols[0].index), this.indexToColumnLabel(this.visibleCols[this.visibleCols.length - 1].index));
    }

    getVisibleRows(){
        return this.renderData.visibleRows;
    }

    getVisibleCols(){
        return this.renderData.visibleCols;
    }
}

