<template>
  <li>
    <template v-if="treeNode.children">
      <div :style="computedPadding">
        <p
          :class="{'title': true, 'on': treeNode.showFlag}"
          @click="treeNode.showFlag = !treeNode.showFlag"
        >
          {{ treeNode.label }}
        </p>
      </div>
      <ul v-show="treeNode.showFlag">
        <RecursionItem
          v-for="(item, index) in treeNode.children"
          :key="index"
          :tree-node="item"
          :deep="deep + 1"
        />
      </ul>
    </template>
    <template v-else>
      <p
        class="item-button"
        draggable="true"
        @dragstart="dragstartHandler($event, treeNode)"
      >
        {{ treeNode.label }}
      </p>
    </template>
  </li>
</template>

<script>
export default {
  name: 'RecursionItem',
  props: {
    treeNode: {
      type: Object,
    },
    deep: {
      type: Number,
    },
  },
  computed: {
    computedPadding() {
      return {
        'padding-left': `${this.deep * 10}px`,
      };
    },
  },
  methods: {
    dragstartHandler(e, nodeData) {
      e.dataTransfer.setData('offsetX', e.offsetX);
      e.dataTransfer.setData('offsetY', e.offsetY);
      e.dataTransfer.setData('nodeArea', JSON.stringify({ width: e.target.offsetWidth, height: e.target.offsetHeight }));
      e.dataTransfer.setData('nodeData', JSON.stringify(nodeData));
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  height: 28px;
  font-size: 12px;
  line-height: 28px;
  color: #4A5366;
  padding-left: 20px;
  font-weight: bold;
  cursor: pointer;

  &:after{
    position: absolute;
    content: ' ';
    left: 8px;
    top: 50%;
    margin-top: -4px;
    border: 4px solid transparent;
    border-left-color: #bbb;
    transition: .2s all linear;
  }
  &.on:after {
    transform: rotate(90deg);;
  }
}
.item-button {
  width: 200px;
  height: 32px;
  margin: 0 auto 5px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 32px;
  text-align: center;
  color: #4A5366;
  cursor: pointer;
}
.item-button:hover {
  background: #FFFFFF;
  border: 1px solid #E4E5EA;
  border-left: 3px solid #6ab7ff;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.05);
  border-radius: 4px;
}
</style>
