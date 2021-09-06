<template>
  <div class="main-bar">
    <button class="btns">所有活動</button>
    <button class="btns">創建活動</button>
    <button class="btns">登入</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Welcome to Vue!",
    };
  },
  methods: {},
};
</script>

<style>
.main-bar {
  position: fixed;
  width: 100%;
  background-color: #EBE8E5;
  height: 50px;
  text-align: center;
}
.btns {
  height: 50px;
  width: 100px;
  background-color: #EBE8E5;
  border-color: #EBE8E5;
  border-style: none;
}
.btns:hover {
  background-color: rgb(238, 184, 136);
}
</style>
