import { Application, Graphics } from "pixi.js";
import { animatePayOut, getGameState, updateGameState } from "../state";
import { gamePayouts, gamePins } from "./board";
import { renderCollission } from "./collission";
import { sound } from "@pixi/sound";

export function createBet(app: Application) {
    const betRadio = gamePins.pinRadio * 2
    const initialSpeed = {
        y: app.view.height * 0.003,
    }
    const speed = {
        x: 0,
        y: initialSpeed.y,
    }
    const graphic = new Graphics();
    graphic.beginFill(0xFF0000);
    graphic.drawCircle(0, 0, betRadio);
    graphic.endFill();
    graphic.lineStyle(1, 0x000000);
    graphic.beginFill(0xFF0000, 0);
    graphic.drawCircle(0, 0, betRadio * 0.6);
    graphic.endFill();
    graphic.x = gamePins.apear.left + (Math.random() * (gamePins.apear.right - gamePins.apear.left));
    graphic.y = 0;
    app.stage.addChild(graphic);
    app.ticker.add(animate);
    updateGameState((prev) => {
        return {
            ...prev,
            activeBets: prev.activeBets + 1,
            balance: prev.balance - prev.betValue
        }
    })
    function animate(delta: number) {
        const collission = getCollission();
        if (collission) {
            const angle = Math.atan2(graphic.y - collission.graphic.y, graphic.x - collission.graphic.x);
            speed.x = Math.cos(angle) * 1.7;
            if (speed.x < 0 && speed.x > -0.3) speed.x = -0.3;
            if (speed.x > 0 && speed.x < 0.3) speed.x = 0.3;
            speed.y = speed.y * Math.sin(angle) * 0.6;
            renderCollission(app, collission);
        }
        graphic.y += speed.y * delta;
        graphic.x += speed.x * delta;
        document.title = speed.x.toString()
        if (graphic.y > gamePins.lastY) {
            finish();
        } else {
            if (speed.y < 0) speed.y += 0.15 * delta;
            else if (speed.y > 0) speed.y += 0.06 * delta;
            else speed.y = initialSpeed.y;
            if (Math.abs(speed.x) < 0.03) speed.x = Math.random() * 0.3 - 0.05;
            else if (speed.x < 0) speed.x += 0.02 * delta;
            else if (speed.x > 0) speed.x -= 0.02 * delta;
            if (graphic.x > gamePayouts.prefererPayout.x) {
                if (speed.x > 0) speed.x -= 0.035 * delta;
            } if (graphic.x < gamePayouts.prefererPayout.x) {
                if (speed.x < 0) speed.x += 0.035 * delta;
            }
        }
    }
    function finish() {
        if (getGameState().playSounds) sound.play('pop');
        app.ticker.remove(animate);
        app.stage.removeChild(graphic);
        const payout = gamePayouts.payouts.find((payout) => {
            return (graphic.x < payout.x)
        })
        if (payout) {
            animatePayOut(payout.idx - 1, true)
            updateGameState((prev) => {
                return {
                    ...prev,
                    balance: prev.balance + (prev.betValue * payout.tax),
                    lastPayouts: [{
                        idx: Date.now(),
                        x: 0,
                        y: 0,
                        style: payout.style,
                        tax: payout.tax,
                    }, ...prev.lastPayouts]
                }
            })
        }
        updateGameState((prev) => {
            return {
                ...prev,
                activeBets: prev.activeBets - 1
            }
        })
    }
    function getCollission() {
        const collission = gamePins.pins.find((pin) => {
            const dx = pin.x - graphic.x;
            const dy = pin.y - graphic.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            return (distance < gamePins.pinRadio + betRadio)
        })
        return collission
    }
}