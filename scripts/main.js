import { App } from "./App.js";

function init() {
  document.removeEventListener("DOMContentLoaded", init);

  new App();
}

document.addEventListener("DOMContentLoaded", init);

window.onresize = resize;

function resize() {

}