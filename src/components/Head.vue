<template>
  <header id="Head">
    <button class="btns" @click="bShowChat = true">測試聊天室</button>
    <button class="btns">所有活動</button>
    <router-link :to="`/activityCreate`">
      <button class="btns">創建活動</button>
    </router-link>
    <button class="btns" @click="openLoginDialog">登入</button>
  </header>
</template>
<script></script>
