import { TouchHandler } from './Components/Handlers/TouchHandler.js'
import { DataController } from './Components/Data/DataController.js';
import { RenderHandler } from './Components/Handlers/RenderHandler.js';
import { ColResize, RowResize } from './Actions//ActionsControllers/Resize.js';
import { RowSelection, ColSelection, RangeSelection } from './Actions/ActionsControllers/Selection.js';
import { AddRow, AddCol } from './Actions/ActionsControllers/Add.js';
import { PointerEventHandler } from './Components/EventHandlers/PointerEventHandler.js';
import { ResizeScrollHandler } from './Components/EventHandlers/ResizeScrollHandler.js';
import { KeyboardHandler } from './Components/EventHandlers/KeyboardHandler.js';

export class Excel {
    constructor(document, body) {
        this.document = document;
        ////console.log('hey');
        this.body = body;
        this.init();
    }

    init() {
        let document = this.document;
        ////console.log('hey', document);
        console.log( document.getElementById("bottomBar"));
        this.dataController = new DataController(document.getElementById('outerContainer'), document.getElementById('canvasWrapper'), document.getElementById('gridCanvas'), document.getElementById('rowHeaderCanvas'), document.getElementById('colHeaderCanvas'), window, 0, document.getElementById("bottomBar"));
        // let renderData = new RenderData();
        let dataController = this.dataController;
        const touchHandler = new TouchHandler(dataController);
        this.renderHandler = new RenderHandler(dataController);
        let renderHandler = this.renderHandler;

        touchHandler.registerHandler(new RowResize(dataController));
        touchHandler.registerHandler(new ColResize(dataController));
        touchHandler.registerHandler(new AddRow(dataController));
        touchHandler.registerHandler(new AddCol(dataController));
        touchHandler.registerHandler(new RowSelection(dataController));
        touchHandler.registerHandler(new ColSelection(dataController));
        touchHandler.registerHandler(new RangeSelection(dataController));

        renderHandler.render();

        let pointerEventHandler = new PointerEventHandler(touchHandler, renderHandler, window);
        let resizeScrollHandler = new ResizeScrollHandler(touchHandler, renderHandler, window, outerContainer);
        let keyboardHandler = new KeyboardHandler(touchHandler, renderHandler, document);

        this.components = [touchHandler, renderHandler, pointerEventHandler, resizeScrollHandler, keyboardHandler];
    }

    changeDataController(dataController) {
        this.dataController = dataController;
        for (let component of this.components) {
            component.changeDataController(dataController);
        }

        this.renderHandler.render();
    }
}




