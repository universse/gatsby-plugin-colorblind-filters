const { existsSync, mkdirSync, writeFileSync } = require('fs')
const { join } = require('path')

const { svg, types } = require('./constants')

const filters = Object.entries(types)
  .map(
    ([type, values]) =>
      `<filter id='${type}'><feColorMatrix in='SourceGraphic' type='matrix' values='${values}' /></filter>`
  )
  .join('')

exports.onPreInit = ({ store }) => {
  const { directory } = store.getState().program

  const staticPath = join(directory, 'static')

  if (!existsSync(staticPath)) {
    mkdirSync(staticPath)
  }

  writeFileSync(
    join(staticPath, svg),
    `<svg xmlns='http://www.w3.org/2000/svg'><defs>${filters}</defs></svg>`
  )
}
