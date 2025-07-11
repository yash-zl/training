import { Row } from '../Row.js';
import { Column } from '../Column.js';
import { Data } from '../Data.js'

export class DataController {
    constructor(outerContainer, canvasWrapper, gridCanvas, rowCanvas, colCanvas, window, cursor) {
        this._outerContainer = outerContainer;
        this._canvasWrapper = canvasWrapper;
        this._gridCanvas = gridCanvas;
        this._rowCanvas = rowCanvas;
        this._colCanvas = colCanvas;
        this._cursor = cursor;
        this._gtx = gridCanvas.getContext('2d');
        this._rtx = rowHeaderCanvas.getContext('2d');
        this._ctx = colHeaderCanvas.getContext('2d');

        this._drh = 30;
        this._dcw = 90;
        this._chh = 30;
        this._rhw = 60;

        this._stRow = 0;
        this._stOffRow = 0;
        this._stCol = 0;
        this._stOffCol = 0;
        this._top = 0;
        this._left = 0;
        this._rowSelected = false;
        this._colSelected = false;
        this._selectedCellRange = [{ row: -1, col: -1 }, { row: -1, col: -1 }];
        this._scroll = false;

        this._prefixRows = [];
        this._rows = [];
        this._prefixCols = [];
        this._cols = [];

        let prs = 0;
        let pcs = 0;

        this._window = window;
        this._wiw = window.innerWidth;
        this._wih = window.innerHeight;

        for (let i = 0; i * this._drh < this._wih * 2; i++) {
            this._rows.push(new Row(i));
            this._prefixRows.push(prs);
            prs += this._drh;
        }

        for (let i = 0; i * this._dcw < this._wiw * 2; i++) {
            this._cols.push(new Column(i));
            this._prefixCols.push(pcs);
            pcs += this._dcw;
        }

        this._rowsTotalHeight = prs;
        this._colsTotalWidth = pcs;
        this._rowsFitInView = Math.ceil((this._wih - this._chh) / this._drh);
        this._colsFitInView = Math.ceil((this._wiw - this._rhw) / this._dcw);

        this._visibleRows = [];
        this._visibleCols = [];

        this._topxSelection = 0;
        this._topySelection = 0;
        this._bottomxSelection = 0;
        this._bottomySelection = 0;

        this._DPR = this._window.devicePixelRatio || 1;
        this._editCell = { row: -1, col: -1 };
        this._cursorType = 'default';

        this.cursors = {
            'cell': 'cell',
            'default': 'default',
            'col-resize': 'col-resize',
            'row-resize': 'row-resize',
            'col-select': `url('./Components/Cursors/col-select.png') 6 6, auto`,
            'row-select': `url('./Components/Cursors/row-select.png') 6 6, auto`
        }

        this._rowResize = false;
        this._colResize = false;

        this._input = document.createElement('input');

        this._dataHandler = new Data();

        this._actionType = null;


        this._input.addEventListener('input',(value)=>{
            this._dataHandler.addAt(this._editCell.row, this._editCell.col, value.target.value);
        })
        //-------------------------------

    }

    handleScroll() {
        this._top = this._outerContainer.scrollTop();
        this._left = this._outerContainer.scrollLeft();
    }

    setActionType(val) {
        this._actionType = val;
    }

    setInputValue(val) {
        this._input.value = val;
    }

    getInput() {
        return this._input;
    }

    getRowResize() {
        return this._rowResize;
    }

    setRowResize(val) {
        this._rowResize = val;
    }

    getDataHandler() { return this._dataHandler; }

    getOuterContainer() { return this._outerContainer; }
    setOuterContainer(val) { this._outerContainer = val; }

    getCanvasWrapper() { return this._canvasWrapper; }
    setCanvasWrapper(val) { this._canvasWrapper = val; }

    getGridCanvas() { return this._gridCanvas; }
    setGridCanvas(val) { this._gridCanvas = val; }

    getRowCanvas() { return this._rowCanvas; }
    setRowCanvas(val) { this._rowCanvas = val; }

    getColCanvas() { return this._colCanvas; }
    setColCanvas(val) { this._colCanvas = val; }

    getGtx() { return this._gtx; }
    setGtx(val) { this._gtx = val; }

    getRtx() { return this._rtx; }
    setRtx(val) { this._rtx = val; }

    getCtx() { return this._ctx; }
    setCtx(val) { this._ctx = val; }

    getDrh() { return this._drh; }
    setDrh(val) { this._drh = val; }

    getDcw() { return this._dcw; }
    setDcw(val) { this._dcw = val; }

    getChh() { return this._chh; }
    setChh(val) { this._chh = val; }

    getRhw() { return this._rhw; }
    setRhw(val) { this._rhw = val; }

    getStRow() { return this._stRow; }
    setStRow(val) { this._stRow = val; }

    getStOffRow() { return this._stOffRow; }
    setStOffRow(val) { this._stOffRow = val; }

    getStCol() { return this._stCol; }
    setStCol(val) { this._stCol = val; }

    getStOffCol() { return this._stOffCol; }
    setStOffCol(val) { this._stOffCol = val; }

    getTop() { return this._top; }
    setTop(val) { this._top = val; }

    getLeft() { return this._left; }
    setLeft(val) { this._left = val; }

    getEditCellInfo() { return this._editCellInfo; }
    setEditCellInfo(val) { this._editCellInfo = val; }

    getRowSelected() { return this._rowSelected; }
    setRowSelected(val) { this._rowSelected = val; }

    getColSelected() { return this._colSelected; }
    setColSelected(val) { this._colSelected = val; }

    getSelectedCellRange() { return this._selectedCellRange; }
    setSelectedCellRange(val) { this._selectedCellRange = val; }

    getScroll() { return this._scroll; }
    setScroll(val) { this._scroll = val; }

    getPrefixRows() { return this._prefixRows; }
    setPrefixRows(val) { this._prefixRows = val; }

    getRows() { return this._rows; }
    setRows(val) { this._rows = val; }

    getPrefixCols() { return this._prefixCols; }
    setPrefixCols(val) { this._prefixCols = val; }

    getCols() { return this._cols; }
    setCols(val) { this._cols = val; }

    getRowsTotalHeight() { return this._rowsTotalHeight; }
    setRowsTotalHeight(val) { this._rowsTotalHeight = val; }

    getColsTotalWidth() { return this._colsTotalWidth; }
    setColsTotalWidth(val) { this._colsTotalWidth = val; }

    getRowsFitInView() { return this._rowsFitInView; }
    setRowsFitInView(val) { this._rowsFitInView = val; }

    getColsFitInView() { return this._colsFitInView; }
    setColsFitInView(val) { this._colsFitInView = val; }

    getVisibleRows() { return this._visibleRows; }
    setVisibleRows(val) { this._visibleRows = val; }

    getVisibleCols() { return this._visibleCols; }
    setVisibleCols(val) { this._visibleCols = val; }

    getTopxSelection() { return this._topxSelection; }
    setTopxSelection(val) { this._topxSelection = val; }

    getTopySelection() { return this._topySelection; }
    setTopySelection(val) { this._topySelection = val; }

    getBottomxSelection() { return this._bottomxSelection; }
    setBottomxSelection(val) { this._bottomxSelection = val; }

    getBottomySelection() { return this._bottomySelection; }
    setBottomySelection(val) { this._bottomySelection = val; }

    getDPR() { return this._DPR; }
    setDPR(val) { this._DPR = val; }

    getWindow() { return this._window; }
    setWindow(val) { this._window = val; this._DPR = window.devicePixelRatio || 1 }

    getWiw() { return this._wiw; }
    setWiw(val) { this._wiw = val; }

    getWih() { return this._wih; }
    setWih(val) { this._wih = val; }

    getEditCell() { return this._editCell; }
    setEditCell(val) { this._editCell = val; }

    getCursorType() { return this._cursorType; }
    setCursorType(val) { this._cursorType = val; }



    getCol(x) {
        let visCols = this.getVisibleCols();
        let prefixCols = this._prefixCols;
        return this.binarySearch(x, prefixCols, visCols[0].index, visCols[visCols.length - 1].index, 'col');
    }

    binarySearch(value, arr, low = 0, high = arr.length - 1, type = 'col') {
        if (type == 'row') value = value - this._chh + this._top;
        else value -= this._rhw + this._left;
        let ogLow = low;

        // // // // // // // ////////////////console.log("called for", value, arr, low, high, ogLow);
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            // console.log(mid, low, high, arr[mid], arr[mid+1]);
            if (arr[mid] <= value && arr[mid + 1] >= value) {
                // console.log('returning mid ' + mid);
                return mid;
            } else if (arr[mid] > value) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
                // console.log('returning ' + ogLow);

        return ogLow;
    }

    setEditCell(val) {
        this._editCell = val;
        this._input.value = this._dataHandler.getAt(val.row, val.col);
        

    }

    getColWidth(colIdx) { }

    getRow(y) {
        // let visRows = this._visibleRows;
        let prefixRows = this._prefixRows;
        return this.binarySearch(y, prefixRows, 0, prefixRows.length - 1, 'row');
    }

    getRowHeight(rowIdx){
        console.log(this._rows[rowIdx - 1].height);
        return this._rows[rowIdx - 1].height;
    }

    getNewRowHeight(rowIdx, y) {

        let newEnd = this._top + y - this._chh;
        let start = this._prefixRows[rowIdx-1];

        console.log(newEnd- start);
        // ////console.log(this._top + y - this._chh - this._prefixRows[rowIdx + 1]);
        return newEnd - start;
    }

    adjustRowHeights(newHeight, newEnd, rowIdx) {
        ////console.log(rowIdx);
        let diff = newHeight - this._rows[rowIdx- 1].height;
        this._rows[rowIdx - 1].height = newHeight;
        // this._rows[rowIdx - 1].height += diff;
        ////console.log(this._rows[rowIdx - 1], this._prefixRows[rowIdx]);
        for (let i = rowIdx; i < this._prefixRows.length; i++) {
            this._prefixRows[i] += diff;
        }

        this.printRows(0, this._prefixRows.length - 1);
    }

    printRows(start, finish){
        for(let i = start; i<=finish; i++){
            console.log(this._prefixRows[i], this._rows[i]);
        }
    }

    getColWidthDiff(colIdx, x) {
        return this._left + x - this._rhw - this._prefixCols[colIdx + 1];
    }

    exactBinarySearchY(y) {
        let arr = this._prefixRows;
        let val = y + this._top - this._chh;
        let low = 0;
        let high = arr.length - 1;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            // // // ////////////////console.log(val, arr[mid]);
            if (arr[mid] + 2 >= val && arr[mid] - 2 <= val) return mid;
            else if (arr[mid] > val) high = mid - 1;
            else low = mid + 1;
        }

        return -1;
    }

    exactBinarySearchX(x) {
        let arr = this._prefixCols;
        let low = 0;
        let high = arr.length - 1;
        let val = x + this._left - this._rhw;
        ////////console.log(val, arr);

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            ////////console.log(mid);
            // // // ////////////////console.log(val, arr[mid]);
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



    adjustColWidths(colIdx, diff) {
        this._cols[colIdx + 1].height += diff;
        for (let i = colIdx; i < this._prefixCols.length; i++) {
            this._prefixCols[i] += diff;
        }
    }

    setCursor(cursorType) {

        this._cursorType = cursorType;
        this._outerContainer.style.cursor = this.cursors[cursorType];

    }

    getActionType() {
        return this._actionType;
    }

    resetSelection() {
        this._editCell = { row: -1, col: -1 };
        this._selectedCellRange = [{ row: -1, col: -1 }, { row: -1, col: -1 }];
    }

    calculateVisibleRows() {
        // Calculate the visible rows based on the current scroll position
        this._stRow = this.binarySearch(this._top, this._prefixRows, 0, this._prefixRows.length - 1);
        this._stOffRow = this._top - this._prefixRows[this._stRow];
        this._visibleRows = [];
        let y = this._stOffRow;
        // ////////////////console.log("Strow:", this.stRow);
        let rowIdx = this._stRow;
        const dub = rowIdx;
        // // ////////////////console.log("row: ", dub);

        ////console.log(y, this._top);

        while (y <= this._wih * 2) {
            if (rowIdx >= this._rows.length) {
                for (let i = rowIdx; i < rowIdx + 50; i++) {
                    this._rows.push(new Row(i));
                    this._prefixRows.push(this._prefixRows[this._prefixRows.length - 1] + this._drh);
                    if (this._colSelected) {
                        this._selectedCellRange[1].row = i;
                        // // // // // ////////////////console.log("changing selected range",this._selectedCellRange);
                    }
                }
            }

            // // ////////////////console.log(this.rows, this.prefixRows)

            if (this._editCell.row == rowIdx) {
                this._editCellRowThere = true;
            }

            this._visibleRows.push(this._rows[rowIdx]);
            y += this._rows[rowIdx].height;
            rowIdx++;
        }
        // // ////////////////console.log("vis", this.visibleRows);
        this._rowsTotalHeight = y;

    }

    calculateVisibleCols() {

        // Calculate the visible columns based on the current scroll position   
        this._stCol = this.binarySearch(this._left, this._prefixCols, 0, this._prefixCols.length - 1);
        this._stOffCol = this._left - this._prefixCols[this._stCol];
        this._visibleCols = [];
        let x = this._stOffCol;
        let colIdx = this._stCol;
        this._editCellColThere = false;
        while (x <= this._wiw) {
            if (colIdx >= this._cols.length) {
                this._cols.push(new Column(colIdx));
                this._prefixCols.push(this._prefixCols[this._prefixCols.length - 1] + this._dcw);
                if (this._rowSelected) {
                    ////////////console.log("changing", colIdx);
                    this._selectedCellRange[1].col = colIdx;
                    // // // // // ////////////////console.log("changing selected range",this._selectedCellRange);
                }
            }

            if (colIdx == this._editCell.col) this._editCellColThere = true;

            this._visibleCols.push(this._cols[colIdx]);
            x += this._cols[colIdx].width;
            colIdx++;
        }

        this._colsTotalWidth = x;

        // // // // // // ////////////////console.log(this.indexToColumnLabel(this.visibleCols[0].index), this.indexToColumnLabel(this.visibleCols[this.visibleCols.length - 1].index));
    }

    getAdjustedSelectedRange() {
        //////////console.log(this._selectedCellRange);

        let adjustedCellSelection = [{ row: this._selectedCellRange[0].row, col: this._selectedCellRange[0].col }, { row: this._selectedCellRange[1].row, col: this._selectedCellRange[1].col }];

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

        if (this._rowSelected) {
            //this._selectedCellRange[0].col = 0;
            adjustedCellSelection[1].col = this.cols.length - 1;
            // // // // ////////////////console.log("Row selected, adjusting range:",this._selectedCellRange);
        }

        if (this._colSelected) {
            //this._selectedCellRange[0].row = 0;
            adjustedCellSelection[1].row = this.rows.length - 1;
            // // // // ////////////////console.log("Col selected, adjusting range:",this._selectedCellRange);
        }
        //////////console.log(adjustedCellSelection);
        // // ////////////////console.log("Final Adjusted Cell Selection:", adjustedCellSelection[0].row, adjustedCellSelection[0].col, adjustedCellSelection[1].row, adjustedCellSelection[1].col);

        return adjustedCellSelection;
    }

    findCellAt(pointerX, pointerY) {
        // Adjust for header sizes
        const x = pointerX;
        const y = pointerY;

        // Ignore clicks in header areas
        if (x < 0 || y < 0) return null;

        // Find column and row index using binary search
        const colIdx = this.getCol(x);
        const rowIdx = this.getRow(y);

        //////////////console.log("Cell found at:", rowIdx, colIdx);

        return { row: rowIdx, col: colIdx };
    }
}
