const tinycolor = require('tinycolor2')


export const draggableStyle = {
    getStyle
}

function getStyle(style, snapshot, provided, groupColor) {
    groupColor = groupColor ? tinycolor(groupColor).lighten(20) : groupColor
    if (snapshot.isDropAnimating) {
        const { moveTo, curve, duration } = snapshot.dropAnimation

        const skew = `rotate(0deg)`
        const translate = moveTo ? `translate(${moveTo.x}px, ${moveTo.y}px)` : ''

        return {
            ...style,
            transform: `${translate} ${skew} `,
            backgroundColor: groupColor,
        }
    }

    else if (snapshot.isDragging) {
        const skew = `rotate(3deg)`
        return {
            ...style,
            transform: `${style.transform} ${skew}`,
            backgroundColor: groupColor,

        }
    }
    else {
        return {
            ...style,
            backgroundColor: groupColor,

        }
    }
}