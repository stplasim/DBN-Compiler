module.exports = (ast) => {
  const createAttrString = (attributes) => {
    return Object.keys(attributes).map(key => {
      return `${key}="${attributes[key]}"`;
    }).join(' ');
  };


  const elements = ast.body.map(node => {
    return `<${node.tag} ${createAttrString(node.attribute)}></${node.tag}>`;
  }).join('\n\t');

  return `
    <svg ${createAttrString(ast.attribute)}>
        ${elements}
    </svg>
  `;
};
