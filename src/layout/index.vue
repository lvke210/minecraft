<!--
 * @Description:  
 * @Author: owen
 * @Date: 2021-08-27 10:13:52
 * @LastEditTime: 2021-08-27 11:25:15
-->
<template>
  <div class="wrap">
    <div class="navi">
      <div v-for="item in list" :key="item.meta.title" @click="hdclick(item)">
        {{ `  -${item.meta.title}-  ` }}
      </div>
    </div>
    <div class="cont"><router-view /></div>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    console.log(this.$router);
    this.list = this.$router.options.routes[1].children;
  },
  methods: {
    hdclick(e) {
      console.log(e);
      this.$router.push({ path: e.path });
    },
  },
};
</script>

<style type="text/css">
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
html {
  overflow-x: hidden;
  overflow-y: hidden;
}
.cont {
  width: 100vw;
  height: 100vh;
}
.navi {
  position: absolute;
  top: 50px;
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>
