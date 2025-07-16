export class KeyboardHandler {
    constructor(touchHandler, renderHandler, document) {
        this.touchHandler = touchHandler;
        this.renderHandler = renderHandler;
        this.document = document;
        this.registerEventListeners();
    }

    changeDataController(dataController) {
        this.dataController = dataController;
    }

    registerEventListeners() {

        document.addEventListener('keydown', (e) => {
            let document = this.document;
            let dataController = this.touchHandler.getDataController();
            let renderHandler = this.renderHandler;
            if (e.ctrlKey && e.key.toLowerCase() === 'z') {
                //console.log(dataController.getUndoStack());
                if (dataController.getUndoStackLength() == 0) return;
                else {
                    let action = dataController.undoStackPop();
                    ////////////console.log('undo',action);
                    dataController.redoStackPush(action);
                    action.undo();
                }
                renderHandler.render();
            } else if (e.ctrlKey && e.key.toLowerCase() == 'y') {
                ////////////console.log('Redo');
                if (dataController.getRedoStackLength() == 0) return;
                let action = dataController.redoStackPop();

                ////////console.log('doing action redo of ', action);
                action.redo();
                dataController.undoStackPush(action, 'post-redo');
                renderHandler.render();
            } else if (e.ctrlKey && e.key.toLowerCase() == 's') {
                e.preventDefault();
                ////console.log('sum');
                dataController.computeAndPushDataPoints('sum');
                renderHandler.render();
            } else if (e.ctrlKey && e.key.toLowerCase() == 'i') {
                e.preventDefault();
                dataController.computeAndPushDataPoints('min');
                renderHandler.render();
            } else if (e.ctrlKey && e.key.toLowerCase() == 'x') {
                e.preventDefault();
                dataController.computeAndPushDataPoints('max');
                renderHandler.render();
            } else if (e.ctrlKey && e.key.toLowerCase() == 'c') {
                e.preventDefault();
                dataController.computeAndPushDataPoints('count');
                renderHandler.render();
            } else if (e.ctrlKey && e.key.toLowerCase() == 'a') {
                e.preventDefault();
                dataController.computeAndPushDataPoints('avg');
                renderHandler.render();
            }
        });
    }
}