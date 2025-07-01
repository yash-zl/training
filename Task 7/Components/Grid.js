import { Row } from './Row.js';
import { Column } from './Column.js'

export class Grid {
    /**
     * 
     * @param {*} rows 
     * @param {*} cols 
     * @param {*} canvasCtx 
     * @param {*} rowHeaderCtx 
     * @param {*} colHeaderCtx 
     */
    constructor(gridCanvas, rowHeaderCanvas, colHeaderCanvas, gtx, rtx, ctx, window, wih, wiw) {
        console.log("hellow");
        this.gridCanvas = grid;
        this.rowHeaderCanvas = rowHeaderCanvas;
        this.colHeaderCanvas = colHeaderCanvas;

        console.log(gridCanvas, rowHeaderCanvas, colHeaderCanvas);

        this.gtx = gtx;
        this.rtx = rtx;
        this.ctx = ctx;

        this.wih = wih;
        this.wiw = wiw;

        this.drh = 30;
        this.dcw = 90;

        this.chh = 30;
        this.rhw = 60;

        var cols_to_make = Math.ceil(this.wiw * 1.5 / this.dcw);
        var rows_to_make = Math.ceil(this.wih * 1.6 / this.drh);

        this.cols = [];
        this.rows = [];

        for (let i = 0; i < rows_to_make; i++) {
            this.rows.push(new Row(i + 1));
        }

        for (let i = 0; i < cols_to_make; i++) {
            this.cols.push(new Column(i + 1));
        }

        // console.log(render);
        this.window = window;

        this.render(this.window);
    }

    drawRowHeaders() {
        this.rtx.clearRect(0, 0, this.rowHeaderCanvas.width, this.rowHeaderCanvas.height);
        this.rtx.lineWidth = 0.6;
        this.rtx.strokeStyle = '#e0e0e0';
        this.rtx.fillStyle = '#616161';
        this.rtx.textBaseline = 'middle';
        this.rtx.font = '12px sans-serif';
        this.rtx.textAlign = "right";
        for (let r = 0; r <= NUM_ROWS; r++) {
            const y = Math.floor(r * default_row_height) + 0.5;
            this.rtx.beginPath();
            this.rtx.moveTo(0, y);
            this.rtx.lineTo(ROW_HEADER_WIDTH, y);
            this.rtx.stroke();
            if (r < NUM_ROWS) {
                this.rtx.fillText(r + 1, ROW_HEADER_WIDTH - 5, y + default_row_height / 2 - 0.5);
            }
        }
    }

    rowHeaderRender() {
        console.log(this.rhw, this.DPR);
        this.rowHeaderCanvas.width = this.rhw * this.DPR;
        this.rowHeaderCanvas.height = this.wih * this.DPR;
        this.rowHeaderCanvas.style.left = '0px';
        this.rowHeaderCanvas.style.top = this.chh + 'px';
        this.rowHeaderCanvas.style.width = this.rhw + 'px';
        this.rowHeaderCanvas.style.height = this.wih + 'px';

        // Use DPR-scaled coordinate system
        this.rtx.fillStyle = '#f0f0f0';
        this.rtx.fillRect(0, 0, this.rhw, this.wih);
        this.rtx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
        this.rtx.lineWidth = 1;

        let prefixSumRow = 0;

        for (let row of this.rows) {
            const y = row.height;
            prefixSumRow += y;

            // Draw horizontal grid line with pixel alignment
            this.rtx.beginPath();
            this.rtx.moveTo(0, Math.floor(prefixSumRow) + 0.5);
            this.rtx.lineTo(this.rhw, Math.floor(prefixSumRow) + 0.5);
            this.rtx.strokeStyle = "#e0e0e0";
            this.rtx.stroke();

            // Draw row number
            this.rtx.fillStyle = '#616161';
            this.rtx.textBaseline = 'middle';
            this.rtx.font = '14px sans-serif';
            this.rtx.textAlign = "right";

            const labelY = prefixSumRow - y + y / 2;
            this.rtx.fillText(row.index, this.rhw - 5, labelY);
        }
    }

    indexToColumnLabel(index) {
        let label = '';
        while (index >= 0) {
            label = String.fromCharCode((index % 26) + 65) + label;
            index = Math.floor(index / 26) - 1;
        }
        return label;
    }

    colHeaderRender() {
        this.colHeaderCanvas.width = this.wiw * this.DPR;
        this.colHeaderCanvas.height = this.chh * this.DPR;
        this.colHeaderCanvas.style.left = this.rhw + 'px';
        this.colHeaderCanvas.style.top = '0px';
        this.colHeaderCanvas.style.width = this.wiw + 'px';
        this.colHeaderCanvas.style.height = this.chh + 'px';

        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.wiw, this.chh);
        this.ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
        this.ctx.lineWidth = 1 / this.DPR;

        let prefixSumCol = 0;

        for (let col of this.cols) {
            const x = col.width;
            prefixSumCol += x;

            // Draw vertical grid line
            this.ctx.beginPath();
            this.ctx.moveTo(Math.floor(prefixSumCol) + 0.5, 0);
            this.ctx.lineTo(Math.floor(prefixSumCol) + 0.5, this.chh);
            this.ctx.strokeStyle = "#e0e0e0";
            this.ctx.stroke();

            // Draw column letter
            this.ctx.fillStyle = '#616161';
            this.ctx.textBaseline = 'middle';
            this.ctx.font = '14px sans-serif';
            this.ctx.textAlign = "center";

            const labelX = prefixSumCol - x / 2;
            this.ctx.fillText(this.indexToColumnLabel(col.index), labelX, this.chh / 2);
        }
    }


    drawGrid() {
        const ctx = this.gridCtx;
        const DPR = this.DPR;

        this.gridCanvas.width = this.wiw * DPR;
        this.gridCanvas.height = this.wih * DPR;
        this.gridCanvas.style.left = this.rhw + 'px';
        this.gridCanvas.style.top = this.chh + 'px';
        this.gridCanvas.style.width = this.wiw + 'px';
        this.gridCanvas.style.height = this.wih + 'px';

        this.gtx.setTransform(DPR, 0, 0, DPR, 0, 0);
        this.gtx.clearRect(0, 0, this.wiw, this.wih);
        this.gtx.lineWidth = 1;
        this.gtx.strokeStyle = '#e0e0e0';

        let y = 0;
        for (let row of this.rows) {
            y += row.height;
            this.gtx.beginPath();
            this.gtx.moveTo(0, Math.floor(y) + 0.5);
            this.gtx.lineTo(this.wiw, Math.floor(y) + 0.5);
            this.gtx.stroke();
        }

        let x = 0;
        for (let col of this.cols) {
            x += col.width;
            this.gtx.beginPath();
            this.gtx.moveTo(Math.floor(x) + 0.5, 0);
            this.gtx.lineTo(Math.floor(x) + 0.5, this.wih);
            this.gtx.stroke();
        }
    }




    render(window) {
        console.log(window);
        this.DPR = window.devicePixelRatio || 1;

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.rowHeaderRender();
        this.colHeaderRender();
        this.drawGrid();


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



    }
}