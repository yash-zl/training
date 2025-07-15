export class RenderHandler {
    constructor(dataController) {
        this.dataController = dataController;
    }

    rowHeaderStyle() {
        const rhc = this.dataController.getRowCanvas();
        const dpr = this.dataController.getDPR();
        rhc.width = this.dataController.getRhw() * dpr;
        rhc.height = this.dataController.getRowsTotalHeight() * dpr;
        rhc.style.top = `${this.dataController.getTop() + this.dataController.getChh()}px`;
        rhc.style.left = `${this.dataController.getLeft()}px`;
        rhc.style.width = `${this.dataController.getRhw()}px`;
        rhc.style.height = `${this.dataController.getRowsTotalHeight()}px`;
    }

    rowHeaderRender() {
        this.rowHeaderStyle();

        const rtx = this.dataController.getRtx();
        const rhc = this.dataController.getRowCanvas();
        const dpr = this.dataController.getDPR();
        const rhw = this.dataController.getRhw();
        rtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        rtx.clearRect(0, 0, rhc.width, rhc.height);

        rtx.fillStyle = '#f0f0f0';
        rtx.fillRect(0, 0, rhw, this.dataController.getRowsTotalHeight());
        rtx.lineWidth = 2;

        const stoffRow = this.dataController.getStOffRow();
        let y = -stoffRow;
        const rowResize = this.dataController.getRowResize();
        const adjustedCellRange = this.dataController.getAdjustedSelectedRange();
        const first = adjustedCellRange[0];
        const last = adjustedCellRange[1];

        //console.log('y',y);

        const visibleRows = this.dataController.getVisibleRows();

        for (const row of visibleRows) {
            const isSelected = !rowResize && first.row <= row.index && row.index <= last.row;

            rtx.beginPath();
            rtx.lineWidth = 1;
            rtx.moveTo(0, Math.floor(y) + 0.5);
            rtx.lineTo(rhw, Math.floor(y) + 0.5);
            rtx.strokeStyle = '#e0e0e0';
            rtx.stroke();

            if (isSelected && !this.dataController.getRowSelected()) {
                rtx.fillStyle = 'rgba(0, 200, 0, 0.10)';
                rtx.fillRect(0, y, rhw, row.height);
                rtx.fillStyle = '#616161';
                rtx.beginPath();
                rtx.lineWidth = 5;
                rtx.moveTo(rhw, Math.floor(y) - 0.5);
                rtx.lineTo(rhw, Math.floor(y) + row.height + 0.5);
                rtx.strokeStyle = 'rgb(16,124,65)';
                rtx.stroke();
            } else if (isSelected && this.dataController.getRowSelected()) {
                rtx.fillStyle = 'rgb(16,124,65)';
                rtx.fillRect(0, y, rhw, row.height);
                rtx.fillStyle = '#ffffff';
            } else {
                rtx.fillStyle = '#616161';
            }

            rtx.textBaseline = 'middle';
            rtx.font = '16px sans-serif';
            rtx.textAlign = 'right';
            rtx.fillText(row.index + 1, rhw - 5, y + row.height / 2);
            y += row.height;
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

    colHeaderInitStyle(colHeaderCanvas) {
        const dpr = this.dataController.getDPR();
        colHeaderCanvas.width = this.dataController.getColsTotalWidth() * dpr;
        colHeaderCanvas.height = this.dataController.getChh() * dpr;
        colHeaderCanvas.style.left = `${this.dataController.getRhw() + this.dataController.getLeft()}px`;
        colHeaderCanvas.style.top = `${this.dataController.getTop()}px`;
        colHeaderCanvas.style.width = `${this.dataController.getColsTotalWidth()}px`;
        colHeaderCanvas.style.height = `${this.dataController.getChh()}px`;
    }

    colHeaderRender() {
        const colHeaderCanvas = this.dataController.getColCanvas();
        this.colHeaderInitStyle(colHeaderCanvas);

        const ctx = this.dataController.getCtx();
        const dpr = this.dataController.getDPR();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, colHeaderCanvas.width, colHeaderCanvas.height);

        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, this.dataController.getColsTotalWidth(), this.dataController.getChh());

        let x = -this.dataController.getStOffCol();
        const [first, last] = this.dataController.getAdjustedSelectedRange();
        const visibleCols = this.dataController.getVisibleCols();

        const colResize = this.dataController.getColResize();
        // const adjustedCellRange = this.dataController.getAdjustedSelectedRange();
        // const first = adjustedCellRange[0];
        // const last = adjustedCellRange[1];

        //console.log('x',x);

        for (const col of visibleCols) {
            const isSelected = !colResize && col.index >= first.col && col.index <= last.col;

            ctx.beginPath();
            ctx.moveTo(Math.floor(x) + 0.5, 10);
            ctx.lineTo(Math.floor(x) + 0.5, this.dataController.getChh());
            ctx.strokeStyle = '#e0e0e0';
            ctx.stroke();

            if (isSelected && !this.dataController.getColSelected()) {
                ctx.fillStyle = 'rgba(0, 200, 0, 0.10)';
                ctx.fillRect(x, 0, col.width, this.dataController.getChh());
                ctx.fillStyle = '#616161';
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.moveTo(Math.floor(x) - 0.5, this.dataController.getChh());
                ctx.lineTo(Math.floor(x) + col.width + 0.5, this.dataController.getChh());
                ctx.strokeStyle = 'rgb(16,124,65)';
                ctx.stroke();
            } else if (isSelected && this.dataController.getColSelected()) {
                ctx.fillStyle = 'rgb(16,124,65)';
                ctx.fillRect(x, 0, col.width, this.dataController.getChh());
                ctx.fillStyle = '#ffffff';
            } else {
                ctx.fillStyle = '#616161';
            }

            ctx.textBaseline = 'middle';
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(
                this.indexToColumnLabel(col.index),
                x + col.width / 2,
                this.dataController.getChh() / 2 + 5
            );
            x += col.width;
        }
    }

    drawGrid() {
        const dpr = this.dataController.getDPR();
        const gridCanvas = this.dataController.getGridCanvas();

        gridCanvas.width = this.dataController.getColsTotalWidth() * dpr;
        gridCanvas.height = this.dataController.getRowsTotalHeight() * dpr;
        gridCanvas.style.left = `${this.dataController.getRhw() + this.dataController.getLeft()}px`;
        gridCanvas.style.top = `${this.dataController.getChh() + this.dataController.getTop()}px`;
        gridCanvas.style.width = `${this.dataController.getColsTotalWidth()}px`;
        gridCanvas.style.height = `${this.dataController.getRowsTotalHeight()}px`;

        const gtx = this.dataController.getGtx();
        gtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        gtx.clearRect(0, 0, this.dataController.getColsTotalWidth(), this.dataController.getRowsTotalHeight());
        gtx.lineWidth = 1;
        gtx.strokeStyle = '#e0e0e0';

        let y = -this.dataController.getStOffRow();
        gtx.beginPath();
        gtx.moveTo(0, Math.floor(y) + 0.5);
        gtx.lineTo(this.dataController.getColsTotalWidth(), Math.floor(y) + 0.5);
        gtx.stroke();

        for (const row of this.dataController.getVisibleRows()) {
            y += row.height;
            gtx.beginPath();
            gtx.moveTo(0, Math.floor(y) + 0.5);
            gtx.lineTo(this.dataController.getColsTotalWidth(), Math.floor(y) + 0.5);
            gtx.stroke();
        }

        let x = -this.dataController.getStOffCol();
        gtx.beginPath();
        gtx.moveTo(Math.floor(x) + 0.5, 0);
        gtx.lineTo(Math.floor(x) + 0.5, this.dataController.getRowsTotalHeight());
        gtx.stroke();

        for (const col of this.dataController.getVisibleCols()) {
            x += col.width;
            gtx.beginPath();
            gtx.moveTo(Math.floor(x) + 0.5, 0);
            gtx.lineTo(Math.floor(x) + 0.5, this.dataController.getRowsTotalHeight());
            gtx.stroke();
        }
    }

    handleScroll(scrollLeft, scrollTop) {
        ////////console.log('scroll',scrollLeft, scrollTop);
        this.dataController.setScroll(true);
        this.dataController.setTop(scrollTop);
        this.dataController.setLeft(scrollLeft);

        this.adjustHeights();
        requestAnimationFrame(() => this.render());
        //console.log(this.dataController.getVisibleCols());
        this.dataController.setScroll(false);
    }

    handleResize(window, newHeight, newWidth) {
        this.dataController.setWih(newHeight);
        this.dataController.setWiw(newWidth);
        this.dataController.setWindow(window);
        // this.dataController.setDPR(window.)
        this.dataController.getCanvasWrapper().style.height = `${this.dataController.getWih() * 1.5}px`;
        this.dataController.getCanvasWrapper().style.width = `${this.dataController.getWiw() * 1.5}px`;
        this.adjustHeights();
        requestAnimationFrame(() => this.render());
    }

    adjustHeights() {
        this.dataController.getRowCanvas().style.height = `${this.dataController.getRowsTotalHeight()}px`;
        this.dataController.getGridCanvas().style.height = `${this.dataController.getRowsTotalHeight()}px`;
        this.dataController.getGridCanvas().style.width = `${this.dataController.getColsTotalWidth()}px`;
        this.dataController.getColCanvas().style.width = `${this.dataController.getColsTotalWidth()}px`;
    }


    gridSelection() {
        const adjustedCellSelection = this.dataController.getAdjustedSelectedRange();
        let x = this.dataController.getPrefixCols()[adjustedCellSelection[0].col] - this.dataController.getLeft();
        let y = this.dataController.getPrefixRows()[adjustedCellSelection[0].row] - this.dataController.getTop();
        let h = this.dataController.getPrefixRows()[adjustedCellSelection[1].row + 1] - this.dataController.getTop();
        let w = this.dataController.getPrefixCols()[adjustedCellSelection[1].col + 1] - this.dataController.getLeft();
        // //console.log(adjustedCellSelection);
        const topxSelection = x;
        const topySelection = y;

        let rowSelected = this.dataController.getRowSelected();
        let colSelected = this.dataController.getColSelected();

        // //////console.log('selection', x, y, h, w);
        // ////////////console.log(this.dataController.getActionType());
        const heightSelection = colSelected ? Number.MAX_SAFE_INTEGER : h - y;
        const widthSelection = rowSelected ? Number.MAX_SAFE_INTEGER : w - x;

        // heightSelection += 
        // adjustedCellSelection[0].row==-1?()=>{}:////////console.log(adjustedCellSelection, widthSelection);

        const gtx = this.dataController.getGtx();
        gtx.fillStyle = 'rgba(0, 200, 0, 0.10)';
        gtx.fillRect(topxSelection, topySelection, widthSelection, heightSelection);
        gtx.strokeStyle = 'rgb(16,124,65)';
        gtx.lineWidth = 2;
        gtx.beginPath();
        gtx.moveTo(topxSelection - 1, topySelection);
        gtx.lineTo(topxSelection + widthSelection, topySelection);
        gtx.lineTo(topxSelection + widthSelection, topySelection + heightSelection);
        gtx.lineTo(topxSelection, topySelection + heightSelection);
        gtx.lineTo(topxSelection, topySelection);
        gtx.stroke();

        const editCell = this.dataController.getEditCell();
        const r = editCell.row;
        const c = editCell.col;
        const editCellX = this.dataController.getPrefixCols()[c];
        const editCellY = this.dataController.getPrefixRows()[r];

        gtx.fillStyle = "white";
        gtx.fillRect(
            editCellX - this.dataController.getLeft() + 2,
            editCellY - this.dataController.getTop() + 2,
            (this.dataController.getCols()[c]?.width || this.dataController.getDcw()) - 4,
            (this.dataController.getRows()[r]?.height || this.dataController.getDrh()) - 4
        );

        gtx.closePath();
    }


    editCellInput() {
        const r = this.dataController.getEditCell().row;
        const c = this.dataController.getEditCell().col;
        let prefixRow = this.dataController.getPrefixRows()[r];
        let prefixCol = this.dataController.getPrefixCols()[c];
        let endRow = this.dataController.getPrefixRows()[r + 1];
        let endCol = this.dataController.getPrefixCols()[c + 1];
        let top = this.dataController.getTop();
        let left = this.dataController.getLeft();
        // console.log('PRT', prefixRow - top , this.dataController.getChh());
        if (
            r === -1 ||
            c === -1 ||
            prefixRow - top < 0 ||
            prefixCol + this.dataController.getRhw() < this.dataController.getLeft() ||
            endRow + this.dataController.getChh() >= this.dataController.getWih() + this.dataController.getTop() ||
            endCol + this.dataController.getRhw() >= this.dataController.getWiw() + this.dataController.getLeft()
        ) {
            // console.log('RETURNING');
            return null;
        }
        this.dataController.setInputValue(this.dataController.getDataHandler().getAt(r, c));
        // this.dataController.getInput().value = this.dataController.getDataHandler().getAt(r, c);
        const input = this.dataController.getInput();

        input.setAttribute("id", "cellEdit");
        input.style.position = "absolute";
        input.style.left = `${this.dataController.getPrefixCols()[c] + 2 + this.dataController.getRhw()}px`;
        input.style.top = `${this.dataController.getPrefixRows()[r] + 2 + this.dataController.getChh()}px`;
        input.style.height = `${this.dataController.getRows()[r].height - 4}px`;
        input.style.width = `${this.dataController.getCols()[c].width - 4}px`;
        input.style.zIndex = 10;
        input.style.border = "none";
        input.style.outline = "none";

        this.dataController.getCanvasWrapper().appendChild(input);
        input.focus();
    }

    drawData() {
        let visibleRows = this.dataController.getVisibleRows();
        let visibleCols = this.dataController.getVisibleCols();
        let prefixCols = this.dataController.getPrefixCols();
        let prefixRows = this.dataController.getPrefixRows();
        let left = this.dataController.getLeft();
        let top = this.dataController.getTop();
        let gtx = this.dataController.getGtx();
        for (let row of visibleRows) {
            ////////console.log('suuuu', row.index);
            ////////console.log(rowData, "for ", row.index)
            const rowData = this.dataController.getDataHandler().getRowData(row.index);
            if (rowData == null) { ////////console.log('coninute'); 
                continue;
            }

            for (let col of visibleCols) {
                gtx.fillStyle = '#616161';
                gtx.textBaseline = 'middle';
                gtx.font = '14px sans-serif';
                gtx.textAlign = 'left';
                let cellData = rowData.get(col.index);
                // ////////console.log()
                gtx.fillText(cellData ? cellData.getContent() : '', prefixCols[col.index] - left + 4, prefixRows[row.index] - top + row.height / 2, col.width);
            }
        }
    }

    onHeaderHover() {
        let onRowIdx = this.dataController.getOnRowIdx();
        let onColIdx = this.dataController.getOnColIdx();
        if (onRowIdx != -1) {
            let start = this.dataController.getEndOfRow(onRowIdx) - this.dataController.getTop();
            let end = this.dataController.getEndOfRow(onRowIdx + 1) - this.dataController.getTop();

            let rtx = this.dataController.getRtx();
            // //console.log('s   tart-end', start, end);
            rtx.beginPath();
            rtx.arc(10, start, 3, 0, 2 * Math.PI);
            rtx.lineWidth = 1;
            rtx.strokeStyle = 'rgb(16,124,65)';
            // rtx.
            rtx.stroke();

            rtx.beginPath();
            rtx.arc(10, end, 3, 0, 2 * Math.PI);
            rtx.lineWidth = 1;
            rtx.strokeStyle = 'rgb(16,124,65)';
            // rtx.
            rtx.stroke();

        } else if (onColIdx != -1) {
            let start = this.dataController.getEndOfCol(onColIdx) - this.dataController.getLeft();
            let end = this.dataController.getEndOfCol(onColIdx + 1) - this.dataController.getLeft();

            let ctx = this.dataController.getCtx();
            // //console.log('start-end', start, end);
            ctx.beginPath();
            ctx.arc(start, 10, 3, 0, 2 * Math.PI);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgb(16,124,65)';
            // ctx.
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(end, 10, 3, 0, 2 * Math.PI);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgb(16,124,65)';
            // ctx.
            ctx.stroke();
        }
    }

    handleAutoScroll(dir) {
        if (dir == 'row') {
            this.handleScroll(this.dataController.getLeft(), this.dataController.getTop() + 20);
            this.dataController.setAutoScroll(false);
            this.dataController.getOuterContainer().scrollBy(0, +20);
            return null;
        }else{
            this.handleScroll(this.dataController.getLeft() + 20, this.dataController.getTop());
            this.dataController.setAutoScroll(false);
            this.dataController.getOuterContainer().scrollBy(+20, 0);
            return null;
        }
    }

    render() {
        if (this.dataController.getAutoScroll()) {
            this.handleAutoScroll(this.dataController.getAutoScrollDirection());
        }
        this.dataController.calculateVisibleCols();
        this.dataController.calculateVisibleRows();
        this.drawGrid();
        this.rowHeaderRender();
        this.colHeaderRender();
        this.gridSelection();
        this.editCellInput();
        this.drawData();
        this.onHeaderHover();
    }
}