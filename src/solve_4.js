const formats = {
    left: {
        left: ' ',
        right: '  '
    },
    center: {
        left: '  ',
        right: '  '
    },
    right: {
        left: '  ',
        right: ' '
    }
};

const separators = {
    thead: {
        td: '^',
        th: '^'
    },
    tbody: {
        td: '|',
        th: '^'
    }
};

/**
 * @param {string} input
 * @returns {HTMLTableElement}
 */
function createTableHtmlElement(input) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "application/xml");
    return doc.getElementsByTagName('table')[0];
}

/**
 * @param {HTMLElement} table
 */
function getColRules(table) {
    /**
     * @param {HTMLCollection} cols
     */
    function mapToColRules(cols) {
        let count = cols.length;
        let rules = [];
        for (let i = 0; i < count; i++) {
            let col = cols.item(i);
            rules.push(formats[(col.getAttribute('align') || 'left')]);
        }
        return rules;
    }

    let colgroups = table.getElementsByTagName('colgroup');
    if (colgroups.length > 0) {
        return mapToColRules(colgroups[0].children);
    }
    return [];
}

/**
 * @param {HTMLElement} table
 * @param {string} tagName
 */
function getInnerRows(table, tagName) {
    /**
     * @param {HTMLCollection} rows
     */
    function mapToDrawableObjects(rows) {
        let count = rows.length;
        let objects = [];

        for (let i = 0; i < count; i++) {
            let row = rows.item(i);
            objects.push(
                {
                    separator: separators[tagName][row.tagName],
                    text: (row.innerHTML || '')
                        .split('\n')
                        .join('')
                        .trim()
                        .split(' ')
                        .filter(s => s.length > 0)
                        .join(' ')
                }
            );
        }
        return objects;
    }

    let elements = table.getElementsByTagName(tagName); //thead || tbody
    if (elements.length === 0) {
        return [];
    }
    let rows = elements[0].children; // tr
    let childrenCount = rows.length;
    let children = [];
    for (let i = 0; i < childrenCount; i++) {
        children.push(mapToDrawableObjects(rows[i].children))
    }
    return children;
}

/**
 * @param {[[{separator:string, text:string}]]} elementRows
 * @param {[{left:string, right:string}]} colRules
 * @param {string} lastChar
 * @return {Array<String>}
 */
function buildStrings(elementRows, colRules, lastChar) {
    return elementRows.map(row => {
        return row.map((col, index) => col.separator + colRules[index].left + col.text + colRules[index].right).join('') + lastChar;
    });
}

/**
 * @param {[[*]]} theadRows
 * @param {[[*]]}tbodyRows
 * @returns {number}
 */
function calculateCountRows(theadRows, tbodyRows) {
    if (theadRows.length > 0) {
        return theadRows[0].length;
    }
    return tbodyRows[0].length;
}

/**
 * @param {HTMLTableElement} table
 * @return {string}
 */
function buildRows(table) {
    let colRules = getColRules(table);
    console.log('colRules');
    console.log(colRules);
    let theadRows = getInnerRows(table, 'thead');
    console.log('theadRows');
    console.log(theadRows);
    let tbodyRows = getInnerRows(table, 'tbody');
    console.log('tbodyRows');
    console.log(tbodyRows);
    if (colRules.length === 0) {
        let countRows = calculateCountRows(theadRows, tbodyRows);
        colRules = Array.from({length: countRows}, () => formats.left)
    }
    return buildStrings(theadRows, colRules, '^')
        .concat(buildStrings(tbodyRows, colRules, '|'))
        .join('\n');
}

/**
 * @param {string} input
 */
function solution(input) {
    const tableElement = createTableHtmlElement(input);
    return buildRows(tableElement);
}

let table = `<table>  
<tbody>  
        <tr>  
            <th>git status   </th>  
            <td>   List all new or modified files</td>  
            <th>Yes   </th>  
        </tr>  
        <tr>  
            <th>git diff</th>  
            <td>Show file differences that have not been staged</td>  
            <td>No</td>  
        </tr>  
    </tbody>  
</table>`;

console.log(solution(table));