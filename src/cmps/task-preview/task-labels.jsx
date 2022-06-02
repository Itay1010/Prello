import React, { useState } from "react"

export function TaskLabels({ labels }) {
    const [isExpand, setExpand] = useState(false)

    const toggleLabelsSize = (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
        setExpand(!isExpand)

    }

    return labels.map(label => {
        return <div className={isExpand ? 'label expanded' : 'label'}
            // onClick={(event) => toggleLabelsSize(event)}
            style={{ backgroundColor: label }} key={label}></div>
    })

}
