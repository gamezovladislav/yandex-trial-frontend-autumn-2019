/**
 * @type {RegExp[]}
 */
const formats = [
    new RegExp('.*(\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d).*(".*").*'),
    new RegExp('.*(\\d\\d\\.\\d\\d\\.\\d\\d).*(".*").*'),
    new RegExp('.*(\\d\\d\\/\\d\\d\\/\\d\\d\\d\\d).*(".*").*'),
    new RegExp('.*(\\d\\d\\/\\d\\d\\/\\d\\d).*(".*").*'),

    new RegExp('.*(".*").*(\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d).*'),
    new RegExp('.*(".*").*(\\d\\d\\.\\d\\d\\.\\d\\d).*'),
    new RegExp('.*(".*").*(\\d\\d\\/\\d\\d\\/\\d\\d\\d\\d).*'),
    new RegExp('.*(".*").*(\\d\\d\\/\\d\\d\\/\\d\\d).*')
];

/**
 * @param {string} row
 */
function parse(row) {
    for (let i = 0; i < formats.length; i++) {
        let regex = formats[i];
        if (regex.test(row)) {
            let result = regex.exec(row);
            let name = result[1];
            let date = result[2];
            if (name[0] !== '"') {
                let temp = date;
                date = name;
                name = temp;
            }
            return {name, date}
        }
    }
    return {};
}

/**
 * @param {{name: string, date: string}} obj
 * @return {string}
 */
function format(obj) {
    while (obj.date.indexOf('/') !== -1) {
        obj.date = obj.date.replace('/', '.');
    }
    return `${obj.name}: ${obj.date}`
}

/**
 * @param {Array} arr
 */
function solution(arr) {
    return arr.map(parse)
        .filter(e => e.date && e.name)
        .map(format)
        .join('\n');
}

let arr = [
    "В это воскресенье (22.09.2019) будет великолепное время, чтобы \"Пробежать марафон\".",
    "А вот \"Садить деревья\" стоит на следующий день (23/09/19), ведь будет стоять жара."
];

console.log(solution(arr));

module.exports = solution;
