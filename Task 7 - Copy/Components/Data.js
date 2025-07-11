import { Cell } from './Cell.js';

export class Data {
    constructor() {
        this.data = new Map();
    };

    addAt(rowIdx, colIdx, val = '') {
        // console.log(val, rowIdx, colIdx);
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

}