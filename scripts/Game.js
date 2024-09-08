import globals from "./globals.js";
import { WorldFields } from "./WordsFields.js";
import { EE } from "./globals.js";
import { getMaxLetterCounts } from "./Utils.js";
import { WinPlate } from "./winPlate.js";

let letterForButton;

const stText = {
  fill: "#000000",
  fontFamily: "VAG World Bold",
  fontSize: 45,
}

export class Game extends PIXI.Container {
  constructor(app) {
    super();

    this.app = app;
    this.app.stage.addChild(this);
    this.createbtnBG();

    this.startLevel(true);
    this.createWordsField();
    this.pointerControll();
    this.createWinPlate();
    this.createLevelTitle();

    EE.on("next_level", this.startLevel);

    this.resize();
  };

  createLevelTitle = () => {
    this.levelTitle = new PIXI.Text(`Уровень ${globals.level + 1}`, {
      fill: "#ffffff",
      fontFamily: "VAG World Bold",
      fontSize: 40,
    });
    this.levelTitle.anchor.set(0.5);
    this.addChild(this.levelTitle);
  }

  startLevel = (isFirst = false) => {
    if (!isFirst) {
      this.resetLevel();
      this.levelTitle.text = `Уровень ${globals.level + 1}`;
    }
    this.createControllBtn();
  }

  createWinPlate = () => {
    this.winPlate = new WinPlate();

    this.addChild(this.winPlate);
  }

  createWordsField = () => {
    this.wordsFields = new WorldFields();

    this.addChild(this.wordsFields);
  }

  createControllBtn = async () => {
    const date = await this.getLevelData();

    globals.gameDate = date;

    letterForButton = new Set();
    date.words.forEach(item => {
      item.split("").forEach(item2 => {
        letterForButton.add(item2)
      })
    });
    const w = getMaxLetterCounts(date.words);

    let arr = [];
    for (let u in w) {
      for (let i = 0; i < w[u]; i++) {
        arr.push(`${u}`);
      }
    }
    arr.forEach((item, i, arr) => {
      this.createBtn(item, i, arr.length);
    });
    this.start();
  }

  start = () => {
    this.wordsFields.createWords();
  }

  createBtn = (item, i, arr) => {
    const btnSprite = new PIXI.Sprite(PIXI.Texture.from("round_2"));
    btnSprite.anchor.set(0.5);

    const title = new PIXI.Text(item.toString(), stText);
    title.anchor.set(0.5);
    btnSprite.addChild(title);

    btnSprite.position.set(
      (Math.cos((i / arr) * Math.PI * 2) * 150),
      (Math.sin((i / arr) * Math.PI * 2) * 150),
    );

    btnSprite.interactive = true;
    btnSprite.on("pointerdown", () => {
      if (globals.isPressed) return;

      globals.isPressed = true;
      globals.currentWord.push([item, i, btnSprite]);
      btnSprite.texture = PIXI.Texture.from("round_1");

      globals.observer.notify_all();
    });

    btnSprite.on("pointerover", () => {
      if (!globals.isPressed) return;

      globals.isPressed = true;

      let isArray = false;
      globals.currentWord.forEach(word => {
        if (word[1] === i) isArray = true;
      });

      if (!isArray) {
        globals.currentWord.push([item, i, btnSprite]);
        btnSprite.texture = PIXI.Texture.from("round_1");

        globals.observer.notify_all();
      }
      else if (globals.currentWord[globals.currentWord.length - 2][0] === item) {
        globals.currentWord[globals.currentWord.length - 1][2].texture = PIXI.Texture.from("round_2");

        const btn = globals.currentWord.splice(-1, 1);

        globals.observer.notify_all();
      }

      console.log("over ", item, globals.currentWord);
    });

    EE.on("clear_btn", () => {
      btnSprite.texture = PIXI.Texture.from("round_2");
    })

    this.bg.addChild(btnSprite);
  }

  createbtnBG = () => {
    this.bg = new PIXI.Sprite(PIXI.Texture.from("1"));
    this.bg.anchor.set(0.5);

    this.addChild(this.bg);
  }

  getLevelData = async () => {
    const respons = await fetch(`./scripts/levels/${globals.level % 3}.json`);
    const levelDate = await respons.json();

    return levelDate;
  }

  pointerControll = () => {
    document.addEventListener("pointerup", () => {
      globals.isPressed = false;
      console.log(EE);
      EE.emit("chek_word");
      EE.emit("clear_btn");
      globals.currentWord = [];
    })
  }

  resetLevel = () => {
    globals.gameDate = null;
    globals.words.forEach(word => {
      for (let w in word) {
        word[w][0].forEach(cell => {
          cell.destroy();
        })
      }
    })
    globals.words = [];
    this.bg.removeChildren();
  }

  resize = () => {
    this.wordsFields.resize();
    this.winPlate.resize();
    if (globals.is_landscape) {
      this.bg.position.set(1920 / 1.5, 1080 / 2);
      this.levelTitle.position.set(globals.game_width / 2, 100);
    } else {
      this.bg.position.set(1080 / 2, 1920 / 2 + 250);
      this.levelTitle.position.set(globals.game_width / 2, 100);
    }
  }
}