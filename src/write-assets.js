const { writeFileSync } = require('fs')
const { join } = require('path')

const { writeStyle, svg, svgFile } = require('./constants')

writeFileSync(join(__dirname, `../${svgFile}`), svg)

writeFileSync(join(__dirname, '../style.css'), writeStyle())
