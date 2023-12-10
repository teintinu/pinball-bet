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
    apear: {
        left: 0,
        right: 0,
    },
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
    const verticalGap = (app.view.height * 0.97) / rows
    const horizontalGap = (app.view.width * 0.9) / (rows + 2)
    gamePins.pinRadio = horizontalGap / 10
    gamePins.pins = []
    gamePayouts.payouts = []
    let y = verticalGap
    let squareX = 0
    for (let row = 1; row <= rows; row++) {
        gamePins.lastY = y
        let x = (app.view.width * 0.03) + ((app.view.width - (horizontalGap * pinPerRow)) / 2)
        squareX = x
        if (row === 1) gamePins.apear.left = x
        for (let pin = 1; pin <= pinPerRow; pin++) {
            const graphic = new Graphics()
            graphic.beginFill(0xffffff)
            graphic.drawCircle(0, 0, gamePins.pinRadio)
            graphic.endFill();
            graphic.x = x
            graphic.y = y
            if (row === 1) gamePins.apear.right = x
            app.stage.addChild(graphic)
            gamePins.pins.push({
                x,
                y,
                graphic,
            });
            x += horizontalGap
        }
        pinPerRow += 1
        y += verticalGap
    }
    const squareCount = pinPerRow - 2
    gamePayouts.squareWidth = horizontalGap * 0.8
    gamePayouts.squareHeight = verticalGap * 0.4
    gamePayouts.prefererPayout = { tax: Infinity } as GamePayout
    squareX += horizontalGap * 0.1
    y -= verticalGap * 0.7
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
        squareX += horizontalGap
        colorIdx -= colorGap
        // console.log(i, colorIdx, colorGap)
        if (colorIdx < 0) {
            colorIdx = squareCount % 2 === 0 ? 0 : colorGap
            colorGap = -colorGap
        }
    }
}
