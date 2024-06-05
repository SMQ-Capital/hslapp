import type { ColorModel } from '../models'
import { Hsla } from '../utils'

class SliderConfig {
    public rangeInput: HTMLInputElement
    public textInput: HTMLInputElement

    constructor(public id: string) {
        this.rangeInput = document.getElementById(
            `${id}-slider`,
        ) as HTMLInputElement
        this.textInput = document.getElementById(
            `${id}-text`,
        ) as HTMLInputElement
    }
}

export default class ColorPickerController {
    private sliders: Array<SliderConfig> = [
        new SliderConfig('h'),
        new SliderConfig('s'),
        new SliderConfig('l'),
        new SliderConfig('a'),
    ]

    constructor(public colorModel: ColorModel) {
        // Listen for color model changes
        colorModel.onChange((tile, color) => {
            // Update all sliders
            for (const slider of this.sliders) {
                let value: string | undefined

                switch (slider.id) {
                    case 'h':
                        value = (~~color.h).toString()
                        break
                    case 's':
                        value = (~~color.s).toString()
                        break
                    case 'l':
                        value = (~~color.l).toString()
                        break
                    case 'a':
                        value = color.a.toFixed(2)
                        break
                }

                if (value === undefined) continue

                slider.rangeInput.value = value
                slider.textInput.value = value
            }

            // Update all slider backgrounds
            this.updateBackgrounds(color)
        })

        // Listen for slider changes
        for (const slider of this.sliders) {
            slider.rangeInput.addEventListener('input', e => {
                switch (slider.id) {
                    case 'h':
                        colorModel.hue = Number.parseInt(
                            slider.rangeInput.value,
                        )
                        break
                    case 's':
                        colorModel.sat = Number.parseInt(
                            slider.rangeInput.value,
                        )
                        break
                    case 'l':
                        colorModel.lum = Number.parseInt(
                            slider.rangeInput.value,
                        )
                        break
                    case 'a':
                        colorModel.alpha = Number.parseFloat(
                            slider.rangeInput.value,
                        )
                        break
                }
            })
        }

        this.updateBackgrounds()
    }

    updateBackgrounds(color: Hsla = this.colorModel.activeTileColor) {
        for (const slider of this.sliders) {
            let index: number | undefined
            let size: number | undefined
            let multiplier: number | undefined

            switch (slider.id) {
                case 'h':
                    index = 0
                    size = 36
                    multiplier = 10
                    break
                case 's':
                    index = 1
                    size = 5
                    multiplier = 20
                    break
                case 'l':
                    index = 2
                    size = 5
                    multiplier = 20
                    break
                case 'a':
                    index = 3
                    size = 5
                    multiplier = 0.2
                    break
            }

            if (
                index === undefined ||
                size === undefined ||
                multiplier === undefined
            )
                continue

            const colors = []
            for (const i of Array(size).keys()) {
                const colorArray = color.array
                colorArray[index] = i * multiplier
                colors.push(new Hsla(...colorArray).hslaString)
            }

            const gradient = `linear-gradient(left, ${colors.join(', ')})`
            slider.rangeInput.style.background = this.prefixedCssValue(
                'background',
                gradient,
            )
        }
    }

    prefixedCssValue(property: string, value: string): string {
        const el = document.createElement('div')
        const style = el.style
        const domPrefixes = ['webkit', 'moz', 'ms', 'o']
        let result: string | undefined = undefined

        if (property in style) {
            let i = domPrefixes.length

            style.setProperty(property, value)
            result = style.getPropertyValue(property)

            while (i-- && !result) {
                style.setProperty(property, `-${domPrefixes[i]}-${value}`)
                result = style.getPropertyValue(property)
            }
        }

        return result || value
    }
}
