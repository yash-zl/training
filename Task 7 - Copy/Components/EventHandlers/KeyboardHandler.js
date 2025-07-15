export class KeyboardHandler {
    constructor(touchHandler, renderHandler, dataController, document) {
        this.toucHandler = touchHandler;
        this.renderHandler = renderHandler;
        this.document = document;
        this.dataController = dataController;
        this.registerEventListeners();
    }

    registerEventListeners() {
        let document = this.document;
        let dataController = this.dataController;
        let renderHandler = this.renderHandler;
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'z') {
                ////////console.log('Undo shortcut triggered');
                if (dataController.getUndoStackLength() == 0) return;
                else {
                    let action = dataController.undoStackPop();
                    ////////console.log('undo',action);
                    dataController.redoStackPush(action);
                    action.undo();
                }
                renderHandler.render();
            } else if (e.ctrlKey && e.key.toLowerCase() == 'y') {
                ////////console.log('Redo');
                if (dataController.getRedoStackLength() == 0) return;
                let action = dataController.redoStackPop();

                ////console.log('doing action redo of ', action);
                action.redo();
                dataController.undoStackPush(action, 'post-redo');
                renderHandler.render();
            } else if (e.ctrlKey && e.key.toLowerCase() == 's') {
                e.preventDefault();
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