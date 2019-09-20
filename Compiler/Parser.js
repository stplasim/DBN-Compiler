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

  const findArguments = (name, expectedTypes, expectedLength) => {
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

  const updateVariables = (name, value, operation) => {
    AST.body.forEach(item => {
      if(item.type === 'VariableDeclaration' && item.identifier.value === name){
        switch (operation) {
          case 'add':
            item.value.value = `${parseInt(item.value.value) + parseInt(value)}`;
            break;

          case 'sub':
            item.value.value = `${parseInt(item.value.value) - parseInt(value)}`;
            break;
        }
      }
    });
  };

  const createAST = (type, value) => {
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

            expression.arguments = findArguments('Paper', ['number'], 1);

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

          expression.arguments = findArguments('Pen', ['number'], 1);

          return expression;

        case 'Line':
          expression = {
            type: 'CallExpression',
            name: 'Line',
            arguments: []
          };

          expression.arguments = findArguments(
            'Line',
            ['number', 'number', 'number', 'number'],
            4
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
          expression = {
            type: 'OperatorExpression',
            name: 'Add',
            arguments: []
          };
          expression.arguments = findArguments('Add', ['number', 'variable'], 2);
          updateVariables(expression.arguments[1].ref, expression.arguments[0].value, 'add');
          return expression;

        case 'Sub':
          expression = {
            type: 'OperatorExpression',
            name: 'Sub',
            arguments: []
          };
          expression.arguments = findArguments('Sub', ['number', 'variable'], 2);
          updateVariables(expression.arguments[1].ref, expression.arguments[0].value, 'sub');
          return expression;

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
              if(block.type !== 'newline' && block.type !== 'openBlock'){
                expression.block.push(block);
              }
              block = tokens.shift();
            }
            const items = [];
            for (let i = 0; i < expression.cycles.value; i++){
              expression.block.forEach(item => {
                if(item.type !== 'openBlock' && item.type !== 'closeBlock'){
                  items.unshift(item);
                }
              });
            }
            items.forEach(i => tokens.unshift(i));
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
    const exp = createAST(currentToken.type, currentToken.value);
    if(exp !== null){
      AST.body.push(exp);
    }
  }

  return AST;
};
