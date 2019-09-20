module.exports = (ast) => {
  let pen = {
    color: 100,
    set: false
  };

  const svgAST = {
    tag: 'svg',
    attribute: {
      width: 100, height: 100, viewBox: '0 0 100 100',
      xmlns: 'http://www.w3.org/2000/svg', version: '1.1'
    },
    body: []
  };

  while (ast.body.length > 0) {
    const node = ast.body.shift();
    try {
      switch (node.name) {
        case 'Paper':
          const paperColor = 100 - node.arguments[0].value;
          svgAST.body.push({
            tag: 'rect',
            attribute: {
              x: 0, y: 0,
              width: 100, height: 100,
              fill: `rgb(${paperColor}%,${paperColor}%,${paperColor}%)`
            }
          });
          break;

        case 'Pen':
          pen.color = 100 - node.arguments[0].value;
          pen.set = true;
          break;

        case 'Line':
          if(!pen.set){
            console.warn('Pen Color should be set with the Pen keyword');
          }
          svgAST.body.push({
            tag: 'line',
            attribute: {
              x1: node.arguments[0].value,
              y1: node.arguments[1].value,
              x2: node.arguments[2].value,
              y2: node.arguments[3].value,
              stroke: `rgb(${pen.color}%,${pen.color}%,${pen.color}%)`,
              'stroke-linecap': 'round'
            }
          });
      }
    }
    catch (e) {
      throw 'Cannot read property of undefined';
    }
  }

  return svgAST;
};
