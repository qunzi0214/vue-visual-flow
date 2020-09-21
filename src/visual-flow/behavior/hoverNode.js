// import throttle from 'lodash/throttle';
// import { themeColor, bgColor } from '../constantConfig/colorSet';

export default {
  getEvents() {
    return {
      'node:mouseover': 'onMouseover',
      'node:mouseleave': 'onMouseleave',
      // 'node:mousemove': 'onMouseMove',
      'node:mousedown': 'onMousedown',
    };
  },
  // onMouseMove: throttle((e) => {
  //   const group = e.item.getContainer();

  //   if (e.target.attr('isOutPoint')) {
  //     e.target.attr('fill', themeColor);
  //   } else {
  //     group.findAll((point) => point.attr('isOutPoint')).forEach((point) => {
  //       point.attr('fill', bgColor);
  //     });
  //   }
  // }, 100),
  onMouseover(e) {
    if (this.shouldUpdate(e)) {
      e.item.setState('hover', true);
    }
  },
  onMouseleave(e) {
    if (this.shouldUpdate(e)) {
      e.item.setState('hover', false);
    }
  },
  onMousedown(e) {
    if (e.target.attr('isOutPoint')) {
      this.graph.setMode('addEdge');
    }
  },
};
