class MovableDiv {
  id: number;
  element: HTMLElement;
  drag: boolean = false;

  constructor(
    id: number,
    element: HTMLElement,
    h: number,
    w: number,
    l: number,
    t: number
  ) {
    this.id = id;
    this.element = element;
    this.element.style.position = "absolute";
    this.element.style.height = h + "px";
    this.element.style.width = w + "px";
    this.element.style.left = 0 + "px";
    this.element.style.top = 0 + "px";
    this.element.style.backgroundColor = "green";
    // this.element.setAttribute("id")

    this.element.addEventListener("pointerdown", () => {
      console.log("hey");
      this.drag = true;
    });

    this.element.addEventListener("pointercancel", () => {
      this.cancelDrag();
    });

    this.element.addEventListener("pointerup", () => {
      this.cancelDrag();
    });
  }

  cancelDrag() {
    this.drag = false;
  }

  updatePosition(e: any, X, Y, w, h) {
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
  }

  updatePositionOnResize(maxX: number, maxY: number, X, Y) {
    let top = parseInt(this.element.style.top.split("px")[0]);
    let left = parseInt(this.element.style.left.split("px")[0]);
    console.log(left + " " + X + " " + maxX);

    if (top + 50 >= maxY && maxY - 50 > 0) {
      this.element.style.top = maxY - 50 + "px";
    } else if (left + 50 >= maxX && maxX - 50 > 0) {
      this.element.style.left = maxX - 50 + "px";
    }
  }
}

class ContainerDiv {
  id: number;
  containerElement: HTMLElement;
  X: number;
  Y: number;
  child: MovableDiv;
  height: number;
  width: number;
  currHeight: number;
  currWidth: number;
  constructor(
    id: number,
    containerElement: HTMLElement,
    X: number,
    Y: number,
    width: number,
    height: number
  ) {
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
    this.child = new MovableDiv(
      0,
      document.createElement("div"),
      50,
      50,
      this.X,
      this.Y
    );

    this.containerElement.addEventListener("pointercancel", () =>
      this.child.cancelDrag()
    );

    this.containerElement.addEventListener("pointermove", (e) =>
      this.child.updatePosition(
        e,
        this.X,
        this.Y,
        this.currWidth,
        this.currHeight
      )
    );

    this.containerElement.appendChild(this.child.element);
  }

  resize(newWidth, newHeight) {
    this.currHeight = newHeight;
    this.currWidth = newWidth;

    // console.log("being called for " + this.id);

    this.child.updatePositionOnResize(
      this.currWidth,
      this.currHeight,
      this.X,
      this.Y
    );
  }
}

class MultipleGames {
  containers: ContainerDiv[] = [];
  l: number = 0;
  overallContainer: HTMLElement;
  constructor(overallContainer: HTMLElement, divs: object[]) {
    this.overallContainer = overallContainer;
    // console.log(divs);
    // let i: number = 0;
    for (var i = 0; i < divs.length; i++) {
      console.log(divs[i]);
      let el: HTMLElement = document.createElement("div");
      this.containers.push(
        new ContainerDiv(
          i,
          el,
          divs[i]["X"],
          divs[i][`Y`],
          divs[i][`width`],
          divs[i][`height`]
        )
      );
      this.l++;
    }

    console.log(this.containers);

    for (var i = 0; i < this.containers.length; i++)
      this.overallContainer.appendChild(this.containers[i].containerElement);
  }

  resizeWindow(maxX, maxY) {
    for (var i = 0; i < this.l; i++) {
      //   console.log(this.containers[i]);
      let containerSpaceX: number =
        this.containers[i].X + this.containers[i].width;
      let containerSpaceY: number =
        this.containers[i].Y + this.containers[i].height;

      //   console.log("----\n" + containerSpaceX + " " + maxX);

      if (containerSpaceX >= maxX) {
        this.containers[i].resize(
          this.containers[i].width - (containerSpaceX - maxX),
          this.containers[i].height - (containerSpaceY - maxY)
        );
      } else if (containerSpaceY >= maxY) {
        this.containers[i].resize(
          this.containers[i].width - (containerSpaceX - maxX),
          this.containers[i].height - (containerSpaceY - maxY)
        );
      }
    }
  }
}

let games: MultipleGames = new MultipleGames(
  document.getElementById("overallContainer")!,
  [
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
  ]
);

window.onresize = () => {
  games.resizeWindow(window.innerWidth, window.innerHeight);
};

// asdfasdf
// console.log(MultipleGames.overallContainer);
