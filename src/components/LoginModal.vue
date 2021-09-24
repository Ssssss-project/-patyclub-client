<template>
  <div id="LoginModal">
    <transition name="slide-fade">
      <div v-if="openModal">
        <div class="overlay">
          <div class="modal">
            <div class="right">
              <button @click="closeModal()">X</button>
            </div>
            <label class="welcome">歡迎光臨</label>
            <img src="../assets/PatyLogo.png" />
            <input
              type="text"
              placeholder="Email/帳號"
            />
            <input
              type="password"
              placeholder="密碼"
            />
            <div class="right">
              <a
                class="forget"
                href=""
              >忘記密碼了, 995 QwQ</a>
            </div>
            <button class="btn-login">登入</button>
            <button class="btn-regist">註冊</button>
            <p />
            <div class="hr">
              <span class="line"></span>
              <span class="text">或者</span>
              <span class="line"></span>
            </div>
            <div>
              <button class="btn-google">以Google繼續</button>
              <button class="btn-facebook">以Facebook繼續</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    openModal: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>