<template>
  <div class="main-bar">
    <button class="btns">所有活動</button>
    <button class="btns">創建活動</button>

    <router-link to="/login">
      <button class="btns" click="navigate">登入</button>
    </router-link>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Welcome to Vue!",
    };
  },
  methods: {
    routeLoginPage() {},
  },
};
</script>

<style>
.main-bar {
  position: fixed;
  width: 100%;
  background-color: #ebe8e5;
  height: 50px;
  text-align: right;
}
.btns {
  height: 50px;
  width: 100px;
  background-color: #ebe8e5;
  border-color: #ebe8e5;
  border-style: none;
}
.btns:hover {
  background-color: rgb(238, 184, 136);
}
</style>
