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
                    ////console.log(action);
                    this.currentHandler = action;
                    break;
                }
            }
        }
        this.currentHandler.pointerDown(e);
    }

    pointerUp(e) {
        const action = this.currentHandler.pointerUp(e);
        this.currentHandler = null;
        ////////console.log("returning", action);
        return action;
    }

    registerHandler(handler) {
        this.arrActions.push(handler);
    }
}