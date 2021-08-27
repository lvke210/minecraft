<!--
 * @Description:  
 * @Author: owen
 * @Date: 2021-08-27 11:03:39
 * @LastEditTime: 2021-08-27 11:13:49
-->
<template>
  <div class="router">
    <router-link :to="{ name: 'index' }">welcome</router-link>
  </div>
</template>
<script>
export default {
  name: "Welcome",
};
</script>
<style scoped>
.router a {
  font-size: 100px;
  text-decoration: none;
}
.router {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
