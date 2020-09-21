import eventBus from '../utils/eventBus';

export default {
  getEvents() {
    return {
      'edge:contextmenu': 'onContextmenu',
    };
  },
  onContextmenu(e) {
    eventBus.$emit('edgeContextmenu', e);
  },
};
