import { Application, Graphics } from "pixi.js";
import { gamePins, GamePin } from "./board";

export function renderCollission(app: Application, pin: GamePin) {
    const graphic = new Graphics();
    graphic.lineStyle(1, 0xEEEEEE, 0.8);
    graphic.beginFill(0xEEEEEE, 0.1);
    graphic.drawCircle(0, 0, gamePins.pinRadio);
    graphic.endFill();
    graphic.x = pin.x
    graphic.y = pin.y
    graphic.scale.set(2)
    app.stage.addChild(graphic);
    app.ticker.add(animate);
    function animate(delta: number) {
        graphic.scale.x -= 0.01 * delta
        graphic.scale.y -= 0.01 * delta
        if (graphic.scale.y <= 1) {
            app.ticker.remove(animate);
            app.stage.removeChild(graphic)
        }
    }
}