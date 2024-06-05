import { Rgba } from '.'

export type HslaColorArray = [number, number, number, number]

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
