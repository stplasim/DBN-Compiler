const parser = require('../Compiler/Parser');
const sampleData = require('./SampleData');

// Tests
test('Test Lexer with sample DBN', () => {
  expect(parser.lexer(sampleData.BDNCode)).toEqual(sampleData.lexerResult);
});

test('Test Parser with sample Tokens', () => {
  expect(parser.parse(sampleData.lexerResult)).toEqual(sampleData.parserResult);
});
