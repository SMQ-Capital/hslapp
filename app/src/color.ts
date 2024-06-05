export type HslaColorArray = [number, number, number, number]
export type RgbaColorArray = [number, number, number, number]

export class Hsla {
    constructor(
        public h: number,
        public s: number,
        public l: number,
        public a = 1.0,
    ) {}

    get array(): HslaColorArray {
        return [this.h, this.s, this.l, this.a]
    }

    get hslString(): string {
        return `hsl(${~~this.h}, ${~~this.s}%, ${~~this.l}%)`
    }

    get hslaString(): string {
        return `hsla(${~~this.h}, ${~~this.s}%, ${~~this.l}%, ${this.a.toFixed(2)})`
    }

    get hexString(): string {
        return this.rgba.hexString
    }

    get rgbaString(): string {
        return `rgba(${this.rgba.array.join(', ')})`
    }

    get rgba(): Rgba {
        const hue = this.h / 360
        const sat = this.s / 100
        const lum = this.l / 100

        const q = lum <= 0.5 ? lum * (1 + sat) : lum + sat - lum * sat
        const p = 2 * lum - q

        const rt = hue + 1 / 3
        const gt = hue
        const bt = hue - 1 / 3

        const r = Hsla.hueToRgb(p, q, rt) * 255
        const g = Hsla.hueToRgb(p, q, gt) * 255
        const b = Hsla.hueToRgb(p, q, bt) * 255
        const a = this.a

        return new Rgba(r, g, b, a)
    }

    static hueToRgb(p: number, q: number, t: number): number {
        const h = t < 0 ? t + 1 : t > 1 ? t - 1 : t
        if (h * 6 < 1) {
            return p + (q - p) * 6 * h
        }
        if (h * 2 < 1) {
            return q
        }
        if (h * 3 < 2) {
            return p + (q - p) * (2 / 3 - h) * 6
        }
        return p
    }

    static fromString(value: string): Hsla | undefined {
        const regex =
            /hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\%\s*,\s*(\d{1,3})\%\s*,?\s*(0?\.?\d+)?\s*\)$/i
        const matches = value.match(regex)?.slice(1)
        if (!matches) {
            return undefined
        }
        const hsla = matches.filter(Boolean).map(Number.parseFloat)
        if (hsla.length === 3) {
            hsla.push(1)
        }
        if (hsla.length !== 4) {
            return undefined
        }
        return new Hsla(hsla[0], hsla[1], hsla[2], hsla[3])
    }
}

export class Rgba {
    constructor(
        public r: number,
        public g: number,
        public b: number,
        public a = 1.0,
    ) {}

    get array(): RgbaColorArray {
        return [this.r, this.g, this.b, this.a].map(
            Math.floor,
        ) as RgbaColorArray
    }

    get hexString(): string {
        return `#${this.array
            .slice(0, 3)
            .map(c => c.toString(16).padStart(2, '0'))
            .join('')}`
    }

    get hsla(): Hsla {
        const r = this.r / 255
        const g = this.g / 255
        const b = this.b / 255
        const a = this.a

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)

        let h = 0
        let s = 0
        let l = (max + min) / 2

        if (max !== min) {
            const d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0)
                    break
                case g:
                    h = (b - r) / d + 2
                    break
                case b:
                    h = (r - g) / d + 4
                    break
            }
            h /= 6
        }

        h = Math.round(h * 360)
        s = Math.round(s * 100)
        l = Math.round(l * 100)

        return new Hsla(h, s, l, a)
    }

    static fromString(value: string): Rgba | undefined {
        const regex =
            /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*(0?\.?\d+)?\s*\)$/i
        const matches = value.match(regex)?.slice(1)
        if (!matches) {
            return undefined
        }
        const rgba = matches.filter(Boolean).map(Number.parseInt)
        if (rgba.length === 3) {
            rgba.push(1)
        }
        if (rgba.length !== 4) {
            return undefined
        }
        return new Rgba(rgba[0], rgba[1], rgba[2], rgba[3])
    }
}

export class Hex {
    constructor(public hex: string) {}

    get rgba(): Rgba | undefined {
        const hex = this.hex.replace(/^#/, '')
        if (hex.length === 3) {
            const r = Number.parseInt(`${hex[0]}${hex[0]}`, 16)
            const g = Number.parseInt(`${hex[1]}${hex[1]}`, 16)
            const b = Number.parseInt(`${hex[2]}${hex[2]}`, 16)
            return new Rgba(r, g, b, 1)
        }
        if (hex.length === 6) {
            const r = Number.parseInt(hex.slice(0, 2), 16)
            const g = Number.parseInt(hex.slice(2, 4), 16)
            const b = Number.parseInt(hex.slice(4, 6), 16)
            return new Rgba(r, g, b, 1)
        }
        return undefined
    }

    get hsla(): Hsla | undefined {
        const rgba = this.rgba
        return rgba ? rgba.hsla : undefined
    }

    static fromString(value: string): Hex | undefined {
        // Try parsing a 6-digit hex color
        const regex6 = /^#?([0-9a-f]{6})$/i
        const matches6 = value.match(regex6)?.slice(1)
        if (matches6 && matches6[0].length === 6) {
            return new Hex(matches6[0])
        }

        // Try parsing a 3-digit hex color
        const regex3 = /^#?([0-9a-f]{3})$/i
        const matches3 = value.match(regex3)?.slice(1)
        if (matches3 && matches3[0].length === 3) {
            return new Hex(matches3[0])
        }

        return undefined
    }
}

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
        this.foreground = new Hsla(0, 0, 0, 0)
        this.background = new Hsla(0, 0, 0, 0)
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
