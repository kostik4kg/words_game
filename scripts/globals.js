import { Subject } from "./Utils.js";

const globals = {
  words: [],
  gameDate: null,
  currentWord: [],
  isPressed: false,
  observer: new Subject(),
  level: 0,
  is_landscape: true,
  game_width: 1080,
  game_height: 1920
}

export default globals;

export const EE = new PIXI.utils.EventEmitter;