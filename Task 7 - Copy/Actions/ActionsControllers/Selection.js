export class RowSelection {
    constructor(dataController) {
        this.dataController = dataController;
    }

    pointerDown(e) {
        const pointerY = e.clientY;
        let selectedCellRange = [];
        selectedCellRange[0] = { row: this.dataController.getRow(pointerY), col: 0 };
        selectedCellRange[1] = { row: selectedCellRange[0].row, col: this.dataController.getCols().length - 1 };
        ////console.log(selectedCellRange);
        // this.dataController.
        this.dataController.setEditCell(selectedCellRange[0]);

        this.dataController.setSelectedCellRange(selectedCellRange);
        this.dataController.setActionType('row-select');

        // this.dummy = new Edit(selectedCellRange);

    }

    pointerMove(e) {
        let pointerY = e.clientY;

        let selectedCellRange = this.dataController.getSelectedCellRange();
        selectedCellRange[1] = { row: this.dataController.getRow(pointerY), col: this.dataController.getCols().length - 1 };

        // this.dataController.setOnRow()
    }

    pointerUp(e) {
        let pointerY = e.clientY;

        let selectedCellRange = this.dataController.getSelectedCellRange();
        selectedCellRange[1] = { row: this.dataController.getRow(pointerY), col: this.dataController.getCols().length - 1 };
        // return this.dummy;
    }

    hitTest(e) {
        if (e.clientX >= 0 && e.clientX <= this.dataController.getRhw() && e.clientY >= this.dataController.getChh() && e.clientY <= this.dataController.getWih()) {
            // //console.log('rowOver',);
            this.dataController.setOnRow(this.dataController.getRow(e.clientY));
            return true;
        }
    }

    setCursor() {
        this.dataController.setCursor('row-select');
    }
}

export class ColSelection {
    constructor(dataController) {
        this.dataController = dataController;
    }
    pointerDown(e) {
        const pointerX = e.clientX;
        let selectedCellRange = [];
        selectedCellRange[0] = { row: 0, col: this.dataController.getCol(pointerX) };
        selectedCellRange[1] = { row: this.dataController.getRows().length - 1, col: selectedCellRange[0].col };

        this.dummy = this.dataController.setEditCell(selectedCellRange[0]);
        this.dataController.setSelectedCellRange(selectedCellRange);
        this.dataController.setActionType('col-select');

    }

    pointerMove(e) {
        const pointerX = e.clientX;
        let selectedCellRange = this.dataController.getSelectedCellRange();

        selectedCellRange[1] = { row: this.dataController.getRows().length - 1, col: this.dataController.getCol(pointerX) };
        this.dataController.setSelectedCellRange(selectedCellRange);
    }

    pointerUp(e) {
        const pointerX = e.clientX;
        let selectedCellRange = this.dataController.getSelectedCellRange();

        selectedCellRange[1] = { row: this.dataController.getRows().length - 1, col: this.dataController.getCol(pointerX) };
        this.dataController.setSelectedCellRange(selectedCellRange);
        // return this.dummy;
        //////console.log(selectedCellRange);
    }

    hitTest(e) {
        if (e.clientX >= this.dataController.getRhw() && e.clientX <= this.dataController.getWiw() && e.clientY >= 0 && e.clientY <= this.dataController.getChh()) {
            this.dataController.setOnCol(this.dataController.getCol(e.clientX));
            return true;
        }
    }

    setCursor(e) {
        this.dataController.setCursor('col-select');
    }
}

export class RangeSelection {
    constructor(dataController) {
        this.dataController = dataController;
    }

    pointerDown(e) {
        const pointerX = e.clientX;
        const pointerY = e.clientY;

        this.dataController.editCell = { row: -1, cell: -1 };

        ////console.log('poionts',pointerY + this.dataController.getTop() - this.dataController.getChh(), this.dataController.getPrefixRows()[40]);
        let selectedCellRange = [];
        selectedCellRange[0] = { row: this.dataController.getRow(pointerY), col: this.dataController.getCol(pointerX) };
        selectedCellRange[1] = selectedCellRange[0];
        ////console.log(selectedCellRange);
        this.dummy = this.dataController.setEditCell(selectedCellRange[0]);
        this.dataController.setSelectedCellRange(selectedCellRange);
        this.dataController.setActionType('select');

    }

    pointerMove(e) {
        const pointerX = e.clientX;
        const pointerY = e.clientY;
        let selectedCellRange = this.dataController.getSelectedCellRange();

        selectedCellRange[1] = { row: this.dataController.getRow(pointerY), col: this.dataController.getCol(pointerX) };
    }

    pointerUp(e) {
        const pointerX = e.clientX;
        const pointerY = e.clientY;

        let selectedCellRange = this.dataController.getSelectedCellRange();
        selectedCellRange[1] = { row: this.dataController.getRow(pointerY), col: this.dataController.getCol(pointerX) };

        // return this.dummy;
    }

    hitTest(e) {
        if (e.clientX >= this.dataController.getRhw() && e.clientY >= this.dataController.getChh()) {
            this.dataController.setOnRow(-1);
            return true;
        }
    }

    setCursor() {
        this.dataController.setCursor('cell');
    }
}