module.exports = (type, args, AST) => {
  const expression = {
    type: 'OperatorExpression',
    name: type,
    arguments: args
  };

  AST.body.forEach(item => {
    if(item.type === 'VariableDeclaration' && item.identifier.value === expression.arguments[1].ref){
      switch (type.toLowerCase()) {
        case 'add':
          item.value.value = `${parseInt(item.value.value) + parseInt(expression.arguments[0].value)}`;
          break;

        case 'sub':
          item.value.value = `${parseInt(item.value.value) - parseInt(expression.arguments[0].value)}`;
          break;

        case 'mul':
          item.value.value = `${parseInt(item.value.value) * parseInt(expression.arguments[0].value)}`;
          break;

        case 'div':
          item.value.value = `${parseInt(item.value.value) / parseInt(expression.arguments[0].value)}`;
          break;

        case 'mod':
          item.value.value = `${parseInt(item.value.value) % parseInt(expression.arguments[0].value)}`;
          break;

        case 'pow':
          item.value.value = `${Math.pow(parseInt(item.value.value), parseInt(expression.arguments[0].value))}`;
          break;

        case 'root':
          item.value.value = `${Math.pow(parseInt(item.value.value), 1/parseInt(expression.arguments[0].value))}`;
          break;
      }
    }
  });
  return expression;
};
