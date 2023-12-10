import { Application } from "pixi.js";
import { createBoard } from "./board";
import { createBet } from "./bet";
import { getGameState, updateGameState } from "../state";
import { sound } from "@pixi/sound";
import { allAssets } from "../assets";

let app: Application

export function renderGame(element: HTMLElement) {
    if (app) {
        app.stage.removeChildren()
    } else {
        sound.add('blep', allAssets.blepSound);
        sound.add('pop', allAssets.popSound);
        app = new Application({
            background: '#111827',
            antialias: true,
        });
    }
    app.view.width = element.clientWidth;
    app.view.height = element.clientHeight;
    createBoard(app);
    element.appendChild(app.view as never);
}

export function gameBet(manualSoundEffect: boolean) {
    const { balance, betValue, playSounds } = getGameState()
    if (balance < betValue) {
        updateGameState((prev) => {
            return {
                ...prev,
                mode: 'manual',
            }
        })
        return
    }
    if (manualSoundEffect && playSounds) sound.play('blep');
    createBet(app);
}
