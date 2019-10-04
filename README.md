# gatsby-plugin-colorblind-filters

Color blindness simulation for Gatsby sites.

## Install

With Yarn:

```bash
yarn add gatsby-plugin-colorblind-filters
```

Or with npm:

```bash
npm install --save gatsby-plugin-colorblind-filters
```

## Usage

Add plugin to gatsby-config.js. Only recommended for development environment.

```js
plugins: [
  ...(process.env.NODE_ENV === 'development'
    ? [
        {
          resolve: 'gatsby-plugin-colorblind-filters',
          options: {
            toggleKey: 'p',
            zIndex: 999
          }
        }
      ]
    : []
  )
]
```

To activate different color-blindness mode, press `0/1/2/3/4/5/6/7/8` while holding `p`  in development. Works best in Chrome.

## Inspirations

[color-blindness-emulation](https://github.com/hail2u/color-blindness-emulation)

## License

MIT
