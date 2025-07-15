export class PointerEventHandler {
    constructor(touchHandler, renderHandler, dataController, window) {
        this.touchHandler = touchHandler;
        this.renderHandler = renderHandler;
        this.window = window;
        this.dataController = dataController;
        this.registerEventListeners();
    }

    registerEventListeners() {
        let window = this.window;
        let touchHandler = this.touchHandler;
        let renderHandler = this.renderHandler;
        let dataController = this.dataController;
        window.addEventListener('pointermove', (e) => {
            touchHandler.pointerMove(e);
            renderHandler.render();
            console.log('down');
        })

        window.addEventListener('pointerup', (e) => {
            let action = touchHandler.pointerUp(e);
            ////////console.log('returned',action);
            action ? dataController.undoStackPush(action) : () => { };
            ////////console.log('stack',dataController.undoStack);
            renderHandler.render();
        })

        window.addEventListener('pointerdown', (e) => {
            touchHandler.pointerDown(e);
            renderHandler.render();
        })

        window.addEventListener('pointerout', () => {
            console.log('out');
        })

        window.addEventListener('pointerover', () => {
            console.log('over');
        })
    }
}