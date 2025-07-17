export class SelectionEvents {
    constructor(dataController) {
        this.dataController = dataController;
        this.keyboardEvents = (e) => {
            e.preventDefault();
            if (e.ctrlKey) {
                switch (e.key.toLowerCase()) {
                    case 'c':
                        this.dataController.storeCopy();
                        break;
                    case 'v':
                        this.dataController.paste();
                        break;
                    case 'x':
                        this.dataController.storeCopy();
                        this.dataController.deleteSelectedData();
                        break;
                    default:
                        break;
                }
            } else if (e.key == 'Delete') {
                this.dataController.deleteSelectedData();
            }
        }
    }

    activate() {
        document.addEventListener('keydown', this.keydownEvents);
    }

    deactivate() {
        document.removeEventListener('keydown', this.keyboardEvents)
    }
}