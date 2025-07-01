import { Grid } from './Components/Grid.js';

var gridCanvas = document.getElementById('grid');
var rowHeaderCanvas = document.getElementById("row_header");
var colHeaderCanvas = document.getElementById("col_header");

const gridObj = new Grid(gridCanvas, rowHeaderCanvas, colHeaderCanvas, gridCanvas.getContext('2d'), rowHeaderCanvas.getContext("2d"), colHeaderCanvas.getContext("2d"), window, window.innerHeight, window.innerWidth);

// var DPR = window.devicePixelRatio || 1;

// const grid = document.getElementById('grid');
// const rowHeader = document.getElementById('row_header');
// const colHeader = document.getElementById('col_header');
// const corner = document.getElementById('corner');
// console.log(grid, rowHeader, colHeader, corner);
// const gtx = grid.getContext('2d');
// const rtx = rowHeader.getContext('2d');
// const ctx = colHeader.getContext('2d');
// const cornerCtx = corner.getContext('2d');

// const ROW_HEADER_WIDTH = 60;
// const COL_HEADER_HEIGHT = 30;
// // const row_
// const NUM_COLS = 90;
// const NUM_ROWS = 90

// const COL_WIDTH = 90;
// const default_row_height = 30;

// function resize() {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     DPR = window.devicePixelRatio || 1;

//     const gridWidth = width - ROW_HEADER_WIDTH;
//     const gridHeight = height - COL_HEADER_HEIGHT;

//     grid.width = gridWidth * DPR;
//     grid.height = gridHeight * DPR;
//     grid.style.left = ROW_HEADER_WIDTH + 'px';
//     grid.style.top = COL_HEADER_HEIGHT + 'px';
//     grid.style.width = gridWidth + 'px';
//     grid.style.height = gridHeight + 'px';
//     gtx.setTransform(DPR, 0, 0, DPR, 0, 0);

//     rowHeader.width = ROW_HEADER_WIDTH * DPR;
//     rowHeader.height = gridHeight * DPR;
//     rowHeader.style.left = '0px';
//     rowHeader.style.top = COL_HEADER_HEIGHT + 'px';
//     rowHeader.style.width = ROW_HEADER_WIDTH + 'px';
//     rowHeader.style.height = gridHeight + 'px';
//     rtx.setTransform(DPR, 0, 0, DPR, 0, 0);

//     colHeader.width = gridWidth * DPR;
//     colHeader.height = COL_HEADER_HEIGHT * DPR;
//     colHeader.style.left = ROW_HEADER_WIDTH + 'px';
//     colHeader.style.top = '0px';
//     colHeader.style.width = gridWidth + 'px';
//     colHeader.style.height = COL_HEADER_HEIGHT + 'px';
//     ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

//     corner.width = ROW_HEADER_WIDTH * DPR;
//     corner.height = COL_HEADER_HEIGHT * DPR;
//     corner.style.left = '0px';
//     corner.style.top = '0px';
//     corner.style.width = ROW_HEADER_WIDTH + 'px';
//     corner.style.height = COL_HEADER_HEIGHT + 'px';
//     cornerCtx.setTransform(DPR, 0, 0, DPR, 0, 0);

//     drawAll();
// }

// function drawGrid() {
//     gtx.clearRect(0, 0, grid.width, grid.height);
//     gtx.lineWidth = 0.6;
//     gtx.strokeStyle = '#ccc';
//     for (let c = 0; c <= NUM_COLS; c++) {
//         const x = Math.floor(c * COL_WIDTH) + 0.5;
//         gtx.beginPath();
//         gtx.moveTo(x, 0);
//         gtx.lineTo(x, default_row_height * NUM_ROWS);
//         gtx.stroke();
//     }
//     for (let r = 0; r <= NUM_ROWS; r++) {
//         const y = Math.floor(r * default_row_height) + 0.5;
//         gtx.beginPath();
//         gtx.moveTo(0, y);
//         gtx.lineTo(COL_WIDTH * NUM_COLS, y);
//         gtx.stroke();
//     }
// }


// function drawRowHeaders() {
//     rtx.clearRect(0, 0, rowHeader.width, rowHeader.height);
//     rtx.lineWidth = 0.6;
//     rtx.strokeStyle = '#e0e0e0';
//     rtx.fillStyle = '#616161';
//     rtx.textBaseline = 'middle';
//     rtx.font = '12px sans-serif';
//     rtx.textAlign = "right";
//     for (let r = 0; r <= NUM_ROWS; r++) {
//         const y = Math.floor(r * default_row_height) + 0.5;
//         rtx.beginPath();
//         rtx.moveTo(0, y);
//         rtx.lineTo(ROW_HEADER_WIDTH, y);
//         rtx.stroke();
//         if (r < NUM_ROWS) {
//             rtx.fillText(r + 1, ROW_HEADER_WIDTH - 5, y + default_row_height / 2 - 0.5);
//         }
//     }
// }


// function drawColHeaders() {
//     ctx.clearRect(0, 0, colHeader.width, colHeader.height);
//     ctx.lineWidth = 0.6;
//     ctx.strokeStyle = '#e0e0e0';
//     ctx.fillStyle = '#616161';
//     ctx.textBaseline = 'middle';
//     ctx.font = '12px sans-serif';
//     ctx.textAlign = "center";
//     for (let c = 0; c <= NUM_COLS; c++) {
//         const x = Math.floor(c * COL_WIDTH) + 0.5;
//         ctx.beginPath();
//         ctx.moveTo(x, 0);
//         ctx.lineTo(x, COL_HEADER_HEIGHT);
//         ctx.stroke();
//         if (c < NUM_COLS) {
//             ctx.fillText(String.fromCharCode(65 + c), x + COL_WIDTH / 2, COL_HEADER_HEIGHT / 2);
//         }
//     }
// }

// function drawCorner() {
//     cornerCtx.clearRect(0, 0, corner.width, corner.height);
//     cornerCtx.fillStyle = '#e0e0e0';
//     cornerCtx.fillRect(0, 0, ROW_HEADER_WIDTH, COL_HEADER_HEIGHT);
//     cornerCtx.strokeStyle = '#999';
//     cornerCtx.lineWidth = 1;
//     cornerCtx.strokeRect(0.5, 0.5, ROW_HEADER_WIDTH - 1, COL_HEADER_HEIGHT - 1);
// }

// function drawAll() {
//     drawGrid();
//     drawRowHeaders();
//     drawColHeaders();
//     // drawCorner();
// }

// window.addEventListener('resize', resize);
// resize();