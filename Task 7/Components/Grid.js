class Grid {
    constructor(rows, cols, canvasCtx, rowHeaderCtx, colHeaderCtx) {
        this.rows = rows;
        this.cols = cols;
        this.gridCtx = gridCtx;
        this.rowCtx = rowCtx;
        this.colCtx = colCtx;
        this.rl = rows.length;
        this.cl = cols.length;

        prefixRowY = [];
        prefixSumRow = 0;
        i = 0;

        for (let row in this.rows) {
            prefixSumRow += row.height;
            prefixRowY[i++] = prefixSumRow;
        }

        prefixColX = [];
        prefixSumCol = 0;
        i = 0;

        for (let col in this.cols) {
            prefixSumCol += col.height;
            prefixXColY[i++] = prefixSumCol;
        }

        console.log(prefixRowY, prefixColX);
    }

    render(window) {
        
        const rowHeader = document.getElementById('row-header');
        const colHeader = document.getElementById('col-header');
        const rowCtx = rowHeader.getContext('2d');
        const colCtx = colHeader.getContext('2d');

        const ROW_HEADER_WIDTH = 60;
        const COL_HEADER_HEIGHT = 30;
        const DPR = window.devicePixelRatio || 1;

        const width = window.innerWidth;
        const height = window.innerHeight;

        rowHeader.width = ROW_HEADER_WIDTH * DPR;
        rowHeader.height = (height - COL_HEADER_HEIGHT) * DPR;
        rowHeader.style.left = '0px';
        rowHeader.style.top = COL_HEADER_HEIGHT + 'px';
        rowHeader.style.width = ROW_HEADER_WIDTH + 'px';
        rowHeader.style.height = (height - COL_HEADER_HEIGHT) + 'px';
        rowCtx.setTransform(1, 0, 0, 1, 0, 0);
        rowCtx.scale(DPR, DPR);

        colHeader.width = (width - ROW_HEADER_WIDTH) * DPR;
        colHeader.height = COL_HEADER_HEIGHT * DPR;
        colHeader.style.left = ROW_HEADER_WIDTH + 'px';
        colHeader.style.top = '0px';
        colHeader.style.width = (width - ROW_HEADER_WIDTH) + 'px';
        colHeader.style.height = COL_HEADER_HEIGHT + 'px';
        colCtx.setTransform(1, 0, 0, 1, 0, 0);
        colCtx.scale(DPR, DPR);

        //draw cols
        for (let x of this.prefixColX) {
            this.gridCtx.beginPath();
            this.gridCtx.moveTo(x, 0);
            this.gridCtx.lineTo(x, prefixRowY[rl - 1]);
            this.gridCtx.strokeStyle = '#ccc';
            this.gridCtx.lineWidth = 1;
            this.gridCtx.stroke();
        }

        //draw rows
        for (let y of this.prefixRowY) {
            this.gridCtx.beginPath();
            this.gridCtx.moveTo(0, y);
            this.gridCtx.lineTo(prefixColX[cl - 1], y);
            this.gridCtx.strokeStyle = '#ccc';
            this.gridCtx.lineWidth = 1;
            this.gridCtx.stroke();
        }


    }
}