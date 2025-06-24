var MovableDiv = /** @class */ (function () {
    function MovableDiv(id, element, h, w, l, t) {
        var _this = this;
        this.drag = false;
        this.id = id;
        this.element = element;
        this.element.style.position = "absolute";
        this.element.style.height = h + "px";
        this.element.style.width = w + "px";
        this.element.style.left = 0 + "px";
        this.element.style.top = 0 + "px";
        this.element.style.backgroundColor = "green";
        // this.element.setAttribute("id")
        this.element.addEventListener("pointerdown", function () {
            console.log("hey");
            _this.drag = true;
        });
        this.element.addEventListener("pointercancel", function () {
            _this.cancelDrag();
        });
        this.element.addEventListener("pointerup", function () {
            _this.cancelDrag();
        });
    }
    MovableDiv.prototype.cancelDrag = function () {
        this.drag = false;
    };
    MovableDiv.prototype.updatePosition = function (e, X, Y, w, h) {
        if (this.drag) {
            //   if (this.drag) {
            //   console.log(e.pageX + " " + e.pageY);
            if (e.y + 25 < Y + h && e.y - 25 > Y) {
                this.element.style.top = e.pageY - Y - 25 + "px";
            }
            if (e.x + 25 < X + w && e.x - 25 > X) {
                this.element.style.left = e.pageX - X - 25 + "px";
            }
        }
        // }
    };
    MovableDiv.prototype.updatePositionOnResize = function (maxX, maxY, X, Y) {
        var top = parseInt(this.element.style.top.split("px")[0]);
        var left = parseInt(this.element.style.left.split("px")[0]);
        console.log(left + " " + X + " " + maxX);
        if (top + 50 >= maxY && maxY - 50 > 0) {
            this.element.style.top = maxY - 50 + "px";
        }
        else if (left + 50 >= maxX && maxX - 50 > 0) {
            this.element.style.left = maxX - 50 + "px";
        }
    };
    return MovableDiv;
}());
var ContainerDiv = /** @class */ (function () {
    function ContainerDiv(id, containerElement, X, Y, width, height) {
        var _this = this;
        // console.log("creating new with " + id);
        this.id = id;
        this.containerElement = containerElement;
        this.X = X;
        this.Y = Y;
        this.height = this.currHeight = height;
        this.width = this.currWidth = width;
        // console.log(height + " " + width);
        this.containerElement.style.position = "absolute";
        this.containerElement.style.left = this.X + "px";
        this.containerElement.style.top = this.Y + "px";
        this.containerElement.style.backgroundColor = "red";
        this.containerElement.style.border = "2px solid black";
        this.containerElement.style.height = height + "px";
        this.containerElement.style.width = width + "px";
        this.containerElement.style.display = "inline-block";
        // console.log(this.containerElement.style);
        this.child = new MovableDiv(0, document.createElement("div"), 50, 50, this.X, this.Y);
        this.containerElement.addEventListener("pointercancel", function () {
            return _this.child.cancelDrag();
        });
        this.containerElement.addEventListener("pointermove", function (e) {
            return _this.child.updatePosition(e, _this.X, _this.Y, _this.currWidth, _this.currHeight);
        });
        this.containerElement.appendChild(this.child.element);
    }
    ContainerDiv.prototype.resize = function (newWidth, newHeight) {
        this.currHeight = newHeight;
        this.currWidth = newWidth;
        // console.log("being called for " + this.id);
        this.child.updatePositionOnResize(this.currWidth, this.currHeight, this.X, this.Y);
    };
    return ContainerDiv;
}());
var MultipleGames = /** @class */ (function () {
    function MultipleGames(overallContainer, divs) {
        this.containers = [];
        this.l = 0;
        this.overallContainer = overallContainer;
        // console.log(divs);
        // let i: number = 0;
        for (var i = 0; i < divs.length; i++) {
            console.log(divs[i]);
            var el = document.createElement("div");
            this.containers.push(new ContainerDiv(i, el, divs[i]["X"], divs[i]["Y"], divs[i]["width"], divs[i]["height"]));
            this.l++;
        }
        console.log(this.containers);
        for (var i = 0; i < this.containers.length; i++)
            this.overallContainer.appendChild(this.containers[i].containerElement);
    }
    MultipleGames.prototype.resizeWindow = function (maxX, maxY) {
        for (var i = 0; i < this.l; i++) {
            //   console.log(this.containers[i]);
            var containerSpaceX = this.containers[i].X + this.containers[i].width;
            var containerSpaceY = this.containers[i].Y + this.containers[i].height;
            //   console.log("----\n" + containerSpaceX + " " + maxX);
            if (containerSpaceX >= maxX) {
                this.containers[i].resize(this.containers[i].width - (containerSpaceX - maxX), this.containers[i].height - (containerSpaceY - maxY));
            }
            else if (containerSpaceY >= maxY) {
                this.containers[i].resize(this.containers[i].width - (containerSpaceX - maxX), this.containers[i].height - (containerSpaceY - maxY));
            }
        }
    };
    return MultipleGames;
}());
var games = new MultipleGames(document.getElementById("overallContainer"), [
    {
        X: 0,
        Y: 0,
        width: 500,
        height: 200,
    },
    {
        X: 800,
        Y: 100,
        width: 200,
        height: 200,
    },
    {
        X: 0,
        Y: 500,
        width: 200,
        height: 200,
    },
]);
window.onresize = function () {
    games.resizeWindow(window.innerWidth, window.innerHeight);
};
// console.log(MultipleGames.overallContainer);
