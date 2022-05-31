export const utilService = {
    makeId,
    getRandomIntInclusive,
    getRandomColor,
    hexToRgb
}

function makeId(length = 15) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function hexToRgb(hex) {
    console.log('hexToRgb - hex', hex)
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    const rgb = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b
    })
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)} : null
}