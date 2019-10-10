const types = {
  // none: '1,0,0,0,0 0,1,0,0,0 0,0,1,0,0 0,0,0,1,0',
  protanopia: '0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0',
  protanomaly:
    '0.817,0.183,0,0,0 0.333,0.667,0,0,0 0,0.125,0.875,0,0 0,0,0,1,0',
  deuteranopia: '0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0',
  deuteranomaly: '0.8,0.2,0,0,0 0.258,0.742,0,0,0 0,0.142,0.858,0,0 0,0,0,1,0',
  tritanopia: '0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0',
  tritanomaly:
    '0.967,0.033,0,0,0 0,0.733,0.267,0,0 0,0.183,0.817,0,0 0,0,0,1,0',
  achromatopsia:
    '0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0',
  achromatomaly:
    '0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0'
}

const filters = Object.entries(types)
  .map(
    ([type, values]) =>
      `<filter id='${type}'><feColorMatrix in='SourceGraphic' type='matrix' values='${values}' /></filter>`
  )
  .join('')

const dataAttribute = 'data-filter'

const svgFile = 'colorblind-filters.svg'

const writeStyle = (isProduction = false) => {
  return Object.keys(types)
    .map(type => {
      const svgPath = `${svgFile}#${type}`

      const filterPath = isProduction ? `/static/${svgPath}` : `./${svgPath}`

      return `html[${dataAttribute}='${type}']{-webkit-filter:url('${filterPath}');filter:url('${filterPath}');}`
    })
    .join('')
}

const svg = `<svg xmlns='http://www.w3.org/2000/svg'><defs>${filters}</defs></svg>`

module.exports = {
  controlId: 'color-blind-filters-control',
  dataAttribute,
  writeStyle,
  svg,
  svgFile,
  types
}
