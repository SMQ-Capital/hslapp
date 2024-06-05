# The greatest HSL picker in the world
> Now with a modern code base, and additional features.

## Fork Notice
> This is a fork of [imathis/hsl-picker](https://github.com/imathis/hsl-picker).  

The original project hasn't been maintained for 11 years, and I wanted to make some improvements. There were no other forks with meaningful changes, probably because the code base was very outdated and almost nothing worked anymore.

<details>
  <summary>What was changed and why</summary>

  ### TLDR
  This is now a **modern**, runtime **dependency-free**, and **maintainable** version of the original project. It's **ready for the future** and can be easily extended and improved upon.

  ### Overview
  Our main goal was to - first off - make the project build again. But we also wanted to modernize the code base, remove unnecessary dependencies, and make it fit for the future.

  This is an amazing project that deserves to be maintained and used by people. It's a great tool for designers and developers alike, and we wanted to make sure it stays that way.

  ### Details
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

</details>

## Building the project

```shell
$ npm install
$ npm run dev     # development server
$ npm run build   # production build
```

## What's so great about HSL

HSL (Hue, Saturation, Lightness) is a great color model for several reasons:

- **Intuitive**: It describes colors in a way that makes sense to humans.
- **Easy Adjustments**: You can easily tweak colors to be lighter, darker, more vivid, or more muted without complex calculations.
- **Design Flexibility**: Perfect for creating harmonious color schemes and ensuring consistency across your designs.

In summary, HSL is a powerful color model that combines intuitive color manipulation, efficient conversion, wide gamut coverage, and precise color control. Its advantages make it a preferred choice for designers, artists, and anyone working extensively with color.

## How to think in HSL

- **Hue**: The color itself on a 360-degree wheel, starting at red (`0`) and cycling through the visible color spectrum until it arrives at red again (`360`).
- **Saturation**: The vividness or intensity of the color, from `0%` (gray) to `100%` (most vivid).
- **Lightness**: The brightness of the color, from `0%` (black) to `100%` (white).
