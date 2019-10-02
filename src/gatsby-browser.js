import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

import { controlId, types } from './constants'
import './style.css'

const filterTypes = Object.keys(types)

function Filter ({ toggleKey }) {
  const [filter, setFilter] = useState(filterTypes[0])
  const [isActive, setIsActive] = useState(false)

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
    document.documentElement.classList.add(filter)

    return () => {
      document.documentElement.classList.remove(filter)
    }
  }, [filter])

  return (
    isActive &&
    createPortal(
      <div style={{ padding: '0.5rem 1rem', textTransform: 'capitalize' }}>
        {filter}
      </div>,
      document.getElementById(controlId)
    )
  )
}

Filter.propTypes = {
  toggleKey: PropTypes.string.isRequired
}

export const wrapPageElement = ({ element }, { toggleKey = 'p' } = {}) => (
  <>
    {element}
    <Filter toggleKey={toggleKey.toLowerCase()} />
  </>
)
