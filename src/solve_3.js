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
 * @returns {string[]}
 */
function mapId(id) {
    return id.toString(2)
        .split('')
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
        sum.push("" + s);
    }
    return sum;
}

/**
 * @param {[string]} bits
 * @param {CanvasRect} ctx
 */
function drawCat(bits, ctx) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 16; j++) {
            if (bits[i * 8 + j] === '1') {
                ctx.fillRect(0 + i * 8, 7 + j * 8, 8, 8);
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
            ctx.fillRect(0 + i * 8, 142, 8, 8);
        }
    }
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
    let id = mapId(catInfo.id);
    let birthDay = mapId(catInfo.birthday);
    let bits = name.concat(id).concat(birthDay);
    let checkSum = calculateCheckSum(bits);
    drawCat(bits, ctx);
    drawCheckSum(checkSum, ctx);
}