<template>
  <div class="item-panel-container">
    <ul>
      <RecursionItem
        v-for="(item, index) in treeList"
        :key="index"
        :tree-node="item"
        :deep="0"
      />
    </ul>
  </div>
</template>

<script>
import RecursionItem from './recursionItem.vue';

export default {
  name: 'ItemPanel',
  components: {
    RecursionItem,
  },
  props: {
    treeList: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.item-panel-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 195px;
  height: 100%;
  user-select: none;
  z-index: 2;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
