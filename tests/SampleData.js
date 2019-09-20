// Sample BDN Program with all Features included
exports.BDNCode = `// Comment
Paper 100
Pen 0
Set a 2
Set b 10
Sub 10 @b
Do @a
{
  Add 1 @b
  Line 0 0 0 @b
}
`;

// Expected Lexer Result
exports.lexerResult = [
  { type: 'word', value: '//' },
  { type: 'word', value: 'Comment' },
  { type: 'newline' },
  { type: 'word', value: 'Paper' },
  { type: 'number', value: '100' },
  { type: 'newline' },
  { type: 'word', value: 'Pen' },
  { type: 'number', value: '0' },
  { type: 'newline' },
  { type: 'word', value: 'Set' },
  { type: 'word', value: 'a' },
  { type: 'number', value: '2' },
  { type: 'newline' },
  { type: 'word', value: 'Set' },
  { type: 'word', value: 'b' },
  { type: 'number', value: '10' },
  { type: 'newline' },
  { type: 'word', value: 'Sub' },
  { type: 'number', value: '10' },
  { type: 'variable' },
  { type: 'word', value: 'b' },
  { type: 'newline' },
  { type: 'word', value: 'Do' },
  { type: 'variable' },
  { type: 'word', value: 'a' },
  { type: 'newline' },
  { type: 'openBlock' },
  { type: 'newline' },
  { type: 'word', value: 'Add' },
  { type: 'number', value: '1' },
  { type: 'variable' },
  { type: 'word', value: 'b' },
  { type: 'newline' },
  { type: 'word', value: 'Line' },
  { type: 'number', value: '0' },
  { type: 'number', value: '0' },
  { type: 'number', value: '0' },
  { type: 'variable' },
  { type: 'word', value: 'b' },
  { type: 'newline' },
  { type: 'closeBlock' },
  { type: 'newline' }
];

// Expected Parser Result
exports.parserResult = {
  type: 'Drawing',
  body: [
    { type: 'CommentExpression', value: 'Comment ' },
    {
      type: 'CallExpression',
      name: 'Paper',
      arguments: [ { type: 'number', value: '100' } ]
    },
    {
      type: 'CallExpression',
      name: 'Pen',
      arguments: [ { type: 'number', value: '0' } ]
    },
    {
      type: 'VariableDeclaration',
      name: 'Set',
      identifier: { type: 'word', value: 'a' },
      value: { type: 'number', value: '2' }
    },
    {
      type: 'VariableDeclaration',
      name: 'Set',
      identifier: { type: 'word', value: 'b' },
      value: { type: 'number', value: '2' }
    },
    {
      type: 'OperatorExpression',
      name: 'Sub',
      arguments: [
        { type: 'number', value: '10' },
        { type: 'variable', value: '10', ref: 'b' }
      ]
    },
    {
      type: 'LoopExpression',
      name: 'Do',
      cycles: { type: 'variable', value: '2', ref: 'a' },
      block: [
        { type: 'word', value: 'Add' },
        { type: 'number', value: '1' },
        { type: 'variable' },
        { type: 'word', value: 'b' },
        { type: 'word', value: 'Line' },
        { type: 'number', value: '0' },
        { type: 'number', value: '0' },
        { type: 'number', value: '0' },
        { type: 'variable' },
        { type: 'word', value: 'b' }
      ]
    },
    {
      type: 'OperatorExpression',
      name: 'Add',
      arguments: [
        { type: 'number', value: '1' },
        { type: 'variable', value: '0', ref: 'b' }
      ]
    },
    {
      type: 'CallExpression',
      name: 'Line',
      arguments: [
        { type: 'number', value: '0' },
        { type: 'number', value: '0' },
        { type: 'number', value: '0' },
        { type: 'variable', value: '1', ref: 'b' }
      ]
    },
    {
      type: 'OperatorExpression',
      name: 'Add',
      arguments: [
        { type: 'number', value: '1' },
        { type: 'variable', value: '1', ref: 'b' }
      ]
    },
    {
      type: 'CallExpression',
      name: 'Line',
      arguments: [
        { type: 'number', value: '0' },
        { type: 'number', value: '0' },
        { type: 'number', value: '0' },
        { type: 'variable', value: '2', ref: 'b' }
      ]
    }
  ]
};

// Expected Transformer Result
exports.transformerResult = {
  tag: 'svg',
  attribute: {
    width: 100,
    height: 100,
    viewBox: '0 0 100 100',
    xmlns: 'http://www.w3.org/2000/svg',
    version: '1.1'
  },
  body: [
    {
      tag: 'rect',
      attribute: { x: 0, y: 0, width: 100, height: 100, fill: 'rgb(0%,0%,0%)' }
    },
    {
      tag: 'line',
      attribute: {
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '1',
        stroke: 'rgb(100%,100%,100%)',
        'stroke-linecap': 'round'
      }
    },
    {
      tag: 'line',
      attribute: {
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '2',
        stroke: 'rgb(100%,100%,100%)',
        'stroke-linecap': 'round'
      }
    }
  ]
};

exports.generatorResult = `
<svg width="100" height="100" viewBox="00 10 01 00" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <rect x="0" y="0" width="100" height="100" fill="rgb(0%, 0%, 0%)"></rect>
    <line x1= "0" y1="0" x2="0" y2="1" stroke="rgb(100%, 100%, 100%)" stroke-linecap="round"></line>
    <line x1="0" y1="0" x2="0" y2="2" stroke="rgb(100%, 100%, 100%)" stroke-linecap="round"></line>
</svg>`;


// Helper Functions

exports.normalizeOutput = (data) => data.replace(/\n/g, '')
  .replace(/ /g, '')
  .replace(/\t/g, '');
