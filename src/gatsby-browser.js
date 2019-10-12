import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

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

export const createColorblindFilters = () => {
  const svgNode = document.createElement('div')
  svgNode.style.height = 0

  const filters = Object.entries(types)
    .map(
      ([type, values]) =>
        `<filter id='${type}'><feColorMatrix in='SourceGraphic' type='matrix' values='${values}' /></filter>`
    )
    .join('')

  svgNode.innerHTML = `<svg height='0' width='0' xmlns='http://www.w3.org/2000/svg'>${filters}</svg>`
  document.body.appendChild(svgNode)

  const styleNode = document.createElement('style')

  const style = Object.keys(types)
    .map(type => {
      const filterValue = `url('#${type}')`
      return `html[${dataAttribute}='${type}']{-webkit-filter:${filterValue};filter:${filterValue};}`
    })
    .join('')

  styleNode.innerHTML = style
  document.body.appendChild(styleNode)
}

export const onInitialClientRender = () => {
  createColorblindFilters()
}

const dataAttribute = 'data-filter'
const filterTypes = Object.keys(types)
filterTypes.unshift('none')

function Display ({ toggleKey, zIndex }) {
  const [filter, setFilter] = useState(filterTypes[0])
  const [isActive, setIsActive] = useState(false)
  const controlNode = useRef()

  useEffect(() => {
    controlNode.current = document.createElement('div')
    document.body.appendChild(controlNode.current)
  }, [])

  useEffect(() => {
    const onKeyDown = e => {
      e.key === toggleKey && setIsActive(true)
      isActive && setFilter(filter => filterTypes[e.key] || filter)
    }

    const onKeyUp = e => {
      e.key === toggleKey && setIsActive(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [isActive, toggleKey])

  useEffect(() => {
    document.documentElement.setAttribute(dataAttribute, filter)
  }, [filter])

  return (
    <>
      {isActive &&
        createPortal(
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: 4,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              fontSize: 18,
              position: 'fixed',
              top: 8,
              right: 8,
              zIndex
            }}
          >
            <div
              style={{ padding: '0.5rem 1rem', textTransform: 'capitalize' }}
            >
              {filter}
            </div>
          </div>,
          controlNode.current
        )}
    </>
  )
}

Display.propTypes = {
  toggleKey: PropTypes.string.isRequired,
  zIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export const wrapPageElement = (
  { element },
  { toggleKey = 'p', zIndex = 999 } = {}
) => (
  <>
    {element}
    <Display toggleKey={toggleKey.toLowerCase()} zIndex={zIndex} />
  </>
)
