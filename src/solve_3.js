/**
 * @param {string} name
 * @returns {string[]}
 */
function mapName(name) {
    return (name + "                  ")
        .substr(0, 11)
        .split ('')
        .flatMap(c => c.charCodeAt(0)
            .toString(2)
            .split(''));
}

/**
 * @param {number} id
 * @param {number} len
 * @returns {string[]}
 */
function mapId(id, len) {
    let s = id.toString(2);
    while (s.length < len) s = '0' + s;
    return s.split('');
}

/**
 * @param {[string]} bits
 * @return {[string]}
 */
function calculateCheckSum(bits) {
    let sum = [];
    for (let i = 0; i < 8; i++) {
        let s = 0;
        for (let j = 0; j < 16; j++) {
            if (bits[i * 8 + j] === '1') {
                s++;
            }
        }
        sum.push("" + (s & 1));
    }
    return sum;
}

/**
 * @param {[string]} bits
 * @param {CanvasRect} ctx
 */
function drawCat(bits, ctx) {
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 8; j++) {
            if (bits[i * 8 + j] === '1') {
                ctx.fillRect(7 + i * 8, 0 + j * 8, 8, 8);
            }
        }
    }
}

/**
 * @param {[string]} bits
 * @param {CanvasRect} ctx
 */
function drawCheckSum(bits, ctx) {
    for (let i = 0; i < 8; i++) {
        if (bits[i] === '1') {
            ctx.fillRect(142, 0 + i * 8, 8, 8);
        }
    }
}

/**
 * @param {number} x
 * @param {number} y
 * @param {CanvasRect} ctx
 */
function drawBorder(x, y, ctx) {
    ctx.fillRect(x, y, 7, 3);
    ctx.fillRect(x, y, 3, 64);
    ctx.fillRect(x, y + 61, 7, 3);
    ctx.fillRect(x + 4, y, 3, 64);
}

/**
 * Отрисовать баркод для кота
 * @param catInfo {{name:string, id:number, birthday:number}} - информация о коте
 * @param element {HTMLDivElement} - div с фиксированным размером 157x64 пикселей,
 *     в который будет отрисовываться баркод
 */
function renderBarcode(catInfo, element) {
    /**
     * @type {CanvasRect}
     */
    let ctx = element.getContext('2d');
    let name = mapName(catInfo.name);
    let id = mapId(catInfo.id, 8);
    let birthDay = mapId(catInfo.birthday, 32);
    let bits = name.concat(id).concat(birthDay);
    let checkSum = calculateCheckSum(bits);
    drawCat(bits, ctx);
    drawCheckSum(checkSum, ctx);
    drawBorder(0, 0, ctx);
    drawBorder(135, 0, ctx);
    drawBorder(150, 0, ctx);
}