# 介绍

`` vue-visual-flow `` 是一个基于 `` antv/g6 `` 实现的可视化流程配置 `` Vue `` 组件

> ~~目前 ``antv/g6`` 版本更新后会出现自定义图形消失的问题，暂不支持新版 ``antv/g6``，追踪issue：[g6-issue](https://github.com/antvis/G6/issues/2078)~~ 

> issue 已经被修复，请使用 `` antv/g6@3.7.3 `` 及以上版本

[个人使用demo](https://github.com/qunzi0214/vue-visual-flow-demo)

# 使用

### 安装

```
$ npm install @antv/g6 --save
$ npm install vue-visual-flow --save
```

### 配置

> main.js

``` javascript
import VisualFlow from 'vue-visual-flow';
Vue.use(VisualFlow);
```

> index.vue

``` html
<template>
  <div id="app">
    <visual-flow
      :tree-list="treeList"
      :tool-list="toolList"
      :contextmenu-list="contextmenuList"

      :graph.sync="graph"
      :current-node.sync="currentNode"
      :current-edge.sync="currentEdge"

      @contextmenuEvent="contextmenuEvent"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 左侧树形节点列表，兼容 2-n 深度
      treeList: [
        // 一级分类
        {
          label: '一级分类1',
          showFlag: false,
          children: [
            // 二级分类
            {
              label: '二级分类1-1',
              showFlag: false,
              children: [
                // 三级分类 (节点)
                {
                  // 基本属性
                  label: '节点1', // 节点显示名称
                  inPoints: [ // 入锚点数组
                    {
                      dataType: 'any', // [custom] | any 自定义锚点类型，只有相同类型(或其一为any)的入锚点和出锚点才可以连接
                      labelName: 'xxx',

                      // 自定义属性
                      id: 'xxx',
                    },
                    {
                      dataType: 'any',
                      labelName: 'xxx',

                      // 自定义属性
                      id: 'xxx',
                    },
                  ],
                  outPoints: [ // 出锚点数组
                    {
                      dataType: 'any',
                      labelName: 'xxx',

                      // 自定义属性
                      id: 'xxx',
                    },
                  ],

                  // 自定义属性
                  itemId: 'xxx', // 节点id
                },
              ],
            },
          ],
        },
      ],
      // 可选的画布控件
      toolList: ['zoomIn', 'zoomOut', 'adjustCanvas', 'realRatio', 'autoFormat', 'fullScreen'], 
      // 右键菜单配置
      contextmenuList: {
        // 节点右键菜单
        node: [
          {
            label: '删除节点',
            eventName: 'removeNode', // 自定义事件contextmenuEvent会捕获该字段
          },
        ],
        // 边右键菜单
        edge: [
          {
            label: '删除边',
            eventName: 'removeEdge',
          },
        ],
        // 画布右键菜单
        canvas: [
          {
            label: '不知道做点啥',
            eventName: 'unknow',
          },
        ],
      },

      // 与组件共享g6实例
      graph: {}, // g6实例
      currentNode: {}, // 左右键时节点实例
      currentEdge: {}, // 左右键时边实例
    };
  },
  methods: {
    contextmenuEvent(eventName) {
      // eventName 匹配 contextmenuList中同名字段
      console.log(eventName);
    },
  },
};
</script>
```