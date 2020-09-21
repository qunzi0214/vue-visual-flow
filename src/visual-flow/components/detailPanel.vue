<template>
  <div class="detail-panel-container">
    <p v-if="false" class="title">
      参数配置
    </p>
    <p v-else class="tips">
      选取节点并配置节点参数
    </p>
    <ul class="form-box">
      aa
    </ul>
  </div>
</template>

<script>

export default {
  name: 'DetailPanel',
  props: {
  },
  data() {
    return {
      formData: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.detail-panel-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background-color: #fafafa;
  border-left: 1px solid #E4E5EA;
  z-index: 2;
  overflow: scroll;
  user-select: none;
}
.title {
  line-height: 40px;
  height: 40px;
  font-size: 14px;
  color: #4A5366;
  text-align: center;
  margin-bottom: 20px;
}
.tips {
  position: absolute;
  top: 50%;
  left: 50%;
  line-height: 40px;
  width: 100%;
  height: 40px;
  font-size: 14px;
  color: #aaa;
  text-align: center;
  margin-bottom: 20px;
  transform: translate(-50%, -50%);
}
</style>
