export class PointerEventHandler {
    constructor(touchHandler, renderHandler, window) {
        this.touchHandler = touchHandler;
        this.renderHandler = renderHandler;
        this.window = window;
        this.registerEventListeners();
    }

    changeDataController(dataController) {
        this.dataController = dataController;
    }

    registerEventListeners() {

        window.addEventListener('pointermove', (e) => {

            let window = this.window;
            let touchHandler = this.touchHandler;
            let renderHandler = this.renderHandler;
            let dataController = this.touchHandler.getDataController();
            touchHandler.pointerMove(e);
            renderHandler.render();
            ////console.log('down');
        })

        window.addEventListener('pointerup', (e) => {
            let window = this.window;
            let touchHandler = this.touchHandler;
            let renderHandler = this.renderHandler;
            let dataController = this.touchHandler.getDataController();
            let action = touchHandler.pointerUp(e);
            ////////////console.log('returned',action);
            action ? dataController.undoStackPush(action) : () => { };
            ////////////console.log('stack',dataController.undoStack);
            renderHandler.render();
        })

        window.addEventListener('pointerdown', (e) => {
            let window = this.window;
            let touchHandler = this.touchHandler;
            let renderHandler = this.renderHandler;
            let dataController = this.touchHandler.getDataController();
            touchHandler.pointerDown(e);
            renderHandler.render();
        })
    }
}