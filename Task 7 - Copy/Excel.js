import { TouchHandler } from './Components/Handlers/TouchHandler.js'
import { DataController } from './Components/Data/DataController.js';
import { RenderHandler } from './Components/Handlers/RenderHandler.js';
import { ColResize, RowResize } from './Actions//ActionsControllers/Resize.js';
import { RowSelection, ColSelection, RangeSelection } from './Actions/ActionsControllers/Selection.js';
import { AddRow, AddCol } from './Actions/ActionsControllers/Add.js';
// import { Edit } from './Actions/Edit.js';

// import { DataController } from './Components/DataController.js';
let outerContainer = document.getElementById('outerContainer');
let canvasWrapper = document.getElementById('canvasWrapper');
let gridCanvas = document.getElementById('gridCanvas');
let rowHeaderCanvas = document.getElementById('rowHeaderCanvas');
let colHeaderCanvas = document.getElementById('colHeaderCanvas');
let cursor = document.getElementById('customCursor');

////console.log(outerContainer, canvasWrapper, gridCanvas, rowHeaderCanvas, colHeaderCanvas);
// let renderData = new Data();
let dataController = new DataController(outerContainer, document.getElementById('canvasWrapper'), document.getElementById('gridCanvas'), document.getElementById('rowHeaderCanvas'), document.getElementById('colHeaderCanvas'), window, cursor);
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

window.addEventListener('pointermove', (e) => {
    touchHandler.pointerMove(e);
    renderHandler.render();
})

window.addEventListener('pointerup', (e) => {
    let action = touchHandler.pointerUp(e);
    ////console.log('returned',action);
    action?dataController.undoStackPush(action):()=>{};
    ////console.log('stack',dataController.undoStack);
    renderHandler.render();
})

window.addEventListener('pointerdown', (e) => {
    touchHandler.pointerDown(e);
    renderHandler.render();
})

window.addEventListener('resize', () => {
    renderHandler.handleResize(window, window.innerHeight, window.innerWidth);
    renderHandler.render();
})

outerContainer.addEventListener('scroll', () => {
    // ////console.log('scrolling');
    renderHandler.handleScroll(outerContainer.scrollLeft, outerContainer.scrollTop);
    renderHandler.render();
});

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'z') {
        ////console.log('Undo shortcut triggered');
        if (dataController.getUndoStackLength() == 0) return;
        else {
            let action = dataController.undoStackPop();
            ////console.log('undo',action);
            dataController.redoStackPush(action);
            action.undo();
        }
        renderHandler.render();
    } else if (e.ctrlKey && e.key.toLowerCase() == 'y') {
        ////console.log('Redo');
        if (dataController.getRedoStackLength() == 0) return;
        let action = dataController.redoStackPop();
        action.redo();
        dataController.undoStackPush(action, 'post-redo');
        renderHandler.render();
    }
});
