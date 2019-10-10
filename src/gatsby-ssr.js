import React from 'react'

import { controlId, writeStyle } from './constants'

export const onRenderBody = (
  { setPostBodyComponents },
  { zIndex = 999 } = {}
) => {
  const postBodyComponents = [
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
  ]

  process.env.NODE_ENV === 'production' &&
    postBodyComponents(
      <style
        key='colorblind-filters'
        dangerouslySetInnerHTML={{ __html: writeStyle(true) }}
      />
    )

  setPostBodyComponents(postBodyComponents)
}
