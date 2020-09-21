import eventBus from '../utils/eventBus';

export default {
  getEvents() {
    return {
      'node:click': 'onNodeClick',
      'canvas:click': 'onCanvasClick',
      'node:contextmenu': 'onNodeContextmenu',
      'canvas:contextmenu': 'onCanvasContextmenu',
    };
  },
  onNodeClick(e) {
    const { item } = e;
    const { graph } = this;
    const selected = graph.findAllByState('node', 'selected');
    selected.forEach((node) => {
      node.setState('selected', false);
    });
    item.setState('selected', true);
  },
  onNodeContextmenu(e) {
    eventBus.$emit('nodeContextmenu', e);
  },
  onCanvasClick() {
    const { graph } = this;
    const selected = graph.findAllByState('node', 'selected');
    selected.forEach((node) => {
      node.setState('selected', false);
    });
  },
  onCanvasContextmenu(e) {
    eventBus.$emit('canvasContextmenu', e);
  },
};
