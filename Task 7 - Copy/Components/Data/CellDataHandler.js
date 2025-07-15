import { Cell } from '../Base Components/Cell.js';

export class CellDataHandler {
    constructor() {
        this.data = new Map();
    };

    getData(){
        return this.data;
    }

    addAt(rowIdx, colIdx, val = '') {
        // ////////console.log(val, rowIdx, colIdx);
        let rowInfo = this.data.get(rowIdx);

        rowInfo == null ? rowInfo = new Map() : () => { };
        let cell = rowInfo.get(colIdx);
        cell == null ? rowInfo.set(colIdx, new Cell(val)) : cell.edit(val);

        this.data.set(rowIdx, rowInfo);
    }

    getAt(rowIdx, colIdx) {
        if (this.data.get(rowIdx) == null) return '';
        else return this.data.get(rowIdx).get(colIdx) ? this.data.get(rowIdx).get(colIdx).getContent() : '';
    }

    getRowData(rowIdx) {
        return this.data.get(rowIdx);
    }

    addRow(rowIdx, map, type = '') {
        const keys = Object.keys(map);
        if (type == 'fileOnScroll') {
            if (this.data.get(rowIdx) == null) {
                for (let i = 0; i < keys.length; i++) {
                    this.addAt(rowIdx, i, map[keys[i]]);
                }
            }
        }
    }

    handleAddRowAt(idx) {
        ////console.log(this.data);
        let newData = new Map();
        for (const [key, value] of this.data) {
            if (key >= idx) {
                newData.set(key + 1, value);
                this.data.delete(key);
            } else {
                newData.set(key, value);
                this.data.delete(key);
            }
        }

        this.data = newData;

        // ////console.log(rows);
        // for(let row of rows){
        //     ////console.log(row);
        // }
    }

    handleRemoveRowAt(idx) {
        let newData = new Map();

        for (const [key, value] of this.data) {
            if (key >= idx) {
                newData.set(key - 1, value);
            } else {
                newData.set(key, value);
            }

            this.data.delete(key);
        }

        this.data = newData;
    }

    handleAddColAt(idx) {

        for (const [key, value] of this.data) {
            let newRowData = new Map();

            for (const [k, v] of this.data.get(key)) {
                if (k >= idx) {
                    newRowData.set(k + 1, v);
                } else {
                    newRowData.set(k, v);
                }
                this.data.get(key).delete(k);
            }
            this.data.set(key, newRowData);
        }

        ////console.log(this.data);
    }

    handleRemoveColAt(idx) {
        for (const [key, value] of this.data) {
            let newRowData = new Map();
            for (const [k, v] of this.data.get(key)) {
                if (k >= idx) {
                    newRowData.set(k - 1, v);
                } else {
                    newRowData.set(k, v);
                }
                this.data.get(key).delete(k);
            }
            this.data.set(key, newRowData);
        }

        ////console.log(this.data);
    }

    pushWhereSpace(data, dataFunction) {
        let firstCol = data.get('firstCol');
        let lastCol = data.get('lastCol');
        let firstRow = data.get('firstRow');
        let lastRow = data.get('lastRow');
        ////console.log(firstCol, lastCol, lastRow);
        let pushAtRow = this.determineFirstFreeRow(lastRow, firstCol, lastCol);
        ////console.log('push',pushAtRow);
        for(let j = firstCol; j<= lastCol; j++){
            ////console.log('col',j,  data.get(j));
            this.addAt(pushAtRow, j, ''+ data.get(j).get(dataFunction));
        }

        return [pushAtRow, firstCol, lastCol];
    }

    determineFirstFreeRow(lastRow, firstCol, lastCol) {
        for (let i = lastRow; i > 0; i++) {
            let empty = 0;
            ////console.log('rowData'+this.data.get(i));
            if (!this.data.get(i)) return i;
            for (let j = firstCol; j <= lastCol; j++) {
                if (this.getAt(i, j) == '') empty++;
                else break;
            }
            if(empty == lastCol - firstCol + 1){
                return i;
            }
        }
        return lastRow + 1;
    }

    removeRowData(rowIdx, startCol, endCol){
        let rowData = new Map();
        for(let i = startCol; i<=endCol; i++){
            rowData.set(i, this.data.get(rowIdx).get(i));
            this.data.get(rowIdx).delete(i);
        }
        return rowData;
    }

    addRowData(rowIdx, startCol, endCol, data){
        this.data.set(rowIdx, data);
    }
}