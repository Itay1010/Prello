import React, { useState } from "react"



export function TaskLabels({ labels }) {
    const [ isExpand, setExpand] = useState(false)

    const toggleLabelsSize = (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
        // setExpand(prevState => !prevState)
        setExpand(!isExpand)

    }

   
    
    return labels.map(label => {
        return <div className={isExpand? 'label expanded' : 'label'} 
        onClick={(event)=>toggleLabelsSize(event)} 
        style={{ backgroundColor: label }} key={label}></div>    
    })

}

// export function TaskLabels({ labels }) {
//     const { isExpand, setExpand } = useState(false)
    
//     return labels.map(label => <div className={`label ${isExpand ? 'expanded' : ''}`} onMouseDown={ev => {
//         ev.stopPropagation()
//         ev.preventDefault()
//         setExpand(prevState => !prevState)
//     }} style={{ backgroundColor: label }} key={label}></div>)
// }