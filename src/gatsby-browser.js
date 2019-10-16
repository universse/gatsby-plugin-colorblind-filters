import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

import createColorblindFilters from './createColorblindFilters'
import { colorblindFilterTypes, dataAttribute } from './constants'

export const onInitialClientRender = () => {
  createColorblindFilters()
}

const filterTypes = ['none', ...colorblindFilterTypes]

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
