const path = require('path');
const fs = require('fs');
const dbn = require('../Compiler/Compiler');
const sampleData = require('./SampleData');


test('Test Text Compilation', () => {
  expect(sampleData.normalizeOutput(dbn.compileText(sampleData.BDNCode)))
    .toEqual(sampleData.normalizeOutput(sampleData.generatorResult))
});

test('Test File Compilation', () => {

  // Create File to Compile
  fs.appendFile(path.join(__dirname, 'dbn-test.txt'), sampleData.BDNCode, err => {
    if (err) throw err;
  });

  // Save Result
    dbn.compileFile(path.join(__dirname, 'dbn-test.txt'), svg => {

      //Test
      expect(sampleData.normalizeOutput(svg))
        .toEqual(sampleData.normalizeOutput(sampleData.generatorResult));

      // Delete Test File
      fs.unlink(path.join(__dirname, 'dbn-test.txt'), err => {
        if (err) throw err;
      });
    });
});
