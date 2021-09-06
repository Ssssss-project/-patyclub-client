<template>
  <div id="app">
    <input type="text" v-model="input" />
    <a href="javascripts:;" @click="cerateHandler()">Create</a>
    <ul v-for="(content, index) in contents" :key="content.id">
      {{
        index
      }}.
      {{
        content.name
      }}
      <a href="javascripts:;">update</a>
      <a href="javascripts:;">delete</a>
    </ul>
  </div>
</template>

<script>
import * as Vue from "vue"; // in Vue 3
import axios from "axios";
import VueAxios from "vue-axios";

const app = Vue.createApp("#app");
app.use(VueAxios, axios);
export default {
  data() {
    return {
      contents: [],
      input: "",
    };
  },
  mounted() {
    axios.get("http://localhost:3000/contents").then((response) => {
      console.log(response.data);
      this.contents = response.data;
    });
  },
  methods: {
    cerateHandler() {
      if (!this.input) {
        return false;
      }

      axios
        .post("http://localhost:3000/contents", {
          name: this.input,
        })
        .then((res) => {
          (this.input = ""), this.contents.push(res.data);
        });
    },
  },
};
</script>