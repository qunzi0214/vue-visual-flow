// import { Util } from '@antv/g6';
import randomStr from '../utils/randomStr';
// import runningSvg from '../../assets/running.svg';
// import finishSvg from '../../assets/finish.svg';
import {
  borderColor,
  whiteColor,
  textColor,
  pointColor,
  themeColor,
  selectNodeColor,
} from '../constantConfig/colorSet';

export default {
  customNode: {
    draw(cfg, group) {
      const { width, height } = cfg;

      const offsetX = -width / 2;
      const offsetY = -height / 2;
      const mainId = `rect-${randomStr(10)}`;
      let anchorIndex = 0;

      const keyShape = group.addShape('rect', {
        name: 'base-shape',
        draggable: true,
        attrs: {
          id: mainId,
          x: offsetX,
          y: offsetY,
          width,
          height,
          stroke: borderColor,
          fill: whiteColor,
          radius: 2,
          cursor: 'move',
        },
      });

      if (cfg.label) {
        group.addShape('text', {
          name: 'text-shape',
          draggable: true,
          attrs: {
            id: `text-${randomStr(10)}`,
            x: 0,
            y: 0,
            textAlign: 'center',
            textBaseline: 'middle',
            text: cfg.label,
            fill: textColor,
            cursor: 'move',
            fontSize: 14,

            parent: mainId,
            isText: true,
          },
        });
      }

      if (cfg.inPoints) {
        cfg.inPoints.forEach((point) => {
          const x = width * point.pos[0];
          const y = point.pos[1] === 0 ? 0 : height;

          group.addShape('circle', {
            name: 'point-shape',
            attrs: {
              id: `circle-${randomStr(10)}`,
              x: x + offsetX,
              y: y + offsetY,
              r: 3.5,
              fill: whiteColor,
              stroke: pointColor,
              opacity: 0,
              cursor: 'pointer',

              isInPoint: true,
              parent: mainId,
              anchorIndex,
              dataType: point.dataType,
            },
          });
          anchorIndex += 1;
        });
      }

      if (cfg.outPoints) {
        cfg.outPoints.forEach((point) => {
          const x = width * point.pos[0];
          const y = point.pos[1] === 0 ? 0 : height;

          group.addShape('circle', {
            name: 'point-shape',
            attrs: {
              id: `circle-${randomStr(10)}`,
              x: x + offsetX,
              y: y + offsetY,
              r: 3.5,
              fill: whiteColor,
              stroke: pointColor,
              opacity: 0,
              cursor: 'crosshair',

              isOutPoint: true,
              parent: mainId,
              anchorIndex,
              dataType: point.dataType,
            },
          });
          anchorIndex += 1;
        });
      }

      // const centerPoint = { x: -10, y: -10 };
      // const running = group.addShape('image', {
      //   name: 'running-image',
      //   attrs: {
      //     x: centerPoint.x + 80,
      //     y: centerPoint.y,
      //     width: 20,
      //     height: 20,
      //     img: runningSvg,
      //     parent: mainId,
      //     opacity: 0,
      //     isRunning: true,
      //   },
      // });
      // running.animate(
      //   (ratio) => {
      //     const matrix = Util.mat3.create();
      //     const toMatrix = Util.transform(matrix, [
      //       ['t', -80, 0],
      //       ['r', ratio * Math.PI * 2],
      //       ['t', 80, 0],
      //     ]);
      //     return {
      //       matrix: toMatrix,
      //     };
      //   },
      //   {
      //     repeat: true,
      //     duration: 2000,
      //     easing: 'easeLinear',
      //   },
      // );

      // group.addShape('image', {
      //   name: 'finish-image',
      //   attrs: {
      //     x: centerPoint.x + 80,
      //     y: centerPoint.y,
      //     width: 20,
      //     height: 20,
      //     img: finishSvg,
      //     parent: mainId,
      //     opacity: 0,
      //     isFinish: true,
      //   },
      // });

      return keyShape;
    },
    setState(name, value, item) {
      const group = item.getContainer();
      const keyShape = group.get('children')[0];
      const points = group.findAll((shape) => shape.attr('isInPoint') || shape.attr('isOutPoint'));
      const text = group.find((shape) => shape.attr('isText'));

      if (item.hasState('selected') && name === 'hover') {
        return;
      }

      if (name === 'selected') {
        if (value) {
          keyShape.attr('fill', selectNodeColor);
          keyShape.attr('stroke', themeColor);
          text.attr('fill', whiteColor);
          points.forEach((point) => {
            point.attr('opacity', 1);
          });
        } else {
          keyShape.attr('fill', whiteColor);
          keyShape.attr('stroke', borderColor);
          text.attr('fill', textColor);
          points.forEach((point) => {
            point.attr('opacity', 0);
          });
        }
      }

      if (name === 'hover') {
        if (value) {
          keyShape.attr('stroke', themeColor);
          text.attr('fill', themeColor);
          points.forEach((point) => {
            point.attr('opacity', 1);
          });
        } else {
          keyShape.attr('stroke', borderColor);
          text.attr('fill', textColor);
          points.forEach((point) => {
            point.attr('opacity', 0);
          });
        }
      }

      // if (name === 'running') {
      //   const running = group.find((shape) => shape.attrs.isRunning);
      //   if (value) {
      //     running.attr('opacity', 1);
      //   } else {
      //     running.attr('opactiy', 0);
      //   }
      // }

      // if (name === 'finish') {
      //   const finish = group.find((shape) => shape.attrs.isFinish);
      //   if (value) {
      //     finish.attr('opacity', 1);
      //   } else {
      //     finish.attr('opactiy', 0);
      //   }
      // }
    },
  },
};
