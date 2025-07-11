import { TouchHandler } from './Components/Handlers/TouchHandler.js'
import { DataController } from './Components/Data/DataController.js';
import { RenderHandler } from './Components/Handlers/RenderHandler.js';
import { ColResize, RowResize } from './Actions/Resize.js';
import { RowSelection, ColSelection, RangeSelection } from './Actions/Selection.js';
import { Edit } from './Actions/Edit.js';

// import { DataController } from './Components/DataController.js';
let outerContainer = document.getElementById('outerContainer');
let canvasWrapper = document.getElementById('canvasWrapper');
let gridCanvas = document.getElementById('gridCanvas');
let rowHeaderCanvas = document.getElementById('rowHeaderCanvas');
let colHeaderCanvas = document.getElementById('colHeaderCanvas');
let cursor = document.getElementById('customCursor');

console.log(outerContainer, canvasWrapper, gridCanvas, rowHeaderCanvas, colHeaderCanvas);
// let renderData = new Data();
let dataController = new DataController(outerContainer, document.getElementById('canvasWrapper'), document.getElementById('gridCanvas'), document.getElementById('rowHeaderCanvas'), document.getElementById('colHeaderCanvas'), window, cursor);
// let renderData = new RenderData();
const touchHandler = new TouchHandler(dataController);
const renderHandler = new RenderHandler(dataController);

touchHandler.registerHandler(new RowResize(dataController));
touchHandler.registerHandler(new ColResize(dataController));
touchHandler.registerHandler(new RowSelection(dataController));
touchHandler.registerHandler(new ColSelection(dataController));
touchHandler.registerHandler(new RangeSelection(dataController));
touchHandler.registerHandler(new Edit(dataController));

renderHandler.render();

window.addEventListener('pointermove', (e) => {
    touchHandler.pointerMove(e);
    renderHandler.render();
})

window.addEventListener('pointerup', (e) => {
    touchHandler.pointerUp(e);
    renderHandler.render();
})

window.addEventListener('pointerdown', (e) => {
    touchHandler.pointerDown(e);
    renderHandler.render();
})

window.addEventListener('resize', ()=>{
    renderHandler.handleResize(window, window.innerHeight, window.innerWidth);
    renderHandler.render();
})

outerContainer.addEventListener('scroll', ()=>{
    // console.log('scrolling');
    renderHandler.handleScroll(outerContainer.scrollLeft, outerContainer.scrollTop);
    renderHandler.render();
})