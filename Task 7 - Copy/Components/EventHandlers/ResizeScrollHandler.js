export class ResizeScrollHandler {
    constructor(touchHandler, renderHandler, window, outerContainer) {
        this.touchHandler = touchHandler;
        this.renderHandler = renderHandler;
        this.window = window;
        this.outerContainer = outerContainer;
        this.registerEventListeners();
    }

    registerEventListeners() {
        ////console.log('reg');

        this.window.addEventListener('resize', () => {
            this.renderHandler.handleResize(this.window, this.window.innerHeight, this.window.innerWidth);
            this.renderHandler.render();
        })

        this.outerContainer.addEventListener('scroll', () => {
            // ////////////console.log('scrolling');
            this.renderHandler.handleScroll(this.outerContainer.scrollLeft, this.outerContainer.scrollTop);
            this.renderHandler.render();
        });
    }
    changeDataController() { }
}