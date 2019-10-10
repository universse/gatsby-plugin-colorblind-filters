const fs = require('fs')
const path = require('path')

const { svg, svgFile } = require('./constants')

exports.onPostBuild = ({ store }) => {
  const { directory } = store.getState().program

  fs.writeFileSync(path.join(directory, 'public', 'static', svgFile), svg)
}
