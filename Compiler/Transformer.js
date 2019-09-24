module.exports = (ast) => {
  let pen = {
    color: 'rgb(100%,100%,100%)',
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
    let paperColor;
    const node = ast.body.shift();
    try {
      switch (node.name) {
        case 'Paper':
          paperColor = 100 - node.arguments[0].value;
          svgAST.body.push({
            tag: 'rect',
            attribute: {
              x: 0, y: 0,
              width: 100, height: 100,
              fill: `rgb(${paperColor}%,${paperColor}%,${paperColor}%)`
            }
          });
          break;

        case 'APaper':
          paperColor = 100 - node.arguments[0].value;
          svgAST.attribute.width = node.arguments[1].value;
          svgAST.attribute.height = node.arguments[2].value;
          svgAST.attribute.viewBox = `0 0 ${node.arguments[1].value} ${node.arguments[2].value}`;
          svgAST.body.push({
            tag: 'rect',
            attribute: {
              x: 0, y: 0,
              width: node.arguments[1].value, height: node.arguments[2].value,
              fill: `rgb(${paperColor}%,${paperColor}%,${paperColor}%)`
            }
          });
          break;

        case 'Pen':
          pen.color = 'rgb(' +
          (100 - node.arguments[0].value) + '%' +
          (100 - node.arguments[0].value) + '%' +
          (100 - node.arguments[0].value) + '%' +
          ')';
          pen.set = true;
          break;

        case 'APen':
          pen.color = 'rgb(' +
            (100 - node.arguments[0].value) + '%' +
            (100 - node.arguments[1].value) + '%' +
            (100 - node.arguments[2].value) + '%' +
            ')';
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
              stroke: pen.color,
              'stroke-linecap': 'round'
            }
          });
          break;

        case 'Circle':
          if(!pen.set){
            console.warn('Pen Color should be set with the Pen keyword');
          }
          svgAST.body.push({
            tag: 'circle',
            attribute: {
              cx: node.arguments[0].value,
              cy: node.arguments[1].value,
              r: node.arguments[2].value,
              stroke: pen.color
            }
          });
          break;

        case 'Ellipse':
          if(!pen.set){
            console.warn('Pen Color should be set with the Pen keyword');
          }
          svgAST.body.push({
            tag: 'ellipse',
            attribute: {
              cx: node.arguments[0].value,
              cy: node.arguments[1].value,
              rx: node.arguments[2].value,
              ry: node.arguments[3].value,
              stroke: pen.color
            }
          });
          break;
      }
    }
    catch (e) {
      throw 'Cannot read property of undefined';
    }
  }

  return svgAST;
};
