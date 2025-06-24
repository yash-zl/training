container = document.querySelector(".container");
mvbl = document.querySelector(".movable_box");
console.log(container.style.height);
eve = undefined;
drag = false;
ow = document.querySelector("#resizePromptOW");
iw = document.querySelector("#resizePromptIW");

maxY = container.clientHeight;
maxX = container.clientWidth;
mvblX = 0;
mvblY = 0;

mvbl.addEventListener("pointerdown", (e) => {
  drag = true;
});

container.addEventListener("pointermove", (e) => {
  // console.log("moving");
  if (drag) {
    console.log(e.pageX + " " + e.pageY);
    if (e.y + 25 < maxY && e.y - 25 > 0) {
      mvbl.style.top = e.y - 25 + "px";
    }
    if (e.x + 25 < maxX && e.x - 25 > 0) {
      mvbl.style.left = e.x - 25 + "px";
    }
  }
});

container.addEventListener("pointerup", () => {
  drag = false;
});

container.addEventListener("pointercancel", () => {
  drag = false;
});

px = "px";

window.onresize = () => {
  console.log("chaing");
  maxY = window.innerHeight;
  maxX = window.innerWidth;
  readjust();
};

function readjust() {
  
  if (parseInt(mvbl.style.top.split("px")[0]) + 50 >= maxY) {
    console.log("top");
    mvbl.style.top = maxY - 50 + "px";
  } else if (parseInt(mvbl.style.left.split("px")[0]) + 50 >= maxX) {
    console.log("left");
    mvbl.style.left = maxX - 50 + "px";
  }
}

// while (true) console.log(window.innerWidth);
