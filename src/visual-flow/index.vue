<template>
  <div
    :class="{ 'g6-visualized-container': true, 'full-screen': isFullScreen }"
    @click="closeContextmenu"
  >
    <div class="editor-container">
      <!-- toolbar -->
      <Toolbar
        :toolbal-event.sync="toolbalEvent"
        :tool-list="toolList"
      />
      <!-- g6 container -->
      <div
        id="g6-container"
        class="g6-container"
        @dragover="dragoverHandler"
        @drop="dropHandler"
        @contextmenu="preventContextmenu"
      >
        <!-- contextmenu-->
        <ContextMenu
          v-show="showContextmenu"
          :context-type="contextType"
          :style="contextmenuPos"
          :contextmenu-list="contextmenuList"
          @contextmenuEvent="contextmenuEvent"
        />
      </div>
    </div>

    <!-- treelist -->
    <ItemPanel v-show="!isFullScreen" :tree-list="treeList" />
  </div>
</template>

<script>
import G6 from '@antv/g6';
import randomStr from './utils/randomStr';
import ContextMenu from './components/contextMenu.vue';
import ItemPanel from './components/itemPanel.vue';
import Toolbar from './components/toolbar.vue';
import customNode from './baseConfig/customNode';
import behaviors from './behavior';
import customEdge from './baseConfig/customEdge';
import eventBus from './utils/eventBus';

export default {
  name: 'VisualFlow',
  components: {
    ContextMenu,
    ItemPanel,
    Toolbar,
  },
  props: {
    treeList: {
      type: Array,
      required: true,
    },
    toolList: {
      type: Array,
      default: () => [],
    },
    contextmenuList: {
      type: Object,
      default: () => {},
    },

    graph: {
      type: Object,
      required: true,
      default: () => {},
    },
    currentNode: {
      type: Object,
      required: true,
      default: () => {},
    },
    currentEdge: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      showContextmenu: false,
      contextType: '',
      contextmenuPos: {
        left: '0',
        top: '0',
      },

      isFullScreen: false,
      toolbalEvent: '',
    };
  },
  watch: {
    toolbalEvent(newValue) {
      if (newValue === '') {
        return;
      }
      switch (newValue) {
        case 'fullScreen':
          this.isFullScreen = !this.isFullScreen;
          this.graphResize();
          break;
        case 'autoFormat':
          this.autoFormatGraph();
          break;
        case 'adjustCanvas':
          this.graph.fitView(20);
          break;
        case 'realRatio':
          this.graphZoom('to');
          break;
        case 'zoomIn':
          this.graphZoom('in');
          break;
        case 'zoomOut':
          this.graphZoom('out');
          break;
        default:
          break;
      }
      this.toolbalEvent = '';
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    dragoverHandler(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    },
    dropHandler(e) {
      e.preventDefault();

      const nodeData = JSON.parse(e.dataTransfer.getData('nodeData'));
      const { width, height } = JSON.parse(e.dataTransfer.getData('nodeArea'));

      const pointPos = this.graph.getPointByCanvas(
        e.offsetX - e.dataTransfer.getData('offsetX') + width / 2,
        e.offsetY - e.dataTransfer.getData('offsetY') + height / 2,
      );
      const { x, y } = pointPos;

      const inDistance = 1 / (nodeData.inPoints.length + 1);
      const outDistance = 1 / (nodeData.outPoints.length + 1);
      const anchorPoints = [];

      nodeData.inPoints = nodeData.inPoints.map((point, index) => {
        anchorPoints.push([inDistance * (index + 1), 0]);
        return {
          ...point,
          pos: [inDistance * (index + 1), 0],
        };
      });
      nodeData.outPoints = nodeData.outPoints.map((point, index) => {
        anchorPoints.push([outDistance * (index + 1), 1]);
        return {
          ...point,
          pos: [outDistance * (index + 1), 1],
        };
      });

      this.graph.addItem('node', {
        id: `node-${randomStr(10)}`,
        x,
        y,
        height,
        width,
        anchorPoints,
        type: 'customNode',

        ...nodeData,
      });
    },

    contextmenuHandler(e, type) {
      if (type === 'edge') {
        this.$emit('update:currentEdge', e.item);
      }
      if (type === 'node') {
        this.$emit('update:currentNode', e.item);
      }

      this.contextType = type;
      this.showContextmenu = true;
      const pos = this.graph.getCanvasByPoint(e.x, e.y);
      this.contextmenuPos.left = `${pos.x}px`;
      this.contextmenuPos.top = `${pos.y}px`;
    },
    preventContextmenu(e) {
      e.preventDefault();
      return false;
    },
    contextmenuEvent(eventName) {
      this.$emit('contextmenuEvent', eventName);
    },
    closeContextmenu() {
      this.showContextmenu = false;
    },

    autoFormatGraph() {
      this.graph.updateLayout({
        type: 'dagre',
        rankdir: 'TB',
        nodesep: 70,
        ranksep: 30,
      });
    },
    graphResize() {
      this.$nextTick(() => {
        const container = document.getElementById('g6-container');
        const height = container.offsetHeight;
        const width = container.offsetWidth;

        this.graph.changeSize(width, height);
      });
    },
    graphZoom(type) {
      const canvasX = this.graph.get('width') / 2;
      const canvasY = this.graph.get('height') / 2;
      const { x, y } = this.graph.getPointByCanvas(canvasX, canvasY);

      if (type === 'in') {
        this.graph.zoom(1.1, { x, y });
      } else if (type === 'out') {
        this.graph.zoom(0.9, { x, y });
      } else if (type === 'to') {
        this.graph.get('group').resetMatrix();
      }
    },

    initG6() {
      Object.keys(customNode).forEach((key) => {
        G6.registerNode(key, customNode[key]);
      });
      Object.keys(customEdge).forEach((key) => {
        G6.registerEdge(key, customEdge[key]);
      });
      Object.keys(behaviors).forEach((key) => {
        G6.registerBehavior(key, behaviors[key]);
      });

      const container = document.getElementById('g6-container');
      const height = container.offsetHeight;
      const width = container.offsetWidth;

      const graphInstance = new G6.Graph({
        container: 'g6-container',
        height,
        width,
        defaultNode: {
          type: 'customNode',
        },
        modes: {
          default: ['drag-node', 'hoverNode', 'selectNode', 'selectEdge', 'drag-canvas'],
          addEdge: ['addEdge'],
        },
      });

      graphInstance.on('afterlayout', () => {
        const zoom = this.graph.getZoom();
        this.graph.get('group').resetMatrix();

        let sumX = 0;
        let sumY = 0;
        let total = 0;
        const centerX = this.graph.get('width') / 2;
        const centerY = this.graph.get('height') / 2;

        const nodes = this.graph.getNodes();
        nodes.forEach((node) => {
          const model = node.getModel();
          sumX += model.x;
          sumY += model.y;
          total += 1;
        });

        const dx = centerX - sumX / total;
        const dy = centerY - sumY / total;

        nodes.forEach((node) => {
          const model = node.getModel();
          node.update({
            x: model.x + dx,
            y: model.y + dy,
          });
        });
        this.graph.zoomTo(zoom, { x: centerX, y: centerY });
      });

      this.$emit('update:graph', graphInstance);
    },
    initEvent() {
      this.$bus = eventBus;
      Object.keys(this.contextmenuList).forEach((key) => {
        if (['node', 'edge', 'canvas'].indexOf(key) > -1) {
          this.$bus.$on(`${key}Contextmenu`, (e) => {
            this.contextmenuHandler(e, key);
          });
        }
      });
    },
    init() {
      this.initG6();
      this.initEvent();
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-container {
  position: relative;
  height: 100%;
  padding-top: 40px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 0px rgba(7, 10, 14, 0.05);

  .g6-container {
    position: relative;
    height: 100%;
  }
}
</style>

<style lang="scss">
.g6-visualized-container {
  position: relative;
  height: 100%;
  padding-left: 203px;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  &.full-screen {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
