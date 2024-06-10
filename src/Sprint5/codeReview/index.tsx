import React from 'react'
import UseBootStream from '../components/Boot'
import Editor from '../components/Editor'

export default function StreamComponent({prompt}) {
    const {codeLines,textLines,lines,language}=UseBootStream(prompt!)
  return (
    <div style={{color:'white'}}>
        <Editor file={{
              content: '',
              name: '',
              path: ''
          }}
          readyToUse={codeLines} 
          language={language}/>

      {textLines}
    </div>
  )
}
