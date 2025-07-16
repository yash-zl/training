// import { useActionState } from "react";

export class TouchHandler {
    constructor(dataController) {
        this.dataController = dataController;
        

        this.arrActions = [];

        this.currentHandler = null;
    }

    getDataController(){
        return this.dataController;
    }

    changeDataController(dataController){
        this.dataController = dataController;
        for(let action of this.arrActions){
            ////console.log(action);
            action? action.changeDataController(dataController):()=>{};
        }
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
                    ////////console.log(action);
                    this.currentHandler = action;
                    break;
                }
            }
        }
        this.currentHandler?this.currentHandler.pointerDown(e):()=>{};
    }

    pointerUp(e) {
        if(!this.currentHandler) return null;
        const action = this.currentHandler.pointerUp(e);
        this.currentHandler = null;
        ////////////console.log("returning", action);
        return action;
    }

    registerHandler(handler) {
        this.arrActions.push(handler);
    }
}