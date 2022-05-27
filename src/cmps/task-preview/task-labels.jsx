import React from "react"

export function TaskLabels({ labels }) {
    return labels.map(label => <div className="label" style={{ backgroundColor: label }} key={label}></div>)
}