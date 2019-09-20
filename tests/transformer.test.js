const transformer = require('../Compiler/Transformer');
const sampleData = require('./SampleData');

test('Test Transformer with sample Parsed Code', () => {
  expect(transformer(sampleData.parserResult)).toEqual(sampleData.transformerResult)
});
