import { RenderData } from "./RenderData.js";
import { Utils } from "./Utils.js";

export class Draw {
    constructor(outerContainer, canvasWrapper, gridCanvas, rowHeaderCanvas, colHeaderCanvas, gridContext, rowHeaderContext, colHeaderContext, window) {
        this.outerContainer = outerContainer;
        this.canvasWrapper = canvasWrapper;
        this.gridCanvas = gridCanvas;
        this.rowHeaderCanvas = rowHeaderCanvas;
        this.colHeaderCanvas = colHeaderCanvas;
        this.gtx = gridContext;
        this.rtx = rowHeaderContext;
        this.ctx = colHeaderContext;
        this.window = window;
        this.wih = this.window.innerHeight;
        this.wiw = this.window.innerWidth;

        this.renderData = new RenderData();
        this.utils = new Utils();

        this.canvasWrapper.style.height = `${this.wih * 1.5}px`;
        this.canvasWrapper.style.width = `${this.wiw * 1.5}px`;
    }

    drawGrid() {
        const DPR = this.renderData.DPR;

        this.gridCanvas.width = this.renderData.colsTotalWidth * DPR;
        this.gridCanvas.height = this.renderData.rowsTotalHeight * DPR;
        this.gridCanvas.style.left = this.renderData.rhw + this.renderData.left + 'px';
        this.gridCanvas.style.top = this.renderData.chh + this.renderData.top + 'px';
        this.gridCanvas.style.width = this.renderData.colsTotalWidth + 'px';
        this.gridCanvas.style.height = this.renderData.rowsTotalHeight + 'px';

        this.gtx.setTransform(DPR, 0, 0, DPR, 0, 0);
        this.gtx.clearRect(0, 0, this.renderData.colsTotalWidth, this.renderData.rowsTotalHeight);
        this.gtx.lineWidth = 1;
        this.gtx.strokeStyle = '#e0e0e0';

        let y = -this.renderData.stOffRow;
        this.gtx.beginPath();
        this.gtx.moveTo(0, Math.floor(y) + 0.5);
        this.gtx.lineTo(this.renderData.colsTotalWidth, Math.floor(y) + 0.5);
        this.gtx.stroke();
        for (let row of this.renderData.visibleRows.slice(1)) {
            y += row.height;
            this.gtx.beginPath();
            this.gtx.moveTo(0, Math.floor(y) + 0.5);
            this.gtx.lineTo(this.renderData.colsTotalWidth, Math.floor(y) + 0.5);
            this.gtx.stroke();
        }

        let x = -this.renderData.stOffCol;
        this.gtx.beginPath();
        this.gtx.moveTo(Math.floor(x) + 0.5, 0);
        this.gtx.lineTo(Math.floor(x) + 0.5, this.renderData.rowsTotalHeight);
        this.gtx.stroke();
        for (let col of this.renderData.visibleCols) {
            x += col.width;
            this.gtx.beginPath();
            this.gtx.moveTo(Math.floor(x) + 0.5, 0);
            this.gtx.lineTo(Math.floor(x) + 0.5, this.renderData.rowsTotalHeight);
            this.gtx.stroke();
        }
    }

    rowHeaderStyle() {
        this.rowHeaderCanvas.width = this.renderData.rhw * this.renderData.DPR;
        this.rowHeaderCanvas.height = this.renderData.rowsTotalHeight * this.renderData.DPR;
        this.rowHeaderCanvas.style.top = `${this.renderData.top + this.renderData.chh}px`;
        this.rowHeaderCanvas.style.left = `${this.renderData.left}px`;
        this.rowHeaderCanvas.style.width = this.renderData.rhw + 'px';
        this.rowHeaderCanvas.style.height = this.renderData.rowsTotalHeight + 'px';
    }

    rowHeaderRender() {
        this.rowHeaderStyle();

        // this.rtx = this.rowHeaderCanvas.getContext('2d');
        this.rtx.setTransform(this.renderData.DPR, 0, 0, this.renderData.DPR, 0, 0);
        this.rtx.clearRect(0, 0, this.rowHeaderCanvas.width, this.rowHeaderCanvas.height);

        this.rtx.fillStyle = '#f0f0f0';
        this.rtx.fillRect(0, 0, this.renderData.rhw, this.renderData.rowsTotalHeight);
        this.rtx.lineWidth = 2;

        let y = -this.renderData.stOffRow;
        const first = this.renderData.getAdjustedSelectedRange()[0];
        const last = this.renderData.getAdjustedSelectedRange()[1];

        var sel = first.row;

        let isSelected = false;

        for (let row of this.renderData.visibleRows) {
            if (first.row <= row.index && row.index <= last.row) {
                isSelected = true;
            }
            this.rtx.beginPath();
            this.rtx.lineWidth = 1;
            this.rtx.moveTo(0, Math.floor(y) + 0.5);
            this.rtx.lineTo(this.renderData.rhw, Math.floor(y) + 0.5);
            this.rtx.strokeStyle = '#e0e0e0';
            this.rtx.stroke();

            if (isSelected && !this.renderData.rowSelected) {
                this.rtx.fillStyle = 'rgba(0, 200, 0, 0.10)'; // light green
                this.rtx.fillRect(0, y, this.renderData.rhw, row.height);
                this.rtx.fillStyle = '#616161';
                this.rtx.beginPath();
                this.rtx.lineWidth = 5;
                this.rtx.moveTo(this.renderData.rhw, Math.floor(y) - 0.5);
                this.rtx.lineTo(this.renderData.rhw, Math.floor(y) + row.height + 0.5);
                this.rtx.strokeStyle = 'rgb(16,124,65)';
                this.rtx.stroke();

            } else if (isSelected && this.renderData.rowSelected) {
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
            this.rtx.fillText(row.index + 1, this.renderData.rhw - 5, y + row.height / 2);

            y += row.height;

            isSelected = false;
        }
    }

    colHeaderInitStyle() {
        this.colHeaderCanvas.width = this.renderData.colsTotalWidth * this.renderData.DPR;
        this.colHeaderCanvas.height = this.renderData.chh * this.renderData.DPR;
        this.colHeaderCanvas.style.left = this.renderData.rhw + this.renderData.left + 'px';
        this.colHeaderCanvas.style.top = this.renderData.top + 'px';
        this.colHeaderCanvas.style.width = this.renderData.colsTotalWidth + 'px';
        this.colHeaderCanvas.style.height = this.renderData.chh + 'px';
    }

    colHeaderRender() {
        this.colHeaderInitStyle();
        this.ctx.setTransform(this.renderData.DPR, 0, 0, this.renderData.DPR, 0, 0);
        this.ctx.clearRect(0, 0, this.colHeaderCanvas.width, this.colHeaderCanvas.height);

        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.renderData.chh, this.renderData.colsTotalWidth);
        this.ctx.lineWidth = 1;

        let x = -this.renderData.stOffCol;
        let col = undefined;
        const adjustedCellSelection = this.renderData.getAdjustedSelectedRange();
        const first = adjustedCellSelection[0];
        const last = adjustedCellSelection[1];

        var sel = first.col;
        let isSelected = false;

        for (col of this.renderData.visibleCols) {
            if ((col.index >= first.col && col.index <= last.col)) {
                isSelected = true;
            }

            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(Math.floor(x) + 0.5, 0);
            this.ctx.lineTo(Math.floor(x) + 0.5, this.renderData.chh);
            this.ctx.strokeStyle = '#e0e0e0';
            this.ctx.stroke();

            if (isSelected && !this.renderData.colSelected) {
                this.ctx.fillStyle = 'rgba(0, 200, 0, 0.10)'; // light green
                this.ctx.fillRect(x, 0, col.width, this.renderData.chh);
                this.ctx.fillStyle = '#616161';
                this.ctx.beginPath();
                this.ctx.lineWidth = 5;
                this.ctx.moveTo(Math.floor(x) - 0.5, this.renderData.chh);
                this.ctx.lineTo(Math.floor(x) + col.width + 0.5, this.renderData.chh);
                this.ctx.strokeStyle = 'rgb(16,124,65)';
                this.ctx.stroke();
            } else if (isSelected && this.renderData.colSelected) {
                this.ctx.fillStyle = 'rgb(16,124,65)';
                this.ctx.fillRect(x, 0, col.width, this.renderData.chh);
                this.ctx.fillStyle = '#ffffff';
            } else {
                this.ctx.fillStyle = '#616161';
            }

            this.ctx.textBaseline = 'middle';
            this.ctx.font = '16px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.utils.indexToColumnLabel(col.index), x + col.width / 2, this.renderData.chh / 2 + 5);
            x += col.width;

            isSelected = false;

        }

        this.ctx.beginPath();
        this.ctx.moveTo(Math.floor(x) + 0.5, 0);
        this.ctx.lineTo(Math.floor(x) + 0.5, this.renderData.chh);
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.stroke();

        this.ctx.fillStyle = '#616161';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = '16px sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(this.utils.indexToColumnLabel(col.index), x + col.width / 2, this.renderData.chh / 2 + 5);
        x += col.width;

    }

    renderScreen() {
        // this.renderData.DPR = this.window.devicePixelRatio || 1;
        // this.calculateVisibleCols();
        // this.calculateVisibleRows();

        this.renderData.calculateVisibleData();
        // this.getAdjustedSelectedRange();
        this.rowHeaderRender();
        this.colHeaderRender();
        this.drawGrid();
        this.drawGridSelection();
        this.editCellInput();
    }

    windowResize(window) {
        this.window = window;
        this.wih = this.window.innerHeight;
        this.wiw = this.window.innerWidth;

        this.canvasWrapper.style.height = `${this.wih * 1.5}px`;
        this.canvasWrapper.style.width = `${this.wiw * 1.5}px`;
    }

    adjustAllCanvasDimensions() {
        this.rowHeaderCanvas.style.height = `${this.renderData.rowsTotalHeight}px`;
        this.gridCanvas.style.height = `${this.renderData.rowsTotalHeight}px`;
        this.gridCanvas.style.width = `${this.renderData.colsTotalWidth}px`;
        this.colHeaderCanvas.style.width = `${this.renderData.colsTotalWidth}px`;
    }

    drawGridSelection() {

        let adjustedCellSelection = this.renderData.getAdjustedSelectedRange();

        // console.log("Adjusted Cell Selection:", adjustedCellSelection);

        const topxSelection = this.renderData.prefixCols[adjustedCellSelection[0].col] - this.renderData.left;
        const topySelection = this.renderData.prefixRows[adjustedCellSelection[0].row] - this.renderData.top;
        const widthSelection = this.renderData.rowSelected ? this.renderData.left + this.renderData.wiw : this.renderData.prefixCols[adjustedCellSelection[1].col + 1] - this.renderData.left - this.renderData.topxSelection;
        const heightSelection = this.renderData.colSelected ? this.renderData.top + this.renderData.wih : this.renderData.prefixRows[adjustedCellSelection[1].row + 1] - this.renderData.top - this.renderData.topySelection;




        // console.log("Selection Rect:", this.topxSelection, this.topySelection, this.widthSelection, this.heightSelection);

        this.gtx.fillStyle = 'rgba(0, 200, 0, 0.10)'; // light green
        this.gtx.fillRect(topxSelection, topySelection, widthSelection, heightSelection);
        this.gtx.strokeStyle = 'rgb(16,124,65)';
        this.gtx.lineWidth = 2;
        this.gtx.beginPath();
        this.gtx.moveTo(topxSelection - 1, topySelection);
        this.gtx.lineTo(topxSelection + widthSelection, topySelection);
        this.gtx.lineTo(topxSelection + widthSelection, topySelection + heightSelection);
        this.gtx.lineTo(topxSelection, topySelection + heightSelection);
        this.gtx.lineTo(topxSelection, topySelection);
        this.gtx.stroke();
        // this.gtx.fillStyle = '#616161';
        this.gtx.closePath();
    }

    editCellInput() {
        document.getElementById('cellEdit') != null ? document.getElementById("cellEdit").remove() : () => { };


        let r = this.renderData.editCellInfo.row;
        let c = this.renderData.editCellInfo.col;
        console.log(r, c);
        // console.log(this.renderData.prefixRows[r], this.renderData.prefixCols[c], (this.renderData.rows[r]?.height || this.renderData.drh), this.renderData.cols[c].width);

        // this.gtx.beginPath();
        // this.gtx.clearRect(this.prefixCols[c] + 2, this.prefixRows[r] + 2, this.cols[c].width - 4, (this.rows[r].height || this.drh) - 4);

        let input = document.createElement('input');
        // if(this.outer_container.childNodes.contains(input)) this.outer_container.removeChild(input);
        input.setAttribute("id", "cellEdit");
        input.style.position = "absolute";
        input.style.left = this.renderData.prefixCols[c] + 2 + this.renderData.rhw + "px";
        input.style.top = this.renderData.prefixRows[r] + 2 + this.renderData.chh + "px";
        input.style.height = this.renderData.rows[r].height - 4 + 'px';
        input.style.width = this.renderData.cols[c].width - 4 + 'px';
        input.style.zIndex = +100;
        input.style.border = "none";
        input.style.outline = "none";
        this.canvasWrapper.appendChild(input);
        input.focus();
    }
}