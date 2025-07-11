// import { useActionState } from "react";

export class TouchHandler {
    constructor(dataController) {
        this.dataController = dataController;
        

        this.arrActions = [];

        this.currentHandler = null;
    }

    pointerMove(e) {
        if (!this.currentHandler) {
            for (let action of this.arrActions) {
                if (action.hitTest(e)) {
                    // this.currentHandler.setCursor();
                    //console.log(action);
                    action.setCursor();
                    break;
                }
            }
        } else {
            this.currentHandler.pointerMove(e);
        }
    }

    pointerDown(e) {
        if(!this.currentHandler){
            for(let action of this.arrActions){
                if(action.hitTest(e)){
                    this.currentHandler = action;
                    break;
                }
            }
        }
        this.currentHandler.pointerDown(e);
    }

    pointerUp(e) {
        this.currentHandler.pointerUp(e);
        this.currentHandler = null;
        // this.touchHandler = null;
    }

    registerHandler(handler) {
        this.arrActions.push(handler);
    }
}