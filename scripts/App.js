import { Game } from "./Game.js";
import globals from "./globals.js";
export class App {
  constructor() {
    this.canvas = document.getElementById("root");
    this.app = new PIXI.Application({ width: 1080, height: 1920, view: this.canvas, background: 0x2B344B });

    window.onresize = this.resize;
    window.onorientationchange = this.resize;

    this.resize();

    this.createGame();
  }

  createGame = async () => {
    await this.loadAssets();

    this.game = new Game(this.app);
  }

  loadAssets = async () => {
    const url = `${window.location.origin}${window.location.pathname}`.replace(
      "index.html",
      "",
    );
    PIXI.Assets.add('main_assets', `${url}images/main_atlas.json`);
    PIXI.Assets.add("wag_world", `${url}font/VAG World Bold.ttf`)
    // Allow the assets to load in the background
    // PIXI.Assets.backgroundLoad(['main_assets', "wag_world"]);

    // If the background load hasn't loaded this asset yet, calling load forces this asset to load now.
    return await PIXI.Assets.load(['main_assets', "wag_world"]);
  }

  resize = () => {
    const style = this.canvas.style;
    let width;
    let height;
    let margin;
    const isMobile = PIXI.utils.isMobile.any;

    let gameWidth = 1920;
    let gameHeight = 1080;

    if (isMobile && document.body.clientWidth < document.body.clientHeight) {
      const multiplier = document.body.clientWidth / 1080;
      const target_height = document.body.clientHeight / multiplier;

      this.app.renderer.resize(1080, target_height);

      globals.is_landscape = false;

      style.width = "100%";
      style.height = "100%";
      style.marginTop = "0";
      style.marginLeft = "0";
      globals.game_width = this.app.view.width;
      globals.game_height = this.app.view.height;
    } else {
      globals.game_width = 1920;
      globals.game_height = 1080;
      globals.is_landscape = true;

      if (document.body.clientWidth > (document.body.clientHeight * gameWidth) / gameHeight) {
        width = (document.body.clientHeight / gameHeight) * gameWidth;
        height = document.body.clientHeight;
        margin = (document.body.clientWidth - width) / 2;

        style.width = `${width}px`;
        style.height = `${height}px`;
        style.marginTop = "0";
        style.marginLeft = `${margin}px`;
      } else {
        width = document.body.clientWidth;
        height = (document.body.clientWidth / gameWidth) * gameHeight;
        margin = (document.body.clientHeight - height) / 2;

        style.width = `${width}px`;
        style.height = `${height}px`;
        style.marginTop = `${margin}px`;
        style.marginLeft = "0";
      }

      this.app.renderer.resize(gameWidth, gameHeight);
    }

    if (this.game) this.game.resize();
  }
}