export class DataFunctions {
    constructor(selectedCellRange, dataHandler) {
        this.selectedCellRange = selectedCellRange;
        this.dataHandler = dataHandler;
        this.allData = new Map();
        this.init();
    }

    init() {
        ////////console.log(this.allData);
        for (let i = this.selectedCellRange[0].col; i <= this.selectedCellRange[1].col; i++) {
            let count = null;
            let sum = null;
            let avg = null;
            let max = null;
            let min = null;
            for (let j = this.selectedCellRange[0].row; j <= this.selectedCellRange[1].row; j++) {

                let num = parseInt(this.dataHandler.getAt(j, i));
                ////////console.log('at ', i, j, this.dataHandler.getAt(i, j));
                if (num) {
                    count ? count++ : count = 1;
                    sum ? sum += num : sum = num;
                    if (!max || max <= num) max = num;
                    if (!min || min >= num) min = num;
                }
            }
            (sum && count) ? avg = sum / count : () => { };
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
        ////////console.log('allData', this.allData);
    }

    getFormulatedData() {
        return this.allData;
    }

    getCumulativeData() {
        let cumulativeData = new Map();
        let sum = cumulativeData.get('sum');
        let count = cumulativeData.get('count');
        let avg = cumulativeData.get('avg');
        let min = cumulativeData.get('min');
        let max = cumulativeData.get('max');
        for (const [key, value] of this.allData) {


            let colData = value;
            console.log(typeof(colData));
            if (typeof(colData)!='object') continue;
            console.log('cd',colData);
            colData.get('sum') ? sum ? sum += colData.get('sum') : sum = colData.get('sum') : () => { };
            colData.get('count') ? count ? count += colData.get('count') : count = colData.get('count') : () => { };
            colData.get('avg') ? avg ? avg += colData.get('avg') : avg = colData.get('avg') : () => { };
            colData.get('min') ? min ? min += colData.get('min') : min = colData.get('min') : () => { };
            colData.get('max') ? max ? max += colData.get('max') : max = colData.get('max') : () => { };
        }

        cumulativeData.set('sum', sum);
        cumulativeData.set('count', count);
        cumulativeData.set('avg', avg);
        cumulativeData.set('min', min);
        cumulativeData.set('max', max);

        return cumulativeData;
    }

}