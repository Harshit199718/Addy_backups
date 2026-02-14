import React from 'react'
import "./Popover.css"

function Popover({children, className}) {
  return (
    <div id='popover_container' className={`px-3 pt-2 ${className?className:""}`}>
        {children}
    </div>
  )
}

export default Popover