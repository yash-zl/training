import { Row } from '../Base Components/Row.js';
import { Column } from '../Base Components/Column.js';
import { CellDataHandler } from './CellDataHandler.js';
import { EditDummy } from '../../Actions/ActionsDummy/EditDummy.js';
import { DataFunctions } from '../../Actions/ActionsControllers/DataFunctions.js';
import { DataFunctionsDummy } from '../../Actions/ActionsDummy/DataFunctionsDummy.js';
// import { DataPoints } from '../'

export class DataController {
    constructor(outerContainer, canvasWrapper, gridCanvas, rowCanvas, colCanvas, window, id, bottomBar) {
        console.log('dc', bottomBar);
        this.id = id;
        this._outerContainer = outerContainer;
        this._canvasWrapper = canvasWrapper;
        this._gridCanvas = gridCanvas;
        this._rowCanvas = rowCanvas;
        this._colCanvas = colCanvas;
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
            'row-select': `url('./Components/Cursors/row-select.png') 6 6, auto`,
            'row-add': 'pointer',
            'col-add': 'pointer'
        }

        this._rowResize = false;
        this._colResize = false;

        this._input = document.createElement('input');

        this._dataHandler = new CellDataHandler(this.id);

        this._actionType = null;
        this.editDummy = null;

        // this.editDummy = 
        this.undoStack = [];
        this.redoStack = [];

        this._input.addEventListener('input', (value) => {
            console.log('pre')
            this._dataHandler.addAt(this._editCell.row, this._editCell.col, value.target.value);
            this.editDummy.setFinalValue(value.target.value);
            let popped = null;
            if (this.getUndoStackLength() > 0) popped = this.undoStack.pop();
            ////////////console.log(popped);
            if (popped && this.editDummy.idx != popped.idx) {
                this.undoStackPush(popped);
                this.undoStackPush(this.editDummy);
            } else if (popped) {
                this.undoStackPush(popped);
            } else {
                this.undoStackPush(this.editDummy);
            }

            //console.log('post', this.getUndoStack());
        }
        );


        this.editDummy = null;
        this.editNum = 0;
        this.onRowIdx = -1;
        this.onColIdx = -1;
        this.autoScroll = false;
        this.autoScrollDirection = 'row';
        this.bottomBar = bottomBar;
        this.bottomBarData = null;

        this.copiedContentCellRange = [{ row: -1, col: -1 }, { row: -1, col: -1 }]

        this.firstClick = false;
        // this.MathFunctions = MathFunctions();
    }

    getBottomBar() {
        return this.bottomBar;
    }

    getBottomBarData() {
        return this.bottomBarData;
    }

    setBottomBarData() {
        let dataFunctionsObj = new DataFunctions(this.getAdjustedSelectedRange(), this.getDataHandler());
        this.bottomBarData = dataFunctionsObj.getCumulativeData();

        console.log(dataFunctionsObj, this.bottomBarData);
    }

    getId() {
        return this.id;
    }

    getAutoScroll() {
        return this.autoScroll;
    }
    setAutoScroll(val) {
        this.autoScroll = val;
    }

    getAutoScrollDirection() {
        return this.autoScrollDirection;
    }

    setAutoScrollDirection(val) {
        this.autoScrollDirection = val;
    }

    computeAndPushDataPoints(dataFunction) {
        if (this.getSelectedCellRange()[0].row != -1) {
            let dataFunctionsObj = new DataFunctions(this.getAdjustedSelectedRange(), this.getDataHandler());
            const formulatedData = dataFunctionsObj.getFormulatedData();
            let [firstRow, firstCol, lastCol] = this._dataHandler.pushWhereSpace(formulatedData, dataFunction);

            let dataFunctionsDummy = new DataFunctionsDummy(this.getDataHandler(), firstRow, firstCol, lastCol,);
            this.undoStackPush(dataFunctionsDummy);
        }

        ////////console.log(this.getDataHandler().getData());
    }

    storeCopy() {
        this.copiedContent = this.getAdjustedSelectedRange();
    }

    paste() {
        this.getDataHandler().processPasteCopiedData(this.copiedContent, this.getEditCell());
    }

    deleteSelectedData() {
        this.getDataHandler().processDeleteSelectedData(this.getAdjustedSelectedRange());
    }

    addColAt(idx) {
        let prevPrefixCols = [...this._prefixCols.slice(0, idx + 1)];
        let start = prevPrefixCols[idx];

        let prevColWidth = idx == 0 ? this.getDcw() : this._cols[idx - 1].width;

        for (let i = idx + 1; i < this._prefixCols.length; i++) {
            this._prefixCols[i] += prevColWidth;
        }

        this._prefixCols = [
            ...this._prefixCols.slice(0, idx + 1),
            start + prevColWidth,
            ...this._prefixCols.slice(idx + 1, this._prefixCols.length)
        ]

        for (let i = idx; i < this._cols.length; i++) {
            this._cols[i].index++;
        }

        ////////console.log(prevColWidth)

        this._cols = [
            ...this._cols.slice(0, idx),
            new Column(idx, prevColWidth),
            ...this._cols.slice(idx, this._cols.length)
        ]


        this._dataHandler.handleAddColAt(idx);
    }

    removeColAt(idx) {
        let prevPrefixCols = [...this._prefixCols.slice(0, idx)];
        let colWidth = this._cols[idx].width;

        for (let i = idx; i < this._prefixCols.length; i++) {
            this._prefixCols[i] -= colWidth;
        }

        this._prefixCols = [
            ...this._prefixCols.slice(0, idx),
            ...this._prefixCols.slice(idx + 1, this._prefixCols.length)
        ]

        for (let i = idx; i < this._cols.length; i++) {
            this._cols[i].index--;
        }

        this._cols = [
            ...this._cols.slice(0, idx),
            ...this._cols.slice(idx + 1, this._cols.length)
        ]

        this._dataHandler.handleRemoveColAt(idx);
    }

    addRowAt(idx) {
        let prevPrefixRows = [...this._prefixRows.slice(0, idx + 1)];
        let start = prevPrefixRows[idx];

        let prevRowHeight = idx == 0 ? this.getDrh() : this._rows[idx - 1].height;

        for (let i = idx + 1; i < this._prefixRows.length; i++) {
            this._prefixRows[i] += prevRowHeight;
        }

        this._prefixRows = [
            ...this._prefixRows.slice(0, idx + 1),
            start + prevRowHeight,
            ...this._prefixRows.slice(idx + 1, this._prefixRows.length)
        ]

        for (let i = idx; i < this._rows.length; i++) {
            this._rows[i].index++;
        }

        this._rows = [
            ...this._rows.slice(0, idx),
            new Row(idx, prevRowHeight),
            ...this._rows.slice(idx, this._rows.length)
        ]


        this._dataHandler.handleAddRowAt(idx);
    }

    removeRowAt(idx) {
        let prevPrefixRows = [...this._prefixRows.slice(0, idx)];
        let rowHeight = this._rows[idx].height;

        for (let i = idx; i < this._prefixRows.length; i++) {
            this._prefixRows[i] -= rowHeight;
        }

        this._prefixRows = [
            ...this._prefixRows.slice(0, idx),
            ...this._prefixRows.slice(idx + 1, this._prefixRows.length)
        ]

        for (let i = idx; i < this._rows.length; i++) {
            this._rows[i].index--;
        }

        this._rows = [
            ...this._rows.slice(0, idx),
            ...this._rows.slice(idx + 1, this._rows.length)
        ]


        this._dataHandler.handleRemoveRowAt(idx);
    }

    getOnRowIdx() {
        return this.onRowIdx;
    }

    setOnRowIdx(val) {
        this.onRowIdx = val;
    }

    getOnColIdx() {
        return this.onColIdx;
    }

    setOnColIdx(val) {
        this.onColIdx = val;
    }

    getUndoStackLength() {
        return this.undoStack.length;
    }

    getRedoStackLength() {
        return this.redoStack.length;
    }

    undoStackPush(action, way = "first-timer") {
        //console.log('pushing ', action, 'to ', this.undoStack);
        this.undoStack.push(action);
        if (way != 'post-redo') this.redoStack = [];
    }

    undoStackPop() {
        return this.undoStack.pop();

    }

    redoStackPush(action) {
        this.redoStack.push(action);
        ////////////console.log('pushing to redoStack ', this.redoStack);
    }

    redoStackPop() {
        return this.redoStack.pop();
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

    getColResize() { return this._colResize; }

    setColResize(val) {
        this._colResize = val;
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

    getCursorType() { return this._cursorType; }
    setCursorType(val) { this._cursorType = val; }

    setOnRow(rowIdx) {
        this.onRowIdx = rowIdx;
        this.onColIdx = -1;
    }

    setOnCol(colIdx) {
        this.onColIdx = colIdx;
        this.onRowIdx = -1;
    }


    getCol(x) {
        let visCols = this.getVisibleCols();
        let prefixCols = this._prefixCols;
        return this.binarySearch(x, prefixCols, visCols[0].index, visCols[visCols.length - 1].index, 'col');
    }

    binarySearch(value, arr, low = 0, high = arr.length - 1, type = 'col') {
        if (type == 'row') value = value - this._chh + this._top;
        else value = value - this._rhw + this._left;
        let ogLow = low;
        ////console.log(this, this._left);
        ////////console.log("called for", value, arr, low, high, ogLow);
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            // //////////////console.log(mid, low, high, arr[mid], arr[mid+1]);
            if (arr[mid] <= value && arr[mid + 1] >= value) {
                // //////////////console.log('returning mid ' + mid);
                return mid;
            } else if (arr[mid] > value) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        // //////////////console.log('returning ' + ogLow);

        return ogLow;
    }

    getUndoStack() {
        return this.undoStack;
    }

    setEditCell(val) {
        // this.firstClick = !this.firstClick;
        this._input.style.zIndex = '-100';
        this._editCell = val;
        // else return null;
        this._input.value = this._dataHandler.getAt(val.row, val.col);
        // let prevDummy = this.editDummy;
        // this.editDummy ? this.undoStackPush(this.editDummy) : () => { };

        this.editDummy = new EditDummy(this.editNum++, this._dataHandler, this._editCell.row, this._editCell.col, this._input.value);
        // return prevDummy;

    }

    getEndOfRow(rowIdx) {
        ////////console.log(rowIdx);
        return this._prefixRows[rowIdx];
    }

    getEndOfCol(colIdx) {
        return this._prefixCols[colIdx];
    }

    getRow(y) {
        // let visRows = this._visibleRows;
        let prefixRows = this._prefixRows;
        return this.binarySearch(y, prefixRows, 0, prefixRows.length - 1, 'row');
    }

    getRowHeight(rowIdx) {
        //////////////console.log(this._rows[rowIdx - 1].height);
        return this._rows[rowIdx - 1].height;
    }

    getDataHandler() {
        return this._dataHandler;
    }

    getNewRowHeight(rowIdx, y) {

        let newEnd = this._top + y - this._chh;
        let start = this._prefixRows[rowIdx - 1];

        //////////////console.log(newEnd- start);
        // //////////////////console.log(this._top + y - this._chh - this._prefixRows[rowIdx + 1]);
        return newEnd - start;
    }

    adjustRowHeights(newEnd, rowIdx) {
        //////////////////console.log(rowIdx);
        let newHeight = newEnd - this._prefixRows[rowIdx - 1];
        let diff = newHeight - this._rows[rowIdx - 1].height;
        this._rows[rowIdx - 1].height = newHeight;
        // this._rows[rowIdx - 1].height += diff;
        //////////////////console.log(this._rows[rowIdx - 1], this._prefixRows[rowIdx]);
        for (let i = rowIdx; i < this._prefixRows.length; i++) {
            this._prefixRows[i] += diff;
        }

        // this.printRows(0, this._prefixRows.length - 1);
    }

    getEndOfRow(rowIdx) {
        return this._prefixRows[rowIdx];
    }

    printRows(start, finish) {
        for (let i = start; i <= finish; i++) {
            //////////////console.log(this._prefixRows[i], this._rows[i]);
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
            // // // //////////////////////////////console.log(val, arr[mid]);
            if (arr[mid] + 4 >= val && arr[mid] - 4 <= val) return mid;
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
        //////////////////////console.log(val, arr);

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            //////////////////////console.log(mid);
            // // // //////////////////////////////console.log(val, arr[mid]);
            if (arr[mid] + 4 >= val && arr[mid] - 4 <= val) return mid;
            else if (arr[mid] > val) high = mid - 1;
            else low = mid + 1;
        }

        return -1;
    }

    setRow(rowIdx) { }

    setCol(colIdx) { }

    setRowResize(rowIdx, diff) { }

    setColResize(rowIdx, diff) { }



    adjustColWidths(newEnd, colIdx) {
        let diff = newEnd - this._prefixCols[colIdx];

        ////////////console.log('data', diff, colIdx, newEnd);

        this._cols[colIdx - 1].width += diff;
        ////////////console.log(this._prefixCols);
        for (let i = colIdx; i < this._prefixCols.length; i++) {
            this._prefixCols[i] += diff;
        }

        ////////////console.log('done', this._cols[colIdx - 1], this._prefixCols);
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
        this._stRow = this.binarySearch(0, this._prefixRows, 0, this._prefixRows.length - 1, 'row');
        this._stOffRow = this._top - this._prefixRows[this._stRow];
        this._visibleRows = [];
        let y = this._stOffRow;
        // //////////////////////////////console.log("Strow:", this.stRow);
        let rowIdx = this._stRow;
        const dub = rowIdx;

        let colSelected = this.getColSelected();
        // // //////////////////////////////console.log("row: ", dub);

        //////////////////console.log(y, this._top);

        while (y <= this._wih * 2) {
            if (rowIdx >= this._rows.length) {
                for (let i = rowIdx; i < rowIdx + 50; i++) {
                    this._rows.push(new Row(i));
                    this._prefixRows.push(this._prefixRows[this._prefixRows.length - 1] + this._drh);
                    if (colSelected) {
                        this._selectedCellRange[1].row = i;
                        // // // // // //////////////////////////////console.log("changing selected range",this._selectedCellRange);
                    }
                }
            }

            this._visibleRows.push(this._rows[rowIdx]);
            y += this._rows[rowIdx].height;
            rowIdx++;
        }
        // // //////////////////////////////console.log("vis", this.visibleRows);
        this._rowsTotalHeight = y;

        // ////////console.log()

    }

    setFirstClick(val){
        this.firstClick = val;
    }

    getFirstClick(){
        return this.firstClick;
    }

    calculateVisibleCols() {
        this._stCol = this.binarySearch(0, this._prefixCols, 0, this._prefixCols.length - 1);
        ////////console.log('stc',this._stCol);
        this._stOffCol = this._left - this._prefixCols[this._stCol];
        this._visibleCols = [];
        let x = this._stOffCol;
        let colIdx = this._stCol;
        this._editCellColThere = false;
        let rowSelected = this.getRowSelected();
        while (x <= this._wiw * 2) {
            if (colIdx >= this._cols.length) {
                for (let i = colIdx; i < colIdx + 50; i++) {
                    this._cols.push(new Column(i));
                    this._prefixCols.push(this._prefixCols[this._prefixCols.length - 1] + this._dcw);
                    if (rowSelected) {
                        //////////////////////////console.log("changing", colIdx);
                        this._selectedCellRange[1].col = i;
                        // // // // // //////////////////////////////console.log("changing selected range",this._selectedCellRange);
                    }
                }

            }

            this._visibleCols.push(this._cols[colIdx]);
            x += this._cols[colIdx].width;
            colIdx++;
        }

        this._colsTotalWidth = x;
        // // // // // // //////////////////////////////console.log(this.indexToColumnLabel(this.visibleCols[0].index), this.indexToColumnLabel(this.visibleCols[this.visibleCols.length - 1].index));
    }

    getAdjustedSelectedRange() {
        ////////////////////////console.log(this._selectedCellRange);

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
            adjustedCellSelection[1].col = this._cols.length - 1;
            // // // // //////////////////////////////console.log("Row selected, adjusting range:",this._selectedCellRange);
        }

        if (this._colSelected) {
            //this._selectedCellRange[0].row = 0;
            adjustedCellSelection[1].row = this._rows.length - 1;
            // // // // //////////////////////////////console.log("Col selected, adjusting range:",this._selectedCellRange);
        }
        ////////////////////////console.log(adjustedCellSelection);
        // // //////////////////////////////console.log("Final Adjusted Cell Selection:", adjustedCellSelection[0].row, adjustedCellSelection[0].col, adjustedCellSelection[1].row, adjustedCellSelection[1].col);

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

        ////////////////////////////console.log("Cell found at:", rowIdx, colIdx);

        return { row: rowIdx, col: colIdx };
    }

    getDataPoints() {
        return new DataFunctions(this.getAdjustedSelectedRange).getFormulatedData();
    }
}
