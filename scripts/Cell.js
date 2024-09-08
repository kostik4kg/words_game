export class Cell extends PIXI.Sprite {
  constructor(name, specc = false) {
    super(PIXI.Texture.from(name));

    this.createText();
  }

  createText = () => {
    this.title = new PIXI.Text("A", {
      fill: "#000000",
      fontFamily: "VAG World Bold",
      fontSize: 45,
    });
    this.title.anchor.set(0.5);
    this.title.position.set(this.width / 2, this.height / 2);
    this.title.visible = false;
    if (this.spec) console.log(this.title);
    this.addChild(this.title);
  }

  updateText = (text) => {
    console.log(this.title, text);
    this.visible = true;
    this.title.visible = true;
    this.title.text = text;
    this.texture = PIXI.Texture.from("cell_2");
  }

  hide = () => {
    this.visible = false;
    this.title.visible = false;
    this.title.text = "";
    this.texture = PIXI.Texture.from("cell_1");
  }

  setPos = (x, y) => {
    this.position.set(x, y);
  }
}