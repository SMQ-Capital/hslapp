import { type Hsla, Rgba } from '.'

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
