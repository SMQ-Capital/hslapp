# The greatest HSL picker in the world
> Now with a modern code base, and additional features.

## Fork Notice

This is a fork of [imathis/hsl-picker](https://github.com/imathis/hsl-picker).

The original project hasn't been maintained for 11 years, and I wanted to make some improvements. There were no other forks with meaningful changes, probably because the code base was very outdated and almost nothing worked anymore.

**What was changed**
- Modernized codebase
  - Removed jQuery, Underscore, Backbone... all gone
  - Migrated all Backbone models and views to plain classes
  - Migrated all CoffeeScript to TypeScript
  - Refactored large parts of the code
- Modernized styling
  - Removed Compass (very outdated)
  - Removed lots of unnecessary scss rules
  - Removed unnecessary width constraints
  - Migrated the layout to flexbox
- Modernized tooling
  - Integrated biome for linting and formatting
  - Replaced guard with parcel for a modern build process

This is now a **modern**, **dependency-free**, **and maintainable** version of the original project.

## What's so great about HSL

HSL is a great color model for several reasons:

- **It's more intuitive than RGB**, making it easier for designers and artists to work with colors precisely. The hue, saturation, and lightness values directly correspond to how we perceive color.
- HSL allows for **more efficient color conversion** between different color spaces, which is crucial for color matching, grading, and other color-related tasks.
- HSL provides **more consistent and accurate** color representation compared to RGB. This consistency is key for maintaining color accuracy across different devices and applications.
- Working with colors in HSL mode offers **greater precision** when making adjustments. You can tweak the hue, saturation, or lightness independently to achieve the exact color you want.

In summary, HSL is a powerful color model that combines intuitive color manipulation, efficient conversion, wide gamut coverage, and precise color control. Its advantages make it a preferred choice for designers, artists, and anyone working extensively with color.

## How to think in HSL

Pick a Hue from 0 to 360 and with saturation at 100 and lightness at 50 and you'll have the purest form of that color. Reduce the saturation and you move towards gray. Increasing the brightness moves you towards white, decreasing it moves you towards black.

## License

```
Copyright (c) 2011 Brandon Mathis
Copyright (c) 2024 Marco Quinten

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```