import { Hex, Hsla, Rgba } from '../utils'

export type ColorTile = 'foreground' | 'background'
export type ColorChangeEvent = 'foreground' | 'background'
export type ColorChangeListener = (color: Hsla) => void
export type TileColorChangeListener = (tile: ColorTile, color: Hsla) => void

export default class ColorModel {
    /** The foreground tile color. */
    public foreground: Hsla

    /** The background tile color. */
    public background: Hsla

    /** The currently active tile. */
    private innerActiveTile: ColorTile

    /** Listeners for tile color change events. */
    private changeListeners: Array<TileColorChangeListener> = []

    constructor() {
        this.innerActiveTile = 'foreground'
        this.foreground = new Hsla(0, 50, 50, 1)
        this.background = new Hsla(0, 50, 50, 0)
    }

    get activeTile(): ColorTile {
        return this.innerActiveTile
    }

    set activeTile(tile: ColorTile) {
        this.innerActiveTile = tile

        for (const listener of this.changeListeners) {
            listener(tile, this.activeTileColor)
        }
    }

    get activeTileColor(): Hsla {
        return this.activeTile === 'foreground'
            ? this.foreground
            : this.background
    }

    set activeTileColor(color: Hsla | undefined) {
        if (color === undefined) {
            return
        }
        if (this.activeTile === 'foreground') {
            this.foreground = color
        } else {
            this.background = color
        }
        for (const listener of this.changeListeners) {
            listener(this.activeTile, color)
        }
    }

    get hue(): number | undefined {
        return this.activeTileColor.h
    }

    set hue(value: number | undefined) {
        if (value === undefined) {
            return
        }
        const newColor = this.activeTileColor
        newColor.h = value
        this.updateFromHsla(newColor)
    }

    get sat(): number | undefined {
        return this.activeTileColor.s
    }

    set sat(value: number | undefined) {
        if (value === undefined) {
            return
        }
        const newColor = this.activeTileColor
        newColor.s = value
        this.updateFromHsla(newColor)
    }

    get lum(): number | undefined {
        return this.activeTileColor.l
    }

    set lum(value: number | undefined) {
        if (value === undefined) {
            return
        }
        const newColor = this.activeTileColor
        newColor.l = value
        this.updateFromHsla(newColor)
    }

    get alpha(): number | undefined {
        return this.activeTileColor.a
    }

    set alpha(value: number | undefined) {
        if (value === undefined) {
            return
        }
        const newColor = this.activeTileColor
        newColor.a = value
        this.updateFromHsla(newColor)
    }

    randomColor(): Hsla {
        const hue = Math.floor(Math.random() * 360)
        return new Hsla(hue, 100, 50, 1)
    }

    onChange(listener: TileColorChangeListener): void {
        this.changeListeners.push(listener)
    }

    updateFromHsla(hsla?: string | Hsla): void {
        if (hsla === undefined) {
            return
        }
        if (typeof hsla === 'string') {
            const parsed = Hsla.fromString(hsla)
            if (!parsed) {
                return
            }
            this.activeTileColor = parsed
        } else {
            this.activeTileColor = hsla
        }
    }

    updateFromRgba(rgba?: string | Rgba): void {
        if (rgba === undefined) {
            return
        }
        if (typeof rgba === 'string') {
            this.updateFromHsla(Rgba.fromString(rgba)?.hsla)
        } else {
            this.updateFromHsla(rgba.hsla)
        }
    }

    updateFromHex(hex?: string | Hex): void {
        if (hex === undefined) {
            return
        }
        if (typeof hex === 'string') {
            this.updateFromHsla(Hex.fromString(hex)?.hsla)
        } else {
            this.updateFromHsla(hex.hsla)
        }
    }
}
