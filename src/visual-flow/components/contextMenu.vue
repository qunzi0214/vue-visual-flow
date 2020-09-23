<template>
  <ul class="contextmenu-root">
    <template v-if="contextType === 'node'">
      <li
        v-for="(item, index) in contextmenuList.node"
        :key="index"
        @click="contextmenuEvent(item.eventName)"
      >
        <p>{{ item.label }}</p>
      </li>
    </template>
    <template v-if="contextType === 'edge'">
      <li
        v-for="(item, index) in contextmenuList.edge"
        :key="index"
        @click="contextmenuEvent(item.eventName)"
      >
        <p>{{ item.label }}</p>
      </li>
    </template>
    <template v-if="contextType === 'canvas'">
      <li
        v-for="(item, index) in contextmenuList.canvas"
        :key="index"
        @click="contextmenuEvent(item.eventName)"
      >
        <p>{{ item.label }}</p>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    contextType: {
      type: String,
      default: 'node',
    },
    contextmenuList: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    contextmenuEvent(eventName) {
      this.$emit('contextmenuEvent', eventName);
    },
  },
};
</script>

<style lang="scss" scoped>
.contextmenu-root {
  position: absolute;
  z-index: 9;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(40, 58, 92, 0.15);
  border-radius: 4px;
  border: 1px solid #E4E5EA;
  user-select: none;
  padding: 5px 0;

  li {
    width: 118px;
    height: 32px;
    padding: 0 15px;
    line-height: 32px;
    color: #202020;
    font-size: 14px;
    cursor: pointer;
    transition: .1s ease-in all;
  }
  li:hover{
    background-color: #EFF0F4;
  }
}
</style>
