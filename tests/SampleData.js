// Sample BDN Program with all Features included
exports.BDNCode = `// Comment
Paper 100
Pen 0
Set a 2
Set b 10
Add 10 @b
Sub 10 @b
Mul 5 @b
Div 5 @b
Mod 6 @b
Pow 3 @b
Root 2 @b
Do @a
{
  Add 1 @b
  Line 0 0 0 @b
  Circle 10 10 2
  Ellipse 10 10 2 4
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
  { type: 'word', value: 'Add' },
  { type: 'number', value: '10' },
  { type: 'variable' },
  { type: 'word', value: 'b' },
  { type: 'newline' },
  { type: 'word', value: 'Sub' },
  { type: 'number', value: '10' },
  { type: 'variable' },
  { type: 'word', value: 'b' },
  { type: 'newline' },
  { type: 'word', value: 'Mul' },
  { type: 'number', value: '5' },
  { type: 'variable' },
  { type: 'word', value: 'b' },
  { type: 'newline' },
  { type: 'word', value: 'Div' },
  { type: 'number', value: '5' },
  { type: 'variable' },
  { type: 'word', value: 'b' },
  { type: 'newline' },
  { type: 'word', value: 'Mod' },
  { type: 'number', value: '6' },
  { type: 'variable' },
  { type: 'word', value: 'b' },
  { type: 'newline' },
  { type: 'word', value: 'Pow' },
  { type: 'number', value: '3' },
  { type: 'variable' },
  { type: 'word', value: 'b' },
  { type: 'newline' },
  { type: 'word', value: 'Root' },
  { type: 'number', value: '2' },
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
  { type: 'word', value: 'Circle' },
  { type: 'number', value: '10' },
  { type: 'number', value: '10' },
  { type: 'number', value: '2' },
  { type: 'newline' },
  { type: 'word', value: 'Ellipse' },
  { type: 'number', value: '10' },
  { type: 'number', value: '10' },
  { type: 'number', value: '2' },
  { type: 'number', value: '4' },
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
      value: { type: 'number', value: '10' }
    },
    {
      type: 'OperatorExpression',
      name: 'Add',
      arguments: [
        { type: 'number', value: '10' },
        { type: 'variable', value: '10', ref: 'b' }
      ]
    },
    {
      type: 'OperatorExpression',
      name: 'Sub',
      arguments: [
        { type: 'number', value: '10' },
        { type: 'variable', value: '20', ref: 'b' }
      ]
    },
    {
      type: 'OperatorExpression',
      name: 'Mul',
      arguments: [
        { type: 'number', value: '5' },
        { type: 'variable', value: '10', ref: 'b' }
      ]
    },
    {
      type: 'OperatorExpression',
      name: 'Div',
      arguments: [
        { type: 'number', value: '5' },
        { type: 'variable', value: '50', ref: 'b' }
      ]
    },
    {
      type: 'OperatorExpression',
      name: 'Mod',
      arguments: [
        { type: 'number', value: '6' },
        { type: 'variable', value: '10', ref: 'b' }
      ]
    },
    {
      type: 'OperatorExpression',
      name: 'Pow',
      arguments: [
        { type: 'number', value: '3' },
        { type: 'variable', value: '4', ref: 'b' }
      ]
    },
    {
      type: 'OperatorExpression',
      name: 'Root',
      arguments: [
        { type: 'number', value: '2' },
        { type: 'variable', value: '64', ref: 'b' }
      ]
    },
    {
      type: 'LoopExpression',
      name: 'Do',
      cycles: { type: 'variable', value: '2', ref: 'a' },
      block: [
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
        { type: 'word', value: 'Circle' },
        { type: 'number', value: '10' },
        { type: 'number', value: '10' },
        { type: 'number', value: '2' },
        { type: 'newline' },
        { type: 'word', value: 'Ellipse' },
        { type: 'number', value: '10' },
        { type: 'number', value: '10' },
        { type: 'number', value: '2' },
        { type: 'number', value: '4' },
        { type: 'newline' }
      ]
    },
    {
      type: 'OperatorExpression',
      name: 'Add',
      arguments: [
        { type: 'number', value: '1' },
        { type: 'variable', value: '8', ref: 'b' }
      ]
    },
    {
      type: 'CallExpression',
      name: 'Line',
      arguments: [
        { type: 'number', value: '0' },
        { type: 'number', value: '0' },
        { type: 'number', value: '0' },
        { type: 'variable', value: '9', ref: 'b' }
      ]
    },
    {
      type: 'CallExpression',
      name: 'Circle',
      arguments: [
        { type: 'number', value: '10' },
        { type: 'number', value: '10' },
        { type: 'number', value: '2' }
      ]
    },
    {
      type: 'CallExpression',
      name: 'Ellipse',
      arguments: [
        { type: 'number', value: '10' },
        { type: 'number', value: '10' },
        { type: 'number', value: '2' },
        { type: 'number', value: '4' }
      ]
    },
    {
      type: 'OperatorExpression',
      name: 'Add',
      arguments: [
        { type: 'number', value: '1' },
        { type: 'variable', value: '9', ref: 'b' }
      ]
    },
    {
      type: 'CallExpression',
      name: 'Line',
      arguments: [
        { type: 'number', value: '0' },
        { type: 'number', value: '0' },
        { type: 'number', value: '0' },
        { type: 'variable', value: '10', ref: 'b' }
      ]
    },
    {
      type: 'CallExpression',
      name: 'Circle',
      arguments: [
        { type: 'number', value: '10' },
        { type: 'number', value: '10' },
        { type: 'number', value: '2' }
      ]
    },
    {
      type: 'CallExpression',
      name: 'Ellipse',
      arguments: [
        { type: 'number', value: '10' },
        { type: 'number', value: '10' },
        { type: 'number', value: '2' },
        { type: 'number', value: '4' }
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
        y2: '9',
        stroke: 'rgb(100%100%100%)',
        'stroke-linecap': 'round'
      }
    },
    {
      tag: 'circle',
      attribute: { cx: '10', cy: '10', r: '2', stroke: 'rgb(100%100%100%)' }
    },
    {
      tag: 'ellipse',
      attribute: {
        cx: '10',
        cy: '10',
        rx: '2',
        ry: '4',
        stroke: 'rgb(100%100%100%)'
      }
    },
    {
      tag: 'line',
      attribute: {
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '10',
        stroke: 'rgb(100%100%100%)',
        'stroke-linecap': 'round'
      }
    },
    {
      tag: 'circle',
      attribute: { cx: '10', cy: '10', r: '2', stroke: 'rgb(100%100%100%)' }
    },
    {
      tag: 'ellipse',
      attribute: {
        cx: '10',
        cy: '10',
        rx: '2',
        ry: '4',
        stroke: 'rgb(100%100%100%)'
      }
    }
  ]
};

exports.generatorResult = `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <rect x="0" y="0" width="100" height="100" fill="rgb(0%,0%,0%)"></rect>
    <line x1="0" y1="0" x2="0" y2="9" stroke="rgb(100%100%100%)" stroke-linecap="round"></line>
    <circle cx="10" cy="10" r="2" stroke="rgb(100%100%100%)"></circle>
    <ellipse cx="10" cy="10" rx="2" ry="4" stroke="rgb(100%100%100%)"></ellipse>
    <line x1="0" y1="0" x2="0" y2="10" stroke="rgb(100%100%100%)" stroke-linecap="round"></line>
    <circle cx="10" cy="10" r="2" stroke="rgb(100%100%100%)"></circle>
    <ellipse cx="10" cy="10" rx="2" ry="4" stroke="rgb(100%100%100%)"></ellipse>
</svg>`;


// Helper Functions
exports.normalizeOutput = (data) => data.replace(/\n/g, '')
  .replace(/ /g, '')
  .replace(/\t/g, '');
