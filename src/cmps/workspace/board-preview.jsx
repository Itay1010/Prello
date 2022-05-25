import React from "react"

export const BoardPreview = ({ count }) => {
    return <section className="board-preview-body">
        {new Array(count).fill(<div></div>, 0)}
    </section>
}