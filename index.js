const path = require('path');
const dbn = require('./Compiler/Compiler');

dbn.compileFile(path.join(__dirname, 'dbn.txt'), svg => {
    console.log(svg);
});
