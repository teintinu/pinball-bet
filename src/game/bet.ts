import { Application, Sprite } from "pixi.js";
import { animatePayOut, getGameState, incPayOutIdx, updateGameState } from "../state";
import { GamePayout, gamePayouts, gamePins } from "./board";
import { renderCollission } from "./collission";
import { sound } from "@pixi/sound";
import { allAssets } from "../assets";

export function createBet(app: Application) {
    const betRadio = gamePins.pinRadio * 2
    console.log(gamePins)
    const refSpeed = {
        y: gamePins.verticalGap * 0.2,
        x: gamePins.horizontalGap * 0.05,
    }
    console.log(refSpeed, app.view.height, app.view.height / gamePins.verticalGap)
    const speed = {
        x: 0,
        y: refSpeed.y,
    }
    const graphic = Sprite.from(allAssets.ballImage);
    graphic.anchor.set(0.5);
    graphic.scale.set(betRadio / 90);
    graphic.x = gamePins.appear.left + (Math.random() * (gamePins.appear.right - gamePins.appear.left));
    graphic.y = 0;
    const virtualWall = { left: 0, right: 0, top: 0 }
    const collissions: Record<number, boolean> = {}
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
            if (speed.y < 0 && !collissions[collission.y]) {
                virtualWall.top = collission.y - gamePins.verticalGap * 0.8
                virtualWall.left = collission.x - gamePins.horizontalGap * 0.4
                virtualWall.right = collission.x + gamePins.horizontalGap * 0.4
            }
            const force = (1 + Math.random() * 0.6)
            const angle = Math.atan2(graphic.y - collission.graphic.y, graphic.x - collission.graphic.x);
            if (speed.y < 0) speed.y = refSpeed.y * Math.sin(angle) * 1.7
            else speed.y = refSpeed.y * Math.sin(angle);
            speed.x = Math.cos(angle) * 1.7 * force;
            if (speed.x < 0 && speed.x > -1.4) speed.x = -1.4;
            if (speed.x > 0 && speed.x < 1.4) speed.x = 1.4;
            if (collissions[collission.y] && speed.y < 0) {
                speed.y = -refSpeed.y * 0.4;
            }
            collissions[collission.y] = true
            renderCollission(app, collission);
        } else {
            if (graphic.y < virtualWall.top) {
                speed.y = Math.abs(speed.y);
            }
            // if (graphic.x < virtualWall.left) {
            //     speed.x = Math.abs(speed.x) * 1.01;
            // } else if (graphic.x > virtualWall.right) {
            //     speed.x = -Math.abs(speed.x) * 1.01;
            // }
        }
        graphic.y += speed.y * delta;
        graphic.x += speed.x * delta;
        graphic.rotation += speed.x * delta * 0.05;
        if (graphic.y > gamePins.lastY) {
            finish();
        } else {
            if (speed.y < 0) speed.y += (gamePins.verticalGap * 0.023) * delta;
            else if (speed.y > 0) speed.y += 0.17 * delta;
            else speed.y = refSpeed.y;
            if (Math.abs(speed.x) < 0.03) speed.x = Math.random() * 0.3 - 0.05;
            else if (speed.x < 0) speed.x += 0.02 * delta;
            else if (speed.x > 0) speed.x -= 0.02 * delta;
            const coefPayOut = 0.004 * (gamePins.rows - 7) * Math.random();
            if (graphic.x > gamePayouts.prefererPayout.x) {
                if (speed.x > 0) speed.x -= coefPayOut * delta;
            } if (graphic.x < gamePayouts.prefererPayout.x) {
                if (speed.x < 0) speed.x += coefPayOut * delta;
            }
        }
    }
    function finish() {
        if (getGameState().playSounds) sound.play('pop');
        app.ticker.remove(animate);
        app.stage.removeChild(graphic);
        let curr: GamePayout | undefined
        let payout: GamePayout | undefined
        gamePayouts.payouts.find((p) => {
            payout = curr
            curr = p
            return (graphic.x <= p.x)
        })
        if (payout) {
            animatePayOut(payout.idx, true)
            updateGameState((prev) => {
                return {
                    ...prev,
                    balance: prev.balance + (prev.betValue * payout!.tax),
                    lastPayouts: [
                        ...prev.lastPayouts.slice(1),
                        {
                            idx: incPayOutIdx(),
                            x: 0,
                            y: 0,
                            style: payout!.style,
                            tax: payout!.tax,
                        }
                    ]
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