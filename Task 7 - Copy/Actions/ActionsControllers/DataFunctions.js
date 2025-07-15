export class DataFunctions {
    constructor(selectedCellRange, dataHandler) {
        this.selectedCellRange = selectedCellRange;
        this.dataHandler = dataHandler;
        this.allData = new Map();
        this.init();
    }

    init() {
        ////console.log(this.allData);
        for (let i = this.selectedCellRange[0].col; i <= this.selectedCellRange[1].col; i++) {
            let count = 0;
            let sum = 0;
            let avg = 0;
            let max = Number.MIN_VALUE;
            let min = Number.MAX_VALUE;
            for (let j = this.selectedCellRange[0].row; j <= this.selectedCellRange[1].row; j++) {

                let num = parseInt(this.dataHandler.getAt(j, i));
                ////console.log('at ', i, j, this.dataHandler.getAt(i, j));
                if (num) {
                    count++;
                    sum += num;
                    if (max <= num) max = num;
                    if (min >= num) min = num;
                }
            }
            avg = sum / count;
            let colData = new Map();
            colData.set('sum', sum);
            colData.set('avg', avg);
            colData.set('min', min);
            colData.set('max', max);
            colData.set('count', count);

            this.allData.set(i, colData);

        }
        let firstCol = this.selectedCellRange[0].col;
        this.allData.set('firstCol', firstCol);
        this.allData.set('lastCol', this.selectedCellRange[1].col);
        this.allData.set('firstRow', this.selectedCellRange[0].row);
        this.allData.set('lastRow', this.selectedCellRange[1].row);
        ////console.log('allData', this.allData);
    }

    getFormulatedData() {
        return this.allData;
    }

}