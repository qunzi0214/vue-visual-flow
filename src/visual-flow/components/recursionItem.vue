<template>
  <li v-if="treeNode.children" :class="{ 'one-level': deep === 0, 'other-level': deep !== 0 }">
    <div class="title-box" @click="treeNode.showFlag = !treeNode.showFlag">
      <p class="title">
        {{ treeNode.label }}
        <img
          :class="{ 'arrow': true, 'close': !treeNode.showFlag }"
          src="../../assets/arrow.png"
        >
      </p>
    </div>
    <ul v-if="treeNode.children" v-show="treeNode.showFlag" class="child-list">
      <RecursionItem
        v-for="(item, index) in treeNode.children"
        :key="index"
        :tree-node="item"
        :deep="deep + 1"
      />
    </ul>
  </li>
  <li v-else>
    <p
      class="item-button"
      draggable="true"
      @dragstart="dragstartHandler($event, treeNode)"
    >
      {{ treeNode.label }}
    </p>
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
  created() {
    if (this.deep >= 3) {
      throw new Error('树形组件深度超出范围');
    }
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
.one-level {
  margin-bottom: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 0px rgba(7, 10, 14, 0.05);
  padding: 10px 0 10px 20px;

  &:nth-last-child(1) {
    margin-bottom: 0;
  }
  .title {
    position: relative;
    display: inline-block;
    height: 26px;
    font-size: 14px;
    font-weight: 600;
    line-height: 26px;
    color: #000;
    cursor: pointer;
  }
}
.other-level {
  .title {
    position: relative;
    display: inline-block;
    height: 24px;
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    color: #000;
  }
}
.arrow {
  position: absolute;
  top: 50%;
  right: - 20px;
  margin-top: -6px;
  width: 12px;
  height: 12px;
  transition: .2s all linear;

  &.close {
    transform: rotate(-180deg);
  }
}
.child-list {
  padding-left: 14px;
}
.title-box {
  position: relative;
  padding-left: 14px;
  cursor: pointer;
}

.item-button {
  display: inline-block;
  height: 24px;
  padding: 0 12px;
  font-size: 12px;
  line-height: 22px;
  border-radius: 2px;
  border: 1px solid #fff;
  color: #666;
  cursor: pointer;
  transition: .1s all linear;
}
.item-button:hover {
  border-color: #999;
  color: #000;
}
</style>
