import React from 'react'

import { controlId, dataAttribute, svgFile, types } from './constants'

export const onRenderBody = (
  { setPostBodyComponents },
  { zIndex = 999 } = {}
) => {
  const style = Object.keys(types)
    .map(type => {
      const filterPath = `/static/${svgFile}#${type}`
      return `html[${dataAttribute}='${type}']{-webkit-filter:url('${filterPath}');filter:url('${filterPath}');}`
    })
    .join('')

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
    />,
    <style
      key='colorblind-filters-style'
      dangerouslySetInnerHTML={{ __html: style }}
    />
  ])

  // add option, add prefetch
}
