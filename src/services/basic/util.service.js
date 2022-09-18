const dark1 = '#172b4d'
const dark2 = '#172b4d38'
const dark3 = '#172b4d58'

const light1 = '#FAFBFC'
const light2 = '#fafbfc57'
const light3 = '#fafbfc6e'
const light4 = '#eaeaea'


export const utilService = {
    makeId,
    getRandomIntInclusive,
    getRandomColor,
    hexToRgb,
    setDynamicColors
}

function makeId(length = 15) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}


function hexToRgb(hex) {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgba(${parseInt(res[1], 16)}, ${parseInt(res[2], 16)}, ${parseInt(res[3], 16)}, 1)`
}

function setDynamicColors(isDark, avgColor) {
    document.body.style.setProperty('--clr-dynamic-invert', `${isDark ? dark1 : light1}`)
    document.body.style.setProperty('--clr-dynamic-faded', `${isDark ? light2 : dark2}`)
    document.body.style.setProperty('--clr-dynamic-faded-hover', `${isDark ? light3 : dark3}`)
    document.body.style.setProperty('--clr-dynamic-inner', `${isDark ? light4 : dark1}`)
    document.body.style.setProperty('--clr-dynamic', `${isDark ? light1 : dark1}`)
    document.body.style.setProperty('--clr-header', `${avgColor}`)
}
