import {
  colorblindFilterMap,
  colorblindFilterTypes,
  dataAttribute
} from './constants'

export default function createColorblindFilters () {
  const svgNode = document.createElement('div')
  svgNode.style.height = 0

  const filters = Object.entries(colorblindFilterMap)
    .map(
      ([type, values]) =>
        `<filter id='${type}'><feColorMatrix in='SourceGraphic' type='matrix' values='${values}' /></filter>`
    )
    .join('')

  svgNode.innerHTML = `<svg height='0' width='0' xmlns='http://www.w3.org/2000/svg'>${filters}</svg>`
  document.body.appendChild(svgNode)

  const styleNode = document.createElement('style')

  const style = colorblindFilterTypes
    .map(type => {
      const filterValue = `url('#${type}')`
      return `html[${dataAttribute}='${type}']{-webkit-filter:${filterValue};filter:${filterValue};}`
    })
    .join('')

  styleNode.innerHTML = style
  document.body.appendChild(styleNode)
}
