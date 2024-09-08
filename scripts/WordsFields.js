import globals from "./globals.js";
import { SelectWord } from "./SelectWord.js";
import { Cell } from "./Cell.js";
import { EE } from "./globals.js";

export class WorldFields extends PIXI.Container {
  constructor() {
    super();


    this.createCurrentWord();

    this.resize();

    EE.on("chek_word", this.chek_word);
  }

  chek_word = () => {
    const w2 = globals.currentWord.reduce((acc, item) => { return acc += item[0] }, "");

    if (globals.gameDate.words.includes(w2)) {
      for (let w of globals.words) {
        if (w[w2] && w[w2][0]) {
          w[w2][1] = true;
          w[w2][0].forEach((cell, i) => {
            cell.updateText(w2[i]);
          });
        }
      }
    }
    EE.emit("clear_word");
    this.chekWin();

  }

  chekWin = () => {
    const isWin = globals.gameDate.words.every((word, i) => {
      return globals.words[i][word][1];
    })
    if (isWin) {
      EE.emit("show_win");
    }
  }

  createCurrentWord = () => {
    this.currentWord = new SelectWord();

    this.addChild(this.currentWord);
  }

  createWords = () => {
    const date = globals.gameDate.words;
    for (let i = 0; i < date.length; i++) {
      const fildName = date[i];
      globals.words.push({ [fildName]: [this.createField(date[i], i), false] });
    }
  }
  createField = (arr, yLine) => {
    const wordSprite = [];
    for (let i = 0; i < arr.length; i++) {
      const word = new Cell("cell_1");
      word.setPos(-90 * arr.length / 2 + 90 * i, 90 * yLine);
      wordSprite.push(word);

      this.addChild(word);
    }
    return wordSprite;
  }

  resize = () => {
    if (globals.is_landscape) {
      this.position.set(globals.game_width / 4, 100);
      this.currentWord.position.set(250, 50);
    } else {
      this.position.set(globals.game_width / 2, 150);
      this.currentWord.position.set(0, globals.game_height - 800);
    }

  }
}