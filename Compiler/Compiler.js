const util = require('util');
const fs = require('fs');
const parser = require('../Compiler/Parser');
const transformer = require('../Compiler/Transformer');
const generator = require('../Compiler/Generator');

exports.compileText = (code) => {
  return generator(transformer(parser.parse(parser.lexer(code))));
};

exports.compileFile = (dir, output) => {
  fs.readFile(dir, 'utf8', (err, data) => {
    if (err) throw err;
    output(generator(transformer(parser.parse(parser.lexer(data)))));
  });
};

exports.showCompilerSteps = (code) => {
  console.log('Lexing...');
  const lx = parser.lexer(code);
  console.log(lx);

  console.log('Parsing...');
  const pr = parser.parse(lx);
  console.log(util.inspect(pr, false, null, true));

  console.log('Transforming...');
  const ta = transformer(pr);
  console.log(util.inspect(ta, false, null, true));

  console.log('Generating...');
  const gn = generator(ta);
  console.log(gn);
};
