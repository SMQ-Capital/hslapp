import { Hsla } from '.'

export type RgbaColorArray = [number, number, number, number]

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
