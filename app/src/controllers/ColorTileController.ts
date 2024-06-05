import type { default as ColorModel, ColorTile } from '../models/ColorModel'
import { Hsla } from '../utils'

function query(selector: string): HTMLElement {
    return document.querySelector(selector) as HTMLElement
}

export default class ColorTileController {
    constructor(readonly colorModel: ColorModel) {
        // Get the elements from the DOM
        const elForeground = query('.foreground')
        const elBackground = query('.background')
        const elForegroundColor = query('.foreground-color')
        const elBackgroundColor = query('.background-color')
        const elExpose = query('.expose')
        const elColorTiles = query('.color-tiles')

        // Handle color model changes
        colorModel.onChange((tile, color) => {
            const elLookup: Record<ColorTile, HTMLElement> = {
                foreground: elForegroundColor,
                background: elBackgroundColor,
            }
            elLookup[tile].style.backgroundColor = color.hslaString
        })

        // Handle expose button click
        elExpose.addEventListener('click', () => {
            elColorTiles.classList.toggle('exposed')
            // $('.slider').css 'background-color', if $('.color-tiles').is('.exposed') then 'transparent' else @model.background.hslaString
            elForeground.click()
        })

        // Handle clicks on a specific tile
        function handleTileClick(tile: ColorTile) {
            return (e: MouseEvent) => {
                const target = e.target as HTMLElement
                if (target.classList.contains('selected')) {
                    return
                }
                colorModel.activeTile = tile
                const selectedElements = document.querySelectorAll('.selected')
                for (const el of selectedElements) {
                    el.classList.remove('selected')
                }
                target.classList.add('selected')
            }
        }

        // Handle foreground and background tile clicks
        elForeground.addEventListener('click', handleTileClick('foreground'))
        elBackground.addEventListener('click', handleTileClick('background'))
    }
}
