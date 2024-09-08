import globals from "./globals.js";
import { Cell } from "./Cell.js";
import { EE } from "./globals.js";

export class SelectWord extends PIXI.Container {
  constructor() {
    super();

    globals.observer.add_observer(this);
    this.cells = [];

    this.position.y = -65;
    this.createWord();

    EE.on("clear_word", this.hide);
  }

  createWord = () => {
    for (let i = 0; i < 10; i++) {
      const cell = new Cell("cell_1", true);
      cell.scale.set(0.8);
      cell.setPos(50 * i, 0);
      cell.hide();
      this.addChild(cell);

      this.cells.push(cell);
    }
  }
  onStateUpdate = () => {
    this.position.x = -25 * globals.currentWord.length;
    this.cells.forEach((item, i) => {
      if (globals.currentWord[i]) {
        item.updateText(globals.currentWord[i][0]);
      } else {
        item.hide();
      }
    })
  }

  hide = () => {
    this.cells.forEach(item => {
      item.hide();
    })
  }
}