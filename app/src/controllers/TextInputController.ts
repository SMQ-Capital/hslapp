import type ColorModel from '../models/ColorModel'

function setText(id: string, text: string) {
    const el = document.getElementById(id) as HTMLInputElement
    el.value = text
}

function query(selector: string): HTMLElement {
    return document.querySelector(selector) as HTMLElement
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

export default class TextInputController {
    constructor(public colorModel: ColorModel) {
        // Update all text inputs on color change
        colorModel.onChange((_tile, color) => {
            setText('hex', color.hexString)
            setText('rgba', color.rgbaString)
            setText('hsla', color.hslaString)
            setText('h-text', color.h.toString())
            setText('s-text', color.s.toString())
            setText('l-text', color.l.toString())
            setText('a-text', color.a.toString())
        })

        // Listen for text input changes
        query('#hex').addEventListener('input', e => {
            const value = (e.target as HTMLInputElement).value
            colorModel.updateFromHex(value)
        })
        query('#rgba').addEventListener('input', e => {
            const value = (e.target as HTMLInputElement).value
            colorModel.updateFromRgba(value)
        })
        query('#hsla').addEventListener('input', e => {
            const value = (e.target as HTMLInputElement).value
            colorModel.updateFromHsla(value)
        })
        query('#h-text').addEventListener('input', e => {
            const value = (e.target as HTMLInputElement).value
            const intValue = Number.parseInt(value)
            if (Number.isNaN(intValue)) return
            colorModel.hue = clamp(intValue, 0, 360)
        })
        query('#s-text').addEventListener('input', e => {
            const value = (e.target as HTMLInputElement).value
            const intValue = Number.parseInt(value)
            if (Number.isNaN(intValue)) return
            colorModel.sat = clamp(intValue, 0, 100)
        })
        query('#l-text').addEventListener('input', e => {
            const value = (e.target as HTMLInputElement).value
            const intValue = Number.parseInt(value)
            if (Number.isNaN(intValue)) return
            colorModel.lum = clamp(intValue, 0, 100)
        })
        query('#a-text').addEventListener('input', e => {
            const value = (e.target as HTMLInputElement).value
            const floatValue = Number.parseFloat(value)
            if (Number.isNaN(floatValue)) return
            colorModel.sat = clamp(floatValue, 0, 1)
        })
    }
}
