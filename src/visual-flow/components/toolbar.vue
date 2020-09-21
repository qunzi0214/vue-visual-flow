<template>
  <div class="toolbar-root">
    <ul />
    <ul>
      <li v-for="(tool, index) in opitionalTool" :key="index" @click="updateEvent(tool)">
        <ToolItem :icon-type="tool" />
      </li>
    </ul>
  </div>
</template>

<script>
import ToolItem from './toolItem.vue';

export default {
  name: 'Toolbar',
  components: {
    ToolItem,
  },
  props: {
    toolbalEvent: {
      type: String,
      default: '',
    },
    toolList: {
      type: Array,
    },
  },
  computed: {
    opitionalTool() {
      return this.toolList
        .filter(
          (tool) => ['zoomIn', 'zoomOut', 'adjustCanvas', 'realRatio', 'autoFormat', 'fullScreen'].indexOf(tool) > -1,
        );
    },
  },
  methods: {
    updateEvent(type) {
      this.$emit('update:toolbalEvent', type);
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar-root {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  align-items: center;

  ul {
    display: flex;
  }
}
</style>
