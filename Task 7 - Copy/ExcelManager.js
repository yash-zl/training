import { Excel } from './Excel.js';
import { DataController } from './Components/Data/DataController.js';


export class ExcelManager {
    constructor(document) {
        this.document = document;
        this.excelDataControllers = [];
        this.body = document.body;
        this.sheets = 0;
        this.excel = new Excel(this.document, null);
        this.init();
    }

    init() {
        // ////console.log(this.document);
        // this.sheets++;
        // let dataController = new DataController(this.document.getElementById('outerContainer'), this.document.getElementById('canvasWrapper'), this.document.getElementById('gridCanvas'), this.document.getElementById('rowHeaderCanvas'), this.document.getElementById('colHeaderCanvas'), window, this.sheets, this.document.getElementById('bottomBar'));
        // this.excelDataControllers.push(dataController);
        this.addSheet();
        this.activate(1);
        // excel.active(true);
    }


    addSheet() {
        this.sheets++;
        console.log(this.sheets);
        let dataController = new DataController(this.document.getElementById('outerContainer'), this.document.getElementById('canvasWrapper'), this.document.getElementById('gridCanvas'), this.document.getElementById('rowHeaderCanvas'), this.document.getElementById('colHeaderCanvas'), window, this.sheets, this.document.getElementById('bottomBar'));
        this.excelDataControllers.push(dataController);
        this.activate(this.sheets);

        let sheetButton = this.document.createElement('button');
        sheetButton.setAttribute('id', this.sheets+'');
        const sheetNum = this.sheets;
        sheetButton.innerText = this.sheets+"";
        sheetButton.addEventListener('pointerdown', ()=>{
            // console.log(this.sheets);
            // console.log()
            this.activate(sheetButton.getAttribute('id'));
        })

        this.document.getElementById('sheets').appendChild(sheetButton);

        return dataController;
    }

    activate(val) {
        val = parseInt(val);
        if (val > this.sheets) return null;
        ////console.log('activating ', this.excelDataControllers[val-1]);
        let allInputs = this.document.getElementsByClassName('cellEdit');
        //console.log(allInputs);
        for (let input of allInputs) {
            if (parseInt(input.getAttribute('id')) != val) {
                input.style.display = "none";
            } else {
                input.style.display = "inline-block";
            }
        }
        this.excel.changeDataController(this.excelDataControllers[val - 1]);

    }



}