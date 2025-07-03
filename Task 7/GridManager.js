import { Grid } from './Components/Grid.js';

var gridCanvas = document.getElementById('grid');
var rowHeaderCanvas = document.getElementById("row-header");
var colHeaderCanvas = document.getElementById("col-header");
var outer_container = document.getElementById('outer-container');
var canvasWrapper = document.getElementById('canvas-wrapper');


const gridObj = new Grid(outer_container, canvasWrapper, gridCanvas, rowHeaderCanvas, colHeaderCanvas, gridCanvas.getContext('2d'), rowHeaderCanvas.getContext("2d"), colHeaderCanvas.getContext("2d"), window, window.innerHeight, window.innerWidth);
outer_container.addEventListener('scroll', (e) => {
    // e.preventDefault();
    // console.log("-----------");
    const scrollLeft = outer_container.scrollLeft;
    const scrollTop = outer_container.scrollTop;
    // console.log(outer_container.scrollHeight, outer_container.clientHeight, outer_container.scrollWidth, scrollLeft, scrollTop);

    gridObj.handleScroll(scrollLeft, scrollTop);
});

window.onresize = (e) => {
    console.log("Window resized", e);
    gridObj.handleResize(window, window.innerHeight, window.innerWidth);
};

gridCanvas.addEventListener("mousedown", (e) => {
    gridObj.handleMouseDown(e);
});

gridCanvas.addEventListener("mouseup", (e) => {
    gridObj.handleMouseUp(e);
});

gridCanvas.addEventListener("mousemove", (e) => {
    gridObj.handleMouseMove(e);
});

rowHeaderCanvas.addEventListener("mousedown", (e) => {
    gridObj.handleRowHeaderMouseDown(e);
});

rowHeaderCanvas.addEventListener("mouseup", (e) => {
    gridObj.handleRowHeaderMouseUp(e);
});

colHeaderCanvas.addEventListener("mousedown", (e) => {
    gridObj.handleColHeaderMouseDown(e);
});

colHeaderCanvas.addEventListener("mouseup", (e) => {
    gridObj.handleColHeaderMouseUp(e);
});

console.log(gridObj);