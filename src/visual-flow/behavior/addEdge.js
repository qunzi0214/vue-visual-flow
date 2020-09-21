import throttle from 'lodash/throttle';
import randomStr from '../utils/randomStr';

export default {
  edge: null,
  startItem: null,
  sourceAnchorIndex: -1,
  sourceType: '',
  changedAnchor: null,

  getEvents() {
    return {
      mousemove: 'onMousemove',
      mouseup: 'onMouseup',
    };
  },
  onMouseup(e) {
    if (
      this.startItem
      && e.target.attr('isInPoint')
      && e.item.getModel().id !== this.startItem.getModel().id
      && e.target.attr('dataType') === this.sourceType
    ) {
      this.graph.addItem('edge', {
        id: `edge-${randomStr(10)}`,
        source: this.startItem.getModel().id,
        target: e.item.getModel().id,
        sourceAnchor: this.sourceAnchorIndex,
        targetAnchor: e.target.attr('anchorIndex'),
        type: 'customEdge',
      });
    }

    this.resetModel();
  },
  // eslint-disable-next-line
  onMousemove: throttle(function (e) {
    const { item } = e;

    if (!this.edge) {
      item.get('group')
        .findAll((shape) => shape.attr('isInPoint'))
        .forEach((point) => {
          point.attr('opacity', 0);
        });

      this.graph.find('node', (node) => {
        if (node.getModel().id === item.getModel().id) {
          return;
        }

        node.get('group')
          .findAll((shape) => shape.attr('isInPoint'))
          .forEach((point) => {
            if (point.attr('dataType') !== e.target.attr('dataType')) {
              return;
            }
            point.attr('opacity', 1);
          });
      });

      const startPos = {
        x: e.target.attrs.x + item.getModel().x,
        y: e.target.attrs.y + item.getModel().y,
      };

      this.startItem = item;
      this.sourceAnchorIndex = e.target.attr('anchorIndex');
      this.sourceType = e.target.attr('dataType');
      this.edge = this.graph.addItem('edge', {
        source: item,
        target: item,
        start: startPos,
        end: startPos,
        type: 'moveEdge',
      });
    } else if (this.edge) {
      this.graph.updateItem(this.edge, {
        end: { x: e.x, y: e.y },
      });

      if (e.target.attr('isInPoint')) {
        if (
          this.changedAnchor
          || e.item.getModel().id === this.startItem.getModel().id
          || e.target.attr('dataType') !== this.sourceType
        ) {
          return;
        }

        this.changedAnchor = e.target;
        this.changedAnchor.attr('r', 4.5);
      } else if (this.changedAnchor) {
        this.changedAnchor.attr('r', 3);
        this.changedAnchor = null;
      }
    }
  }),

  resetModel() {
    this.graph.removeItem(this.edge);
    this.graph.setMode('default');

    this.edge = null;
    this.startItem = null;
    this.sourceAnchorIndex = -1;
    this.sourceType = '';
    this.changedAnchor = null;

    this.graph.find('node', (node) => {
      node.setState('hover', false);
      node.get('group')
        .get('children')
        .forEach((shape) => {
          if (shape.attr('isInPoint')) {
            shape.attr('r', 3.5);
          }
          if (shape.attr('isOutPoint')) {
            shape.attr('fill', '#fff');
          }
          if (node.hasState('selected') && shape.attr('isInPoint')) {
            shape.attr('opacity', 1);
          }
        });
    });
  },
};
