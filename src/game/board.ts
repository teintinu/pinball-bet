import { Application, Graphics } from "pixi.js";
import { getGameState } from "../state";
import { payoutConstants, payoutPallete } from "./payoutConstants";

export interface GamePin {
    x: number
    y: number
    graphic: Graphics
}

export interface GamePayout {
    idx: number
    x: number
    y: number,
    tax: number,
    style: string,
}

export const gamePins = {
    pinRadio: 0,
    appear: {
        left: 0,
        right: 0,
    },
    rows: 0,
    verticalGap: 0.01, 
    horizontalGap: 0.01,
    lastY: 0,
    pins: [] as GamePin[]
}

export const gamePayouts = {
    squareWidth: 0,
    squareHeight: 0,
    prefererPayout: { tax: Infinity } as GamePayout,
    payouts: [] as GamePayout[]
}

export function createBoard(app: Application) {
    const { rows, risk } = getGameState()
    let pinPerRow = 3
    gamePins.verticalGap = (app.view.height * 0.9) / rows
    gamePins.horizontalGap = (app.view.width * 0.9) / (rows + 2)
    gamePins.pinRadio = gamePins.horizontalGap / 10
    gamePins.pins = []
    gamePins.rows = rows
    gamePayouts.payouts = []
    let y = gamePins.verticalGap
    let squareX = 0
    for (let row = 1; row <= rows; row++) {
        let x = (app.view.width * 0.03) + ((app.view.width - (gamePins.horizontalGap * pinPerRow)) / 2)
        squareX = x
        if (row === 1) gamePins.appear.left = x
        for (let pin = 1; pin <= pinPerRow; pin++) {
            const graphic = new Graphics()
            graphic.beginFill(0xffffff)
            graphic.drawCircle(0, 0, gamePins.pinRadio)
            graphic.endFill();
            graphic.x = x
            graphic.y = y
            if (row === 1) gamePins.appear.right = x
            app.stage.addChild(graphic)
            gamePins.pins.push({
                x,
                y,
                graphic,
            });
            x += gamePins.horizontalGap
        }
        pinPerRow += 1
        y += gamePins.verticalGap
        gamePins.lastY = y
    }
    const squareCount = pinPerRow - 2
    gamePayouts.squareWidth = gamePins.horizontalGap * 0.8
    gamePayouts.squareHeight = gamePins.verticalGap * 0.4
    gamePayouts.prefererPayout = { tax: Infinity } as GamePayout
    squareX += gamePins.horizontalGap * 0.1
    y -= gamePins.verticalGap * 0.7
    let colorGap = (payoutPallete.length - 1) / (squareCount / 2)
    let colorIdx = payoutPallete.length - 1;
    const textClass = squareCount > 12 ? ' text-xs' : ' text-sm'
    for (let i = 0; i < squareCount; i++) {
        // const colorIdx = Math.round(Math.abs(i - payoutCenter + 1) / payoutCenter * payoutPallete.length)
        // console.log(i, i - payoutCenter, payoutCenter, Math.abs(i - payoutCenter) / payoutCenter, colorIdx)
        const p: GamePayout = {
            idx: i,
            x: squareX,
            y,
            tax: payoutConstants[risk][rows][i],
            style: payoutPallete[Math.round(colorIdx)] + textClass
        }
        if (p.tax < gamePayouts.prefererPayout.tax) gamePayouts.prefererPayout = p
        gamePayouts.payouts.push(p);
        squareX += gamePins.horizontalGap
        colorIdx -= colorGap
        // console.log(i, colorIdx, colorGap)
        if (colorIdx < 0) {
            colorIdx = squareCount % 2 === 0 ? 0 : colorGap
            colorGap = -colorGap
        }
    }
}
