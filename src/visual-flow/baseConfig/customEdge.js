import randomStr from '../utils/randomStr';
import { themeColor, edgeColor } from '../constantConfig/colorSet';

export default {
  moveEdge: {
    draw(cfg, group) {
      const path = [
        ['M', cfg.start.x, cfg.start.y],
        ['L', cfg.end.x, cfg.end.y],
      ];
      const keyShape = group.addShape('path', {
        attrs: {
          id: `edge-${randomStr(10)}`,
          path,
          stroke: themeColor,
          strokeOpacity: 0.9,
          lineDash: [5, 5],
        },
      });
      return keyShape;
    },
  },
  customEdge: {
    draw(cfg, group) {
      const { startPoint } = cfg;
      const { endPoint } = cfg;

      const path = [
        ['M', startPoint.x, startPoint.y],
        ['C', startPoint.x, startPoint.y + 60, endPoint.x, endPoint.y - 60, endPoint.x, endPoint.y - 4],
        ['L', endPoint.x, endPoint.y],
      ];

      const endArrowPath = [
        ['M', 0, 0],
        ['L', 10, -4],
        ['L', 10, 4],
        ['Z'],
      ];

      const keyShape = group.addShape('path', {
        attrs: {
          id: `edge-${randomStr(10)}`,
          path,
          stroke: edgeColor,
          lineAppendWidth: 10,
          endArrow: {
            path: endArrowPath,
            fill: edgeColor,
          },
          cursor: 'pointer',
        },
      });

      return keyShape;
    },
    setState(name, value, item) {
      const keyShape = item.get('keyShape');
      if (name === 'running') {
        if (value) {
          const lineDash = [4, 2];
          let index = 0;
          keyShape.animate(() => {
            index += 1;
            if (index > 9) {
              index = 0;
            }
            const res = {
              lineDash,
              lineDashOffset: -index,
            };
            return res;
          }, {
            repeat: true,
            duration: 3000,
          });
        } else {
          keyShape.stopAnimate();
          keyShape.attr('lineDash', null);
        }
      }
    },
  },
};
