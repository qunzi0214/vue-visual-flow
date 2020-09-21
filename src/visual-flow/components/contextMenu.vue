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
  background-color: #fff;
  border: 1px solid #e4e5ea;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.1);
  border-radius: 3px;
  user-select: none;

  li {
    width: 110px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #4a5366;
    font-size: 12px;
    cursor: pointer;
    transition: .1s ease-in all;

    p {
      width: 100px;
      height: 100%;
      margin: 0 auto;
    }
  }
  li:hover{
    color: rgb(0, 107, 255);
    background-color: #f2f7ff;
  }
}
</style>
