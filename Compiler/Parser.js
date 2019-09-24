const arithmeticOperations = require('./ArithmeticOperations');

// Create Tokens
exports.lexer = (code) => {
  const tokens = [];
  code
    .replace(/[\n\r]/g, ' *nl* ')
    .replace(/{/g, ' *ob* ')
    .replace(/}/g, ' *cb* ')
    .replace(/@/g, ' *var* ')
    .split(/\s+/)
    .filter(token => token.length > 0)
    .map(token => {
      if(isNaN(token)) {
        switch (token) {
          case '*nl*':
            tokens.push({type: 'newline'});
            break;

          case '*ob*':
            tokens.push({type: 'openBlock'});
            break;

          case '*cb*':
            tokens.push({type: 'closeBlock'});
            break;

          case '*var*':
            tokens.push({type: 'variable'});
            break;

          default:
            tokens.push({type: 'word', value: token});
            break;
        }
      }
      else {
        tokens.push({type: 'number', value: token})
      }
    });
  return tokens;
};

// Parse tokens in Abstract Syntax Tree
exports.parse = (tokens) => {
  const requiredCommands = {
    paper: false,
    pen: false
  };

  const AST = {
    type: "Drawing",
    body: []
  };

  const findArguments = (name, expectedTypes, expectedLength = expectedTypes.length) => {
    const args = [];
    for(let i = 0; i < expectedLength; i++) {
      const arg = tokens.shift();
      if(arg.type === 'variable') {
        const variable = tokens.shift();
        AST.body.forEach(item => {
          if(item.type === 'VariableDeclaration' && item.identifier.value === variable.value){
            args.push({
              type: 'variable',
              value: item.value.value,
              ref: item.identifier.value
            });
          }
        });
      }
      else if(arg.type === expectedTypes[i]) {
        args.push({
          type: arg.type,
          value: arg.value
        });
      }
      else {
        throw `${name} expected ${expectedLength} argument(s) of type: ${expectedTypes[i]}. Instead found ${arg.type}`;
      }
    }
    return args;
  };


  const createASTElement = (type, value) => {
    let expression = {};
    if(type === 'word'){
      switch (value) {
        case '//':
          expression = {
            type: 'CommentExpression',
            value: ''
          };
          let next = tokens.shift();
          while (next.type !== 'newline') {
            expression.value += next.value + ' ';
            next = tokens.shift();
          }
          return expression;

        case 'Paper':
          if(!requiredCommands.paper) {
            expression = {
              type: 'CallExpression',
              name: 'Paper',
              arguments: []
            };

            expression.arguments = findArguments('Paper', ['number']);

            requiredCommands.paper = true;
          }
          else {
            throw 'Paper can only be defined once';
          }
          return expression;

        // Advanced Paper
        case 'APaper':
          if(!requiredCommands.paper) {
            expression = {
              type: 'CallExpression',
              name: 'APaper',
              arguments: []
            };

            expression.arguments = findArguments(
              'APaper',
              ['number', 'number', 'number']
            );

            requiredCommands.paper = true;
          }
          else {
            throw 'Paper can only be defined once';
          }
          return expression;

        case 'Pen':
          expression = {
            type: 'CallExpression',
            name: 'Pen',
            arguments: []
          };

          expression.arguments = findArguments('Pen', ['number']);

          return expression;

        case 'APen':
          expression = {
            type: 'CallExpression',
            name: 'APen',
            arguments: []
          };

          expression.arguments = findArguments(
            'APen',
            ['number', 'number', 'number']
          );

          return expression;

        case 'Line':
          expression = {
            type: 'CallExpression',
            name: 'Line',
            arguments: []
          };

          expression.arguments = findArguments(
            'Line',
            ['number', 'number', 'number', 'number']
          );

          return expression;

        case 'Circle':
          expression = {
            type: 'CallExpression',
            name: 'Circle',
            arguments: []
          };

          expression.arguments = findArguments(
            'Circle',
            ['number', 'number', 'number']
          );
        return expression;

        case 'Ellipse':
          expression = {
            type: 'CallExpression',
            name: 'Ellipse',
            arguments: []
          };

          expression.arguments = findArguments(
            'Ellipse',
            ['number', 'number', 'number', 'number']
          );
          return expression;

        case 'Set':
          expression = {
            type: 'VariableDeclaration',
            name: 'Set',
            identifier: {},
            value: {}
          };

          expression.identifier = findArguments('Set', ['word'], 1)[0];
          expression.value = findArguments('Set', ['number'], 1)[0];
          return expression;

        case 'Add':
        case 'Sub':
        case 'Mul':
        case 'Div':
        case 'Mod':
        case 'Pow':
        case 'Root':
          return arithmeticOperations(
            value,
            findArguments(value, ['number', 'variable'], 2),
            AST
          );

        case 'Do':
          expression = {
            type: 'LoopExpression',
            name: 'Do',
            cycles: {},
            block: []
          };

          expression.cycles = findArguments('Do', ['number'], 1)[0];
          tokens.shift();
          let block = tokens.shift();
          if(block.type === 'openBlock'){
            while (block.type !== 'closeBlock') {
              expression.block.push(block);
              block = tokens.shift();
            }
            for (let i = 0; i < expression.cycles.value; i++){
              expression.block.forEach(item => {
                if(item.type !== 'openBlock' && item.type !== 'closeBlock'){
                  tokens.push(item);
                }
              });
            }
          }
          else {
            throw `Do Command requires { on new line. Found ${block.type}`;
          }
          return expression;

        default:
          throw `${value} is not a valid command`;
      }
    }
    return null;
  };

  while (tokens.length > 0) {
    const currentToken = tokens.shift();
    const exp = createASTElement(currentToken.type, currentToken.value);
    if(exp !== null){
      AST.body.push(exp);
    }
  }

  return AST;
};
