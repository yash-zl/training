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
    constructor(document) {
        this.document = document;
        console.log('hey');
        this.init();
    }

    init() {
        let document = this.document;
        let outerContainer = document.getElementById('outerContainer');
        let dataController = new DataController(outerContainer, document.getElementById('canvasWrapper'), document.getElementById('gridCanvas'), document.getElementById('rowHeaderCanvas'), document.getElementById('colHeaderCanvas'), window);
        // let renderData = new RenderData();
        const touchHandler = new TouchHandler(dataController);
        const renderHandler = new RenderHandler(dataController);

        touchHandler.registerHandler(new RowResize(dataController));
        touchHandler.registerHandler(new ColResize(dataController));
        touchHandler.registerHandler(new AddRow(dataController));
        touchHandler.registerHandler(new AddCol(dataController));
        touchHandler.registerHandler(new RowSelection(dataController));
        touchHandler.registerHandler(new ColSelection(dataController));
        touchHandler.registerHandler(new RangeSelection(dataController));
        // touchHandler.registerHandler(new Edit(dataController));

        renderHandler.render();

        let pointerEventHandler = new PointerEventHandler(touchHandler, renderHandler, dataController, window);
        let resizeScrollHandler = new ResizeScrollHandler(touchHandler, renderHandler, dataController, window, outerContainer);
        let keyboardHandler = new KeyboardHandler(touchHandler, renderHandler, dataController, document);
    }
}




