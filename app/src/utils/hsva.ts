export type HsvaColorArray = [number, number, number, number]

export class Hsva {
    constructor(
        public h: number,
        public s: number,
        public v: number,
        public a = 1.0,
    ) {}

    get array(): HsvaColorArray {
        return [this.h, this.s, this.v, this.a]
    }

    get swiftColorString(): string {
        const hue = (this.h / 360).toFixed(3)
        const sat = (this.s / 100).toFixed(2)
        const bri = (this.v / 100).toFixed(2)
        const includeAlpha = this.a < 1
        const alphaPart = includeAlpha ? `, opacity: ${this.a.toFixed(2)}` : ''
        return `Color(hue: ${hue}, saturation: ${sat}, brightness: ${bri}${alphaPart})`
    }

    static fromString(value: string): Hsva | undefined {
        const regex =
            /hsva?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\%\s*,\s*(\d{1,3})\%\s*,?\s*(0?\.?\d+)?\s*\)$/i
        const matches = value.match(regex)?.slice(1)
        if (!matches) {
            return undefined
        }
        const hsva = matches.filter(Boolean).map(Number.parseFloat)
        if (hsva.length === 3) {
            hsva.push(1)
        }
        if (hsva.length !== 4) {
            return undefined
        }
        return new Hsva(hsva[0], hsva[1], hsva[2], hsva[3])
    }
}
