import {Cell} from './Cell.js';

class Data{
    constructor(){
        this.data = new Map();
    };

    addAt(rowIdx, colIdx, val=''){
        let rowInfo = this.data.get(rowIdx);
        rowInfo == null? rowInfo = new Map():()=>{};
        let cell = rowInfo.get(colIdx);
        cell==null? rowInfo.set(colIdx, new Cell(val)):cell.edit(val);
    }

    
}