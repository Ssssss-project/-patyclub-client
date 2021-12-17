<template>
  <Head />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import Head from "./components/Head.vue";

export default {
    components: {
        Head,
    },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 4% 10%;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
