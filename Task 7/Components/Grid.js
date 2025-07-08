import { Row } from './Row.js';
import { Column } from './Column.js'
import { Draw } from './Draw.js';


export class Grid {
    /**
     * 
     * @param {*} rows 
     * @param {*} cols 
     * @param {*} canvasCtx 
     * @param {*} rowHeaderCtx 
     * @param {*} colHeaderCtx 
     */
    constructor(outer_container, canvas_wrapper, gridCanvas, rowHeaderCanvas, colHeaderCanvas, gtx, rtx, ctx, window, wih, wiw) {
        // // // // // // // console.log("hellow");
        this.gridCanvas = gridCanvas;
        this.rowHeaderCanvas = rowHeaderCanvas;
        this.colHeaderCanvas = colHeaderCanvas;
        this.outer_container = outer_container;
        this.canvas_wrapper = canvas_wrapper;

        // // // // // // // console.log(gridCanvas, rowHeaderCanvas, colHeaderCanvas);

        this.drawController = new Draw(outer_container, canvas_wrapper, gridCanvas, rowHeaderCanvas, colHeaderCanvas, gtx, rtx, ctx, window);

        this.gtx = gtx;
        this.rtx = rtx;
        this.ctx = ctx;

        this.wih = wih;
        this.wiw = wiw;

        this.drh = 30;
        this.dcw = 90;

        this.chh = 30;
        this.rhw = 60;

        this.prevTop = 0;
        this.prevLeft = 0;

        this.stRow = 0;
        this.stOffRow = 0;

        this.stCol = 0;
        this.stOffCol = 0;

        this.top = 0;
        this.left = 0;

        this.rowBeingResized = -1;
        this.colBeingResized = -1;
        this.rowResize = false;
        this.colResize = false;

        this.editCell = { row: -1, col: -1 }
        // this.editCellInput = null

        // this.enCol = Math.ceil((this.wiw - this.rhw) / this.dcw);
        // this.enRow = Math.ceil((this.wih - this.chh) / this.drh);

        this.canvas_wrapper.style.height = `${this.wih * 1.5}px`;
        this.canvas_wrapper.style.width = `${this.wiw * 1.5}px`;

        // this.rangeSelected = false;
        this.rowSelected = false;
        this.colSelected = false;
        this.selectedCellRange = [{ row: -1, col: -1 }, { row: -1, col: -1 }];


        this.scroll = false;
        // // // // // // // // console.log("cols_to_make", cols_to_make, "rows_to_make", rows_to_make);

        this.cols = [];
        this.rows = [];
        this.prefixRows = [];
        let prs = 0;
        let pcs = 0;
        this.prefixCols = [];

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

        // // // // // // console.log(pcs);


        this.outer_container.height = "100%";
        this.outer_container.width = "100%";

        this.rows_fit_in_view = Math.ceil((this.wih - this.chh) / this.drh);
        this.cols_fit_in_view = Math.ceil((this.wiw - this.rhw) / this.dcw);

        // // // // // // // // console.log(this.cols);
        this.window = window;

        this.stRow = 0;
        // this.colHeaderInitStyle();
        this.visibleRows = [];
        this.visibleCols = [];

        this.calculateVisibleRows();
        this.calculateVisibleCols();

        let y = 0;
        let i = 0;

        this.topxSelection = 0;
        this.topySelection = 0;
        this.bottomxSelection = 0;
        this.bottomySelection = 0;

        // this.rowHeaderInitStyle();
        requestAnimationFrame(() => this.render());;



    }

    rowHeaderStyle() {


        this.rowHeaderCanvas.width = this.rhw * this.DPR;
        this.rowHeaderCanvas.height = this.rowsTotalHeight * this.DPR;
        this.rowHeaderCanvas.style.top = `${this.top + this.chh}px`;
        this.rowHeaderCanvas.style.left = `${this.left}px`;
        this.rowHeaderCanvas.style.width = this.rhw + 'px';
        this.rowHeaderCanvas.style.height = this.rowsTotalHeight + 'px';
    }

    rowHeaderRender() {
        this.rowHeaderStyle();

        // this.rtx = this.rowHeaderCanvas.getContext('2d');
        this.rtx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
        this.rtx.clearRect(0, 0, this.rowHeaderCanvas.width, this.rowHeaderCanvas.height);

        this.rtx.fillStyle = '#f0f0f0';
        this.rtx.fillRect(0, 0, this.rhw, this.rowsTotalHeight);
        this.rtx.lineWidth = 2;

        let y = -this.stOffRow;
        const first = this.rowResize ? -1 : this.getAdjustedSelectedRange()[0];
        const last = this.rowResize ? -1 : this.getAdjustedSelectedRange()[1];

        var sel = first.row;

        let isSelected = false;

        for (let row of this.visibleRows) {
            // // // // console.log(row.index, "First:", first.row, "Last:", last.row);

            if (first.row <= row.index && row.index <= last.row) {
                isSelected = true;
                // if (sel != last.row) sel++;

            }

            // Draw horizontal line
            this.rtx.beginPath();
            this.rtx.lineWidth = 1;
            this.rtx.moveTo(0, Math.floor(y) + 0.5);
            this.rtx.lineTo(this.rhw, Math.floor(y) + 0.5);
            this.rtx.strokeStyle = '#e0e0e0';
            this.rtx.stroke();

            if (isSelected && !this.rowSelected) {
                this.rtx.fillStyle = 'rgba(0, 200, 0, 0.10)'; // light green
                this.rtx.fillRect(0, y, this.rhw, row.height);
                this.rtx.fillStyle = '#616161';
                this.rtx.beginPath();
                this.rtx.lineWidth = 5;
                this.rtx.moveTo(this.rhw, Math.floor(y) - 0.5);
                this.rtx.lineTo(this.rhw, Math.floor(y) + row.height + 0.5);
                this.rtx.strokeStyle = 'rgb(16,124,65)';
                this.rtx.stroke();

            } else if (isSelected && this.rowSelected) {
                this.rtx.fillStyle = 'rgb(16,124,65)';
                this.rtx.fillRect(0, y, this.rhw, row.height);
                this.rtx.fillStyle = '#ffffff';
            } else {
                this.rtx.fillStyle = '#616161';

            }



            // Draw row number
            this.rtx.textBaseline = 'middle';
            this.rtx.font = '16px sans-serif';
            this.rtx.textAlign = 'right';
            this.rtx.fillText(row.index + 1, this.rhw - 5, y + row.height / 2);

            y += row.height;

            isSelected = false;
        }
    }


    indexToColumnLabel(index) {
        let label = '';
        index = index;
        while (index >= 0) {
            label = String.fromCharCode((index % 26) + 65) + label;
            index = Math.floor(index / 26) - 1;
        }
        return label;
    }

    colHeaderInitStyle() {
        this.colHeaderCanvas.width = this.colsTotalWidth * this.DPR;
        this.colHeaderCanvas.height = this.chh * this.DPR;
        this.colHeaderCanvas.style.left = this.rhw + this.left + 'px';
        this.colHeaderCanvas.style.top = this.top + 'px';
        this.colHeaderCanvas.style.width = this.colsTotalWidth + 'px';
        this.colHeaderCanvas.style.height = this.chh + 'px';
    }

    colHeaderRender() {

        // this.colHeaderCanvas.style.position = 'sticky';
        this.colHeaderInitStyle();
        // // // // // // console.log(this.visibleCols)
        this.ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
        this.ctx.clearRect(0, 0, this.colHeaderCanvas.width, this.colHeaderCanvas.height);

        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.chh, this.colsTotalWidth);
        this.ctx.lineWidth = 1;

        let x = -this.stOffCol;
        let col = undefined;
        const adjustedCellSelection = this.getAdjustedSelectedRange();
        const first = adjustedCellSelection[0];
        const last = adjustedCellSelection[1];

        // // // // console.log("First:", first, "Last:", last);
        var sel = first.col;

        // // // // // console.log(this.visibleCols[0].index, first.col, last.col);

        let isSelected = false;
        for (col of this.visibleCols) {
            // // // // // console.log("Col:", col.index, "First:", first., "Last:", last.col);
            if ((col.index >= first.col && col.index <= last.col)) {
                // // // // console.log("true");
                isSelected = true;
                // if (sel != last.col) sel++;
            }

            this.ctx.lineWidth = 1;
            // Draw horizontal line
            this.ctx.beginPath();
            this.ctx.moveTo(Math.floor(x) + 0.5, 0);
            this.ctx.lineTo(Math.floor(x) + 0.5, this.chh);
            this.ctx.strokeStyle = '#e0e0e0';
            this.ctx.stroke();

            if (isSelected && !this.colSelected) {
                this.ctx.fillStyle = 'rgba(0, 200, 0, 0.10)'; // light green
                this.ctx.fillRect(x, 0, col.width, this.chh);
                this.ctx.fillStyle = '#616161';
                this.ctx.beginPath();
                this.ctx.lineWidth = 5;
                this.ctx.moveTo(Math.floor(x) - 0.5, this.chh);
                this.ctx.lineTo(Math.floor(x) + col.width + 0.5, this.chh);
                this.ctx.strokeStyle = 'rgb(16,124,65)';
                this.ctx.stroke();
            } else if (isSelected && this.colSelected) {
                this.ctx.fillStyle = 'rgb(16,124,65)';
                this.ctx.fillRect(x, 0, col.width, this.chh);
                this.ctx.fillStyle = '#ffffff';
            } else {
                this.ctx.fillStyle = '#616161';
            }



            // Draw row number
            // this.ctx.fillStyle = '#616161';
            this.ctx.textBaseline = 'middle';
            this.ctx.font = '16px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.indexToColumnLabel(col.index), x + col.width / 2, this.chh / 2 + 5);
            x += col.width;

            isSelected = false;

        }

        this.ctx.beginPath();
        this.ctx.moveTo(Math.floor(x) + 0.5, 0);
        this.ctx.lineTo(Math.floor(x) + 0.5, this.chh);
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.stroke();

        // Draw row number
        this.ctx.fillStyle = '#616161';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = '16px sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(this.indexToColumnLabel(col.index), x + col.width / 2, this.chh / 2 + 5);
        x += col.width;

    }


    drawGrid() {
        const ctx = this.gridCtx;
        const DPR = this.DPR;

        this.gridCanvas.width = this.colsTotalWidth * DPR;
        this.gridCanvas.height = this.rowsTotalHeight * DPR;
        this.gridCanvas.style.left = this.rhw + this.left + 'px';
        this.gridCanvas.style.top = this.chh + this.top + 'px';
        this.gridCanvas.style.width = this.colsTotalWidth + 'px';
        this.gridCanvas.style.height = this.rowsTotalHeight + 'px';

        this.gtx.setTransform(DPR, 0, 0, DPR, 0, 0);
        this.gtx.clearRect(0, 0, this.colsTotalWidth, this.rowsTotalHeight);
        this.gtx.lineWidth = 1;
        this.gtx.strokeStyle = '#e0e0e0';

        let y = -this.stOffRow;
        this.gtx.beginPath();
        this.gtx.moveTo(0, Math.floor(y) + 0.5);
        this.gtx.lineTo(this.colsTotalWidth, Math.floor(y) + 0.5);
        this.gtx.stroke();
        for (let i = 0; i < this.visibleRows.length; i++) {
            let row = this.visibleRows[i];
            y += row.height;
            this.gtx.beginPath();
            this.gtx.moveTo(0, Math.floor(y) + 0.5);
            this.gtx.lineTo(this.colsTotalWidth, Math.floor(y) + 0.5);
            this.gtx.stroke();
        }

        let x = -this.stOffCol;
        this.gtx.beginPath();
        this.gtx.moveTo(Math.floor(x) + 0.5, 0);
        this.gtx.lineTo(Math.floor(x) + 0.5, this.rowsTotalHeight);
        this.gtx.stroke();
        for (let col of this.visibleCols) {
            x += col.width;
            this.gtx.beginPath();
            this.gtx.moveTo(Math.floor(x) + 0.5, 0);
            this.gtx.lineTo(Math.floor(x) + 0.5, this.rowsTotalHeight);
            this.gtx.stroke();
        }
    }




    render() {
        // // // // // // // // console.log(window);
        this.DPR = this.window.devicePixelRatio || 1;

        // // // console.log(this.selectedCellRange[0].row, this.selectedCellRange[0].col, this.selectedCellRange[1].row, this.selectedCellRange[1].col);
        this.calculateVisibleCols();
        this.calculateVisibleRows();

        // console.log(this.visibleCols, this.visibleRows);

        // this.getAdjustedSelectedRange();
        this.rowHeaderRender();
        this.colHeaderRender();
        this.drawGrid();
        if (!this.rowResize) {
            // // // console.log(g)
            this.gridSelection();
            this.editCellInput();
        }


        // //draw cols
        // for (let x of this.prefixColX) {
        //     this.gridCtx.beginPath();
        //     this.gridCtx.moveTo(x, 0);
        //     this.gridCtx.lineTo(x, prefixRowY[rl - 1]);
        //     this.gridCtx.strokeStyle = '#ccc';
        //     this.gridCtx.lineWidth = 1;
        //     this.gridCtx.stroke();
        // }

        //draw rows
        // // // // // // console.log(this.cols)


    }

    calculateVisibleRows() {
        // Calculate the visible rows based on the current scroll position
        this.stRow = this.binarySearch(this.top, this.prefixRows, 0, this.prefixRows.length - 1);
        this.stOffRow = this.top - this.prefixRows[this.stRow];
        this.visibleRows = [];
        let y = this.stOffRow;
        // console.log("Strow:", this.stRow);
        let rowIdx = this.stRow;
        this.editCellRowThere = false;
        const dub = rowIdx;
        // // console.log("row: ", dub);

        while (y <= this.wih) {
            if (rowIdx >= this.rows.length) {
                this.rows.push(new Row(rowIdx));
                this.prefixRows.push(this.prefixRows[this.prefixRows.length - 1] + this.drh);
                if (this.colSelected) {
                    this.selectedCellRange[1].row = rowIdx;
                    // // // // // console.log("changing selected range", this.selectedCellRange);
                }
            }

            // // console.log(this.rows, this.prefixRows)

            if (this.editCell.row == rowIdx) {
                this.editCellRowThere = true;
            }

            this.visibleRows.push(this.rows[rowIdx]);
            y += this.rows[rowIdx].height;
            rowIdx++;
        }
        // // console.log("vis", this.visibleRows);
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
        while (x <= this.wiw) {
            if (colIdx >= this.cols.length) {
                this.cols.push(new Column(colIdx));
                this.prefixCols.push(this.prefixCols[this.prefixCols.length - 1] + this.dcw);
                if (this.rowSelected) {
                    this.selectedCellRange[1].col = colIdx;
                    // // // // // console.log("changing selected range", this.selectedCellRange);
                }
            }

            if (colIdx == this.editCell.col) this.editCellColThere = true;

            this.visibleCols.push(this.cols[colIdx]);
            x += this.cols[colIdx].width;
            colIdx++;
        }

        // // // // // console.log("All Columns:", this.cols);

        // if (colIdx >= this.cols.length) {
        //     this.cols.push(new Column(colIdx));
        //     this.prefixCols.push(this.prefixCols[this.prefixCols.length - 1] + this.dcw);
        // }

        // this.visibleCols.push(this.cols[colIdx]);
        // x += this.cols[colIdx].width;
        // colIdx++;

        this.colsTotalWidth = x;

        // // // // // // console.log(this.indexToColumnLabel(this.visibleCols[0].index), this.indexToColumnLabel(this.visibleCols[this.visibleCols.length - 1].index));
    }

    handleScroll(scrollLeft, scrollTop) {
        this.scroll = true;

        // if (scrollTop < this.top) {
        //     this.canvas_wrapper.height = `${this.top + this.wih}px`;
        // }
        // if (scrollLeft < this.left) {
        //     this.canvas_wrapper.width = `${this.left + this.wiw}px`;
        // }

        this.top = scrollTop;
        this.left = scrollLeft;



        requestAnimationFrame(() => {
            requestAnimationFrame(() => this.render());;
        });

        this.scroll = false;
    }

    binarySearch(value, arr, low = 0, high = arr.length - 1, type='col') {
        if(type=='row') value -= this.chh;
        else value -= this.rhw;
        let ogLow = low;
        // // // // // // // console.log("called for", value, arr, low, high, ogLow);
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[mid] < value && arr[mid+1] >= value) {
                return mid;
            } else if (arr[mid] > value) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ogLow;
    }

    binarySearchEndRow(scrollBottom, prefixRows) {
        let low = 0, high = prefixRows.length - 1, ans = prefixRows.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (prefixRows[mid] <= scrollBottom) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }


    handleResize(window, newHeight, newWidth) {
        this.wih = newHeight;
        this.wiw = newWidth;
        this.window = window;

        // this.drawController.windowResize(window);

        this.canvas_wrapper.style.height = `${this.wih * 1.5}px`;
        this.canvas_wrapper.style.width = `${this.wiw * 1.5}px`;

        this.adjustHeights();

        // this.drawController.adjustCanvasDimensions();



        requestAnimationFrame(() => {
            this.render();
        });
    }

    adjustHeights() {
        // Adjust the heights of the row headers and grid canvas based on the new dimensions
        this.rowHeaderCanvas.style.height = `${this.rowsTotalHeight}px`;
        this.gridCanvas.style.height = `${this.rowsTotalHeight}px`;
        this.gridCanvas.style.width = `${this.colsTotalWidth}px`;
        this.colHeaderCanvas.style.width = `${this.colsTotalWidth}px`;
    }

    handleMouseDown(event) {
        // // // // // // // console.log("Mouse down", event);
        const pointerX = event.clientX - this.outer_container.getBoundingClientRect().left;
        const pointerY = event.clientY - this.outer_container.getBoundingClientRect().top;
        this.mousedown = true;
        // startMouseDown(this.mousedown);
        this.rowSelected = false;
        this.colSelected = false;

        this.editCell = { row: -1, cell: -1 };
        document.getElementById('cellEdit') != null ? document.getElementById("cellEdit").remove() : () => { };



        // // // // // // // console.log("Pointer X:", pointerX, "Pointer Y:", pointerY);
        this.selectedCellRange = [];
        this.selectedCellRange[0] = this.findCellAt(pointerX, pointerY);
        this.selectedCellRange[1] = this.selectedCellRange[0];
        this.editCell = this.selectedCellRange[0];
        requestAnimationFrame(() => this.render());
    }


    handleMouseMove(event) {

        if (this.rowSelected || this.colSelected) return null;

        if (this.mousedown) {
            // // // // // // // console.log("Mouse move", event);
            const pointerX = event.clientX - this.outer_container.getBoundingClientRect().left;
            const pointerY = event.clientY - this.outer_container.getBoundingClientRect().top;
            // // // // // // console.log("Pointer X:", pointerX, "Pointer Y:", pointerY);

            this.selectedCellRange[1] = this.findCellAt(pointerX, pointerY);


            // // // console.log(this.selectedCellRange);

            requestAnimationFrame(() => this.render());
            this.printAllStates();
        }
    }

    // startMouseDown(eventType) {
    //     // // // // // // console.log("Mouse down event started", eventType);  


    // }

    handleMouseUp(event) {

        if (this.rowSelected || this.colSelected) return null;
        // // // // // // // console.log("Mouse down", event);
        const pointerX = event.clientX - this.outer_container.getBoundingClientRect().left;
        const pointerY = event.clientY - this.outer_container.getBoundingClientRect().top;
        this.mousedown = false;
        this.rowSelected = false;
        this.colSelected = false;
        this.selectedCellRange[1] = this.findCellAt(pointerX, pointerY);

        this.selectedCellRange = this.getAdjustedSelectedRange();

        if (this.selectedCellRange[0] == this.selectedCellRange[1]) {
            this.rangeSelected = false;
        } else {
            this.rangeSelected = true;
        }



        // // // // // // console.log("Selected Cell Range:", this.selectedCellRange);
        requestAnimationFrame(() => this.render());;
        // this.gridSelection();
        // // // // // // // console.log("Pointer X:", pointerX, "Pointer Y:", pointerY);

        // this.selectCell(pointerX, pointerY);
    }

    getAdjustedSelectedRange() {

        let adjustedCellSelection = [{ row: this.selectedCellRange[0].row, col: this.selectedCellRange[0].col }, { row: this.selectedCellRange[1].row, col: this.selectedCellRange[1].col }];

        // // console.log("Adjusting Cell Selection:", adjustedCellSelection[0].row, adjustedCellSelection[0].col, adjustedCellSelection[1].row, adjustedCellSelection[1].col);

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
            // // // // console.log("Row selected, adjusting range:", this.selectedCellRange);
        }

        if (this.colSelected) {
            // this.selectedCellRange[0].row = 0;
            adjustedCellSelection[1].row = this.rows.length - 1;
            // // // // console.log("Col selected, adjusting range:", this.selectedCellRange);
        }

        // // console.log("Final Adjusted Cell Selection:", adjustedCellSelection[0].row, adjustedCellSelection[0].col, adjustedCellSelection[1].row, adjustedCellSelection[1].col);

        return adjustedCellSelection;
    }

    gridSelection() {

        let adjustedCellSelection = this.getAdjustedSelectedRange();
        // // // console.log("Adjusted Cell Selection:", adjustedCellSelection);

        this.topxSelection = this.prefixCols[adjustedCellSelection[0].col] - this.left;
        this.topySelection = this.prefixRows[adjustedCellSelection[0].row] - this.top;
        this.widthSelection = this.rowSelected ? this.left + this.wiw : this.prefixCols[adjustedCellSelection[1].col + 1] - this.left - this.topxSelection;
        this.heightSelection = this.colSelected ? this.top + this.wih : this.prefixRows[adjustedCellSelection[1].row + 1] - this.top - this.topySelection;




        // // // console.log("Selection Rect:", this.topxSelection, this.topySelection, this.widthSelection, this.heightSelection);

        this.gtx.fillStyle = 'rgba(0, 200, 0, 0.10)'; // light green
        this.gtx.fillRect(this.topxSelection, this.topySelection, this.widthSelection, this.heightSelection);
        this.gtx.strokeStyle = 'rgb(16,124,65)';
        this.gtx.lineWidth = 2;
        this.gtx.beginPath();
        this.gtx.moveTo(this.topxSelection - 1, this.topySelection);
        this.gtx.lineTo(this.topxSelection + this.widthSelection, this.topySelection);
        this.gtx.lineTo(this.topxSelection + this.widthSelection, this.topySelection + this.heightSelection);
        this.gtx.lineTo(this.topxSelection, this.topySelection + this.heightSelection);
        this.gtx.lineTo(this.topxSelection, this.topySelection);
        this.gtx.stroke();
        // this.gtx.fillStyle = '#616161';
        this.gtx.closePath();
    }

    getRow(y) {
        y = y-this.chh; 
        let l = 0;
        let h = this.visibleRows.length + 1;
        console.log('------',y, l, h);
        for(let i = 0; i<h; i++){
            console.log(this.prefixRows[i]);
        }
        while (l <= h) {
            let m = Math.floor((l + h) / 2);

            console.log(this.prefixRows[m], this.prefixRows[m+1], m, y)
            if (this.prefixRows[m] <= y && this.prefixRows[m + 1] >= y) {
                
                console.log('---------')
                return m;
            } else if (this.prefixRows[m] >= y) h = m - 1;
            else l = m + 1;
        }
        console.log('------')
    }

    findCellAt(pointerX, pointerY) {
        // Adjust for header sizes
        const x = pointerX - this.rhw;
        const y = pointerY - this.chh;

        // Ignore clicks in header areas
        if (x < 0 || y < 0) return null;

        // Find column and row index using binary search
        const colIdx = this.binarySearch(x + this.left, this.prefixCols, 0, this.prefixCols.length - 1);
        const rowIdx = this.binarySearch(y + this.top, this.prefixRows, 0, this.prefixRows.length - 1);

        // // // // // // console.log("Cell found at:", rowIdx, colIdx);

        return { row: rowIdx, col: colIdx };
    }

    handleRowHeaderMouseDown(event) {
        // // // // // // // console.log("Row header mouse down", event);
        if (document.body.style.cursor != "default") {
            this.rowResize = true;;
            return null;
        }

        const pointerY = event.clientY +this.top;
        // // // // console.log("Pointer Y:", pointerY);
        const pointerX = event.clientX - this.outer_container.getBoundingClientRect().left;
        this.mousedown = true;
        this.rowSelected = true;
        this.colSelected = false;
        // // // // // // console.log("Pointer X:", pointerX, "Pointer Y:", pointerY);
        this.editCell = { row: -1, cell: -1 };


        // // // // // // // console.log("Pointer X:", pointerX, "Pointer Y:", pointerY);
        this.selectedCellRange = [];
        this.selectedCellRange[0] = { row: this.binarySearch(pointerY, this.prefixRows, 0, this.prefixRows.length - 1, 'row'), col: 0 };
        this.selectedCellRange[1] = { row: this.selectedCellRange[0].row, col: this.cols.length - 1 };
        // // console.log("Selected Row Range:", this.selectedCellRange);
        requestAnimationFrame(() => this.render());;
    }

    handleRowHeaderMouseMove(e) {

        if (this.rowResize) {
            let diff = e.clientY - this.chh - this.prefixRows[this.rowBeingResized];
            // this.prefixRows[rowBeingResized] += diff;
            for (let i = this.rowBeingResized; i < this.prefixRows.length; i++) {
                this.prefixRows[i] += diff;
            }
            // // console.log(this.rows[this.rowBeingResized], this.rows[this.rowBeingResized - 1], this.prefixRows[this.rowBeingResized], this.prefixRows[this.rowBeingResized - 1]);
            this.rows[this.rowBeingResized - 1].height += diff;

            // // console.log(this.prefixRows);

            this.printAllStates();
            this.render();
            return null;
        }
        let y = e.clientY - this.chh;
        // if(rowSelected) return null;
        let resizeIndex = this.rowBeingResized = this.exactBinarySearch(y, this.prefixRows);

        if (resizeIndex != -1) {
            // // // console.log('chaning')
            document.body.style.cursor = "row-resize";
        } else {
            document.body.style.cursor = "default";
        }


        // if(>=0){

        // }
    }

    handleRowHeaderMouseUp(event) {

        if (this.rowResize) {
            this.rowResize = false;
            this.render();
            return null;
        }
        // // // // // // // console.log("Row header mouse up", event);
        const pointerY = event.clientY + this.top;
        const pointerX = event.clientX;
        this.mousedown = false;

        // // // // console.log(this.cols.length);

        this.selectedCellRange[1] = { row: this.binarySearch(pointerY, this.prefixRows, 0, this.prefixRows.length - 1), col: this.cols.length - 1 };



        // // // // console.log("Selected Row Range:", this.selectedCellRange);
        requestAnimationFrame(() => this.render());;
    }

    handleColHeaderMouseDown(event) {


        // // // // // // // console.log("Col header mouse down", event);
        const pointerX = event.clientX + this.left;
        this.mousedown = true;
        this.rowSelected = false;
        this.colSelected = true;
        // // // // // // console.log("Pointer X:", pointerX, "Pointer Y:", pointerY);
        this.editCell = { row: -1, cell: -1 };
        this.selectedCellRange = [];
        this.selectedCellRange[0] = { row: 0, col: this.binarySearch(pointerX, this.prefixCols, 0, this.prefixCols.length - 1) - 1 };
        this.selectedCellRange[1] = { row: this.rows.length - 1, col: this.selectedCellRange[0].col };
        // // // // console.log("Selected Col Range:", this.selectedCellRange);
        requestAnimationFrame(() => this.render());;
    }

    handleColHeaderMouseMove(e) {

        if (this.rowResize) {
            let diff = e.clientX - this.rhw - this.prefixCols[this.colBeingResized];
            // this.prefixRows[rowBeingResized] += diff;
            for (let i = this.colBeingResized; i < this.prefixCols.length; i++) {
                this.prefixCols[i] += diff;
            }
            // // console.log(this.rows[this.rowBeingResized], this.rows[this.rowBeingResized - 1], this.prefixRows[this.rowBeingResized], this.prefixRows[this.rowBeingResized - 1]);
            this.cols[this.colBeingResized - 1].width += diff;

            // // console.log(this.prefixRows);

            this.printAllStates();
            this.render();
            return null;
        }
        let x = e.clientX - this.rhw;
        // if(rowSelected) return null;
        let resizeIndex = this.colBeingResized = this.exactBinarySearch(x, this.prefixCols);

        if (resizeIndex != -1) {
            // // // console.log('chaning')
            document.body.style.cursor = "col-resize";
        } else {
            document.body.style.cursor = "default";
        }


        // if(>=0){

        // }
    }

    handleColHeaderMouseUp(event) {
        // // // // // // // console.log("Col header mouse up", event);;
        const pointerX = event.clientX + this.left;
        this.mousedown = false;

        this.selectedCellRange[1] = { row: this.rows.length - 1, col: this.binarySearch(pointerX, this.prefixCols, 0, this.prefixCols.length - 1) - 1 };

        // // // // console.log("Selected Col Range:", this.selectedCellRange);
        requestAnimationFrame(() => this.render());
    }

    editCellInput() {
        document.getElementById('cellEdit') != null ? document.getElementById("cellEdit").remove() : () => { };

        if (!this.editCellColThere || !this.editCellRowThere) return null;

        let r = this.editCell.row;
        let c = this.editCell.col;
        // // console.log(this.editCellColThere, this.editCellRowThere);
        // // console.log(this.prefixRows[r], this.prefixCols[c], (this.rows[r]?.height || this.drh), this.cols[c].width);

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

    }



    exactBinarySearch(val, arr) {
        let low = 0;
        let high = arr.length - 1;
        // // // console.log(arr[0]);
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            // // // console.log(val, arr[mid]);
            if (arr[mid] + 2 >= val && arr[mid] - 2 <= val) return mid;
            else if (arr[mid] > val) high = mid - 1;
            else low = mid + 1;
        }

        return -1;
    }

    printAllStates() {
        // // console.log(this);
    }
}