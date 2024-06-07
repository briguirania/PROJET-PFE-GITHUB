import React from 'react'
import UseBootStream from '../components/Boot'

export default function StreamComponent() {
    const {codeLines,textLines,lines,language}=UseBootStream('say hello')
  return (
    <div>
      {textLines}
    </div>
  )
}
