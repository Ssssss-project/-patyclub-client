<template>
  <div>
    <q-card-section horizontal>
      <q-card-section class="card">
          <router-link :to="`/`">
              <q-img src="../assets/PatyLogo.png" width="350px"/>
          </router-link>
        
      </q-card-section>

      <q-card-section class="card1">
        <q-form @submit="resetPassowrd" style="width:80%">
          <q-card-section align="left">
            <label>密碼設定(至少六碼)</label>
            <q-input
              outlined
              v-model="sPassword"
              :type="bIsPwd ? 'password' : 'text'"
              label="輸入密碼"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && passowrdValidateHandler()) ||
                  '請包含大小寫字母以及數字',
              ]"
              ><template v-slot:append>
                <q-icon
                  :name="bIsPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="bIsPwd = !bIsPwd"
                />
              </template>
            </q-input>
            <q-input
              outlined
              hide-bottom-space
              v-model="sConfirmPassword"
              :type="bIsPwd ? 'password' : 'text'"
              label="再次確認密碼"
              :rules="[(val) => val === sPassword || '密碼不符，請再次確認']"
              ><template v-slot:append>
                <q-icon
                  :name="bIsPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="bIsPwd = !bIsPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-section align="center">
            <q-btn label="送出" type="submit" />
          </q-card-section>
        </q-form>
      </q-card-section>
    </q-card-section>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const route = useRoute();
    const token = ref("");

    // passowrd
    const bIsPwd = ref(true);
    const sPassword = ref("");
    const sConfirmPassword = ref("");

    // 取得tokebn
    onMounted(() => (token.value = route.params.token));

    // import ajv 驗證
    const Ajv = require("ajv");
    const ajv = new Ajv();

    // 定義ajv schema
    const passwordSchema = {
      type: "string",
      pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$",
    };

    // 編譯schema
    const passwordValidate = ajv.compile(passwordSchema);

    // 驗證密碼function
    function passowrdValidateHandler() {
      const valid = passwordValidate(sPassword.value);
      if (!valid) console.log(passwordValidate.errors);
      return valid;
    }

    // 重設密碼functtion
    function resetPassowrd() {
      console.log("token:" + token.value);
      console.log("password:" + sPassword.value);
    }

    return {
      bIsPwd,
      sPassword,
      sConfirmPassword,
      passowrdValidateHandler,
      resetPassowrd,
    };
  },
};
</script>
<style lang="scss">
.card {
  background-color: lightgray;
  height: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card1 {
  height: 600px;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
