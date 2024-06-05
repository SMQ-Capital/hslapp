import {
    ColorPickerController,
    ColorTileController,
    TextInputController,
} from './controllers'
import { ColorModel } from './models'
import { Hex, Hsla } from './utils'

const SLOGANS = [
    'a most excellent',
    "the wizard's choice",
    'a dazzingly accurate',
    'a seriously awesome',
    'a delightfully simple',
    'a perfectly balanced',
    'a deliciously vibrant',
    'a deliciously tasteful',
    'an incredibly stylish',
    'a beautifully crafted',
    'an amazingly versatile',
    'a stunningly elegant',
    'a fantastically fresh',
    'a superbly sophisticated',
    'a marvelously minimal',
    'a wonderfully whimsical',
    'a perfectly precise',
]

class AppController {
    private readonly customStyle: HTMLStyleElement
    private readonly subcontrollers: Array<
        ColorPickerController | ColorTileController | TextInputController
    > = []

    constructor(public colorModel: ColorModel) {
        // Instantiate sub controllers
        this.subcontrollers = [
            new ColorTileController(colorModel),
            new ColorPickerController(colorModel),
            new TextInputController(colorModel),
        ]

        // Create custom style sheet
        this.customStyle = document.createElement('style')
        document.head.appendChild(this.customStyle)

        // Determine initial color
        const initialColor: Hsla =
            (() => {
                const hash = window.location.hash
                if (!hash) return undefined
                return Hex.fromString(hash)?.rgba?.hsla
            })() ?? colorModel.randomColor()

        // Set initial color and page style
        colorModel.updateFromHsla(initialColor)
        this.updatePageStyle(initialColor)

        // Handle color changes
        colorModel.onChange((_tile, color) => {
            this.updatePageStyle(color)
            window.location.hash = color.hexString.replaceAll('#', '')
        })

        // Replace slogan
        const slogan = document.getElementById('slogan') as HTMLElement
        slogan.textContent = SLOGANS[Math.floor(Math.random() * SLOGANS.length)]
    }

    updatePageStyle(color: Hsla) {
        const linkHover = new Hsla(color.h, 100, 70, 1)
        const paragraphs = new Hsla(color.h, 40, 70, 1)
        const headingsAndCode = new Hsla(color.h, 40, 70, 1)
        const bodyColor = new Hsla(color.h, 2, 16, 1)
        this.customStyle.innerText = `
            html {
                background-color: ${bodyColor.hslaString};
            }
            body a:hover {
                color: ${linkHover.hslaString} !important;
            }
            h1 {
                text-shadow: ${this.getTextShadow(color)} !important;
            }
            h1 + p {
                color: ${paragraphs.hslaString};
            }
            h2, h3, code {
                color: ${headingsAndCode.hslaString};
            }
        `
    }

    getTextShadow(color: Hsla) {
        const sat = color.l < 35 || color.l > 80 ? 30 : color.s
        const lum = color.l < 35 ? 35 : color.l > 80 ? 80 : color.l
        const shadowColor = new Hsla(color.h, Math.round(sat / 2.7), lum)
        const colors = []
        for (let i = 0; i < 5; i++) {
            const adjustedColor = new Hsla(
                shadowColor.h,
                shadowColor.s,
                shadowColor.l + 1,
                color.a,
            )
            colors.push(adjustedColor.hslaString)
        }
        return [
            `${colors[0]} 0px 1px 0px`,
            `${colors[1]} 0px 2px 0px`,
            `${colors[2]} 0px 3px 0px`,
            `${colors[3]} 0px 4px 0px`,
            'rgba(0, 0, 0, 0.2) 0px 5px 1px',
            'rgba(0, 0, 0, 0.3) 0px 0px 10px',
            'rgba(0, 0, 0, 0.4) 0px 3px 5px',
            'rgba(0, 0, 0, 0.5) 0px 6px 5px',
            'rgba(0, 0, 0, 0.6) 0px 10px 10px',
        ].join(', ')
    }
}

export default function initApp() {
    const colorModel = new ColorModel()
    return new AppController(colorModel)
}
