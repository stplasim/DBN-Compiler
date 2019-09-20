const generator = require('../Compiler/Generator');
const sampleData = require('./SampleData');


test('Test Generator with sample Transformer Result', () => {
  expect(sampleData.normalizeOutput(generator(sampleData.transformerResult)))
    .toEqual(sampleData.normalizeOutput(sampleData.generatorResult))
});
