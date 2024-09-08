import { App } from "./App.js";

function init() {
  document.removeEventListener("DOMContentLoaded", init);
  // const root = document.getElementById("root");
  // let app = new PIXI.Application({ width: 1080, height: 1920, view: root });

  new App();
}

document.addEventListener("DOMContentLoaded", init);

window.onresize = resize;

function resize() {

}