const fs = require('fs')
const path = require('path')

const { svgFile, types } = require('./constants')

exports.onPostBootstrap = ({ store }) => {
  const { directory } = store.getState().program

  const filters = Object.entries(types)
    .map(
      ([type, values]) =>
        `<filter id='${type}'><feColorMatrix in='SourceGraphic' type='matrix' values='${values}' /></filter>`
    )
    .join('')

  const svg = `<svg xmlns='http://www.w3.org/2000/svg'><defs>${filters}</defs></svg>`

  fs.writeFileSync(path.join(directory, 'public', 'static', svgFile), svg)
}
