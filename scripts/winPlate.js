import globals from "./globals.js";
import { EE } from "./globals.js";
export class WinPlate extends PIXI.Container {
  constructor() {
    super();

    this.textConteiner = new PIXI.Container();

    this.createPlate();
    this.addChild(this.textConteiner);
    this.createBtnNextLevel();

    this.isShow(false);

    EE.on("show_win", () => {
      this.isShow(true);
    });

    this.resize();
  }

  createPlate = () => {
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = 1920;
    bg.height = 1920;
    bg.anchor.set(0.5);
    // bg.alpha = 0.7;
    bg.tint = 0x2B344B;
    bg.position.set(1920 / 2, 1920 / 2);
    this.addChild(bg);

    const text = new PIXI.Text(`Уровень ${globals.level + 1} пройден`, {
      fill: "#ffffff",
      fontFamily: "VAG World Bold",
      fontSize: 25,
    });
    text.anchor.set(0.5);
    text.position.set(0, -150);
    const text2 = new PIXI.Text("Изумительно", {
      fill: "#ffffff",
      fontFamily: "VAG World Bold",
      fontSize: 35,
    });
    text2.anchor.set(0.5);
    text2.position.set(0, -50);
    this.textConteiner.addChild(text, text2);
  }

  createBtnNextLevel = () => {
    const btn = new PIXI.Sprite(PIXI.Texture.from("btn"));
    btn.anchor.set(0.5);
    btn.position.set(0, 50);

    btn.interactive = true;

    const title = new PIXI.Text(`Следующий`, {
      fill: "#ffffff",
      fontFamily: "VAG World Bold",
      fontSize: 50,
    });
    title.anchor.set(0.5);
    btn.addChild(title);

    btn.on("pointerdown", () => {
      globals.level++;
      EE.emit("next_level");
      this.isShow(false);
    })

    this.textConteiner.addChild(btn);
  }

  isShow = (isShow = true) => {
    this.visible = isShow;
  }

  resize = () => {
    if (globals.is_landscape) {
      this.textConteiner.position.set(globals.game_width / 2, globals.game_height / 2);
    } else {
      this.textConteiner.position.set(globals.game_width / 2, globals.game_width / 2);
    }
  }
}