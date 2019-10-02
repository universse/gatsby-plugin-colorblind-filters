import React from 'react'

import { controlId } from './constants'

export const onRenderBody = (
  { setPostBodyComponents },
  { zIndex = 999 } = {}
) => {
  setPostBodyComponents([
    <div
      key={controlId}
      id={controlId}
      style={{
        backgroundColor: '#fff',
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        position: 'fixed',
        top: 8,
        right: 8,
        zIndex
      }}
    />
  ])
}
