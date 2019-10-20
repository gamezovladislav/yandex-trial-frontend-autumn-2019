const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', line => {
    var result = line.toLowerCase().replace(/[aoyeui]/g,'').split('').join('.');
    console.log(result ? '.' + result : result);
    rl.close();
});