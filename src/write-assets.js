const { writeFileSync } = require('fs')
const { join } = require('path')

const { types } = require('./constants')

const svg = 'colorblind-filters.svg'

const filters = Object.entries(types)
  .map(
    ([type, values]) =>
      `<filter id='${type}'><feColorMatrix in='SourceGraphic' type='matrix' values='${values}' /></filter>`
  )
  .join('')

writeFileSync(
  join(__dirname, `../${svg}`),
  `<svg xmlns='http://www.w3.org/2000/svg'><defs>${filters}</defs></svg>`
)

writeFileSync(
  join(__dirname, '../style.css'),
  Object.keys(types)
    .map(
      type =>
        `html.${type}{-webkit-filter:url('./${svg}#${type}');filter:url('./${svg}#${type}');}`
    )
    .join('')
)
