<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" id="LoginModal">
    <!-- login card -->
    <q-card style="width:400px" align="center" v-show="bLoginOrRegeist">
      <q-card-actions align="center">
        <label class="welcome">歡迎光臨</label>
      </q-card-actions>

      <q-card-actions align="center">
        <q-img
          src="../assets/PatyLogo.png"
          style="height: 159px; width: 278px"
        />
      </q-card-actions>

      <q-card-section align="center" style="padding-bottom:0px">
        <q-form @submit="loginSubmit">
          <q-input
            ref="LoginAccountRef"
            filled
            v-model="sLoginAccount"
            label="Email/帳號"
            style="width:278px"
            :rules="[(val) => (val && val.length > 0) || '請輸入email或帳號']"
          />

          <q-input
            filled
            ref="LoginPasswordRef"
            :type="bLoginIsPwd ? 'password' : 'text'"
            v-model="sLoginPassword"
            label="密碼"
            style="width:278px"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '請輸入密碼']"
          >
            <template v-slot:append>
              <q-icon
                :name="bLoginIsPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="bLoginIsPwd = !bLoginIsPwd"
              />
            </template>
          </q-input>

          <q-card-section align="right" class="forget">
            <a class="forgetText" href="">忘記密碼了, 995 QwQ</a>
          </q-card-section>

          <q-card-section align="center">
            <q-btn class="btn-login" label="登入" type="submit" />
            <q-btn
              class="btn-transToReister"
              label="註冊"
              @click="
                bLoginOrRegeist = !bLoginOrRegeist;
                resetLoginData();
              "
            />
          </q-card-section>
        </q-form>
      </q-card-section>

      <q-card-section class="hr">
        <span class="line"></span>
        <span class="text">或者</span>
        <span class="line"></span>
      </q-card-section>

      <q-card-section align="center">
        <q-btn
          class="btn-google"
          label="以Google繼續"
          @click="RegisterDialog = true"
        />
        <q-btn class="btn-facebook" label="以Facebook繼續" />
      </q-card-section>
    </q-card>

    <!-- register card -->
    <q-card align="center" v-show="!bLoginOrRegeist">
      <q-card-section align="center">
        <label class="title-text"
          >成為
          <span><img src="../assets/PatyLogo.png" width="125"/></span> 的一分子
          =)</label
        >
      </q-card-section>

      <q-card-section align="center" class="NoPaddingTopBottom">
        <q-form @submit="registerSubmit">
          <q-card-section align="left">
            <label class="content-text">帳號設定</label>
            <q-input
              ref="RegisterAccountRef"
              filled
              hide-bottom-space
              v-model="sRegisterAccount"
              label="輸入帳號"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '請輸入帳號']"
            />

            <label class="content-text">密碼設定</label>
            <q-input
              ref="RegisterPasswordRef"
              filled
              v-model="sRegisterPassword"
              :type="bRegisterIsPwd ? 'password' : 'text'"
              label="輸入密碼"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '請輸入密碼']"
              ><template v-slot:append>
                <q-icon
                  :name="bRegisterIsPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="bRegisterIsPwd = !bRegisterIsPwd"
                />
              </template>
            </q-input>
            <q-input
              ref="RegisterConfirmPasswordRef"
              filled
              hide-bottom-space
              v-model="sRegisterConfirmPassword"
              :type="bRegisterIsPwd ? 'password' : 'text'"
              label="再次確認密碼"
              :rules="[
                (val) => val === sRegisterPassword || '密碼不符，請再次確認',
              ]"
              ><template v-slot:append>
                <q-icon
                  :name="bRegisterIsPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="bRegisterIsPwd = !bRegisterIsPwd"
                />
              </template>
            </q-input>

            <label class="content-text">連結信箱</label>
            <q-input
              ref="RegisterEmailRef"
              filled
              hide-bottom-space
              v-model="sRegisterEmail"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '請輸入信箱']"
            />
          </q-card-section>
          <q-card-section align="left">
            <q-checkbox
              color="orange"
              v-model="bCheckPrivacy"
              label="我已經閱讀過且同意PAty club的服務條款以及隱私權政策。"
              style="font-size: 10px;"
            />
          </q-card-section>

          <q-card-section align="left" class="NoPaddingTopBottom">
            <q-checkbox
              color="orange"
              v-model="bCheckGetEmail"
              label="我知道PAty
                club會寄送給我一些電子郵件，例如私人訊息、通知、公告訊息等，但我隨時可以在設定中取消這些信件的寄送。"
              style="font-size: 10px;"
            />
          </q-card-section>

          <q-card-section align="center">
            <q-btn class="btn-regeister" label="註冊" type="submit" />
            <q-btn
              class="btn-transToLogin"
              label="返回登入頁面"
              @click="
                bLoginOrRegeist = !bLoginOrRegeist;
                resetRegisterData();
              "
            />
          </q-card-section>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { apiGetLoginResult, apiPostRegister } from "@/apis/api/userRequest.ts";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { ref } from "vue";

export default {
  props: {},

  emits: [...useDialogPluginComponent.emits],

  setup() {
    const $q = useQuasar();
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

    // trans login and regeist
    const bLoginOrRegeist = ref(true);

    // login value
    const sLoginAccount = ref("");
    const LoginAccountRef = ref(null);

    const sLoginPassword = ref("");
    const LoginPasswordRef = ref(null);

    const bLoginIsPwd = ref(true);
    
    // register value
    const sRegisterAccount = ref("");
    const RegisterAccountRef = ref(null);

    const sRegisterPassword = ref("");
    const RegisterPasswordRef = ref(null);

    const sRegisterConfirmPassword = ref("");
    const RegisterConfirmPasswordRef = ref(null);

    const sRegisterEmail = ref("");
    const RegisterEmailRef = ref(null);

    const bCheckPrivacy = ref(false);
    const bCheckGetEmail = ref(false);

    const bRegisterIsPwd = ref(true);

    function loginSubmit() {
      apiGetLoginResult({
        account: sLoginAccount.value,
        password: sLoginPassword.value,
      }).then((response) => {
        if (response.status == 200) {
          $q.notify({
            icon: "done",
            color: "positive",
            message: "登入成功",
          });

          onDialogOK();
        }
      });
    }

    function registerSubmit() {
      if (bCheckPrivacy.value !== true || bCheckGetEmail.value !== true) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "請勾選服務條款",
        });
      } else {
        apiPostRegister({
          account: sRegisterAccount.value,
          password: sRegisterPassword.value,
          email: sRegisterEmail.value,
        }).then((response) => {
          if (response.status == 200) {
            $q.notify({
              icon: "done",
              color: "positive",
              message: "註冊成功，請重新登入",
            });
            bLoginOrRegeist.value = true;
            resetRegisterData();
          }
        });
      }
    }

    function resetLoginData() {
      sLoginAccount.value = null;
      LoginAccountRef.value.resetValidation();

      sLoginPassword.value = null;
      LoginPasswordRef.value.resetValidation();
    }

    function resetRegisterData() {
      sRegisterAccount.value = null;
      RegisterAccountRef.value.resetValidation();

      sRegisterPassword.value = null;
      RegisterPasswordRef.value.resetValidation();

      sRegisterConfirmPassword.value = null;
      RegisterConfirmPasswordRef.value.resetValidation();

      sRegisterEmail.value = null;
      RegisterEmailRef.value.resetValidation();

      bCheckPrivacy.value = false;
      bCheckGetEmail.value = false;
    }

    return {
      // dialog require
      dialogRef,
      onDialogHide,

      // login value
      sLoginAccount,
      LoginAccountRef,

      sLoginPassword,
      LoginPasswordRef,

      // register return
      sRegisterAccount,
      RegisterAccountRef,

      sRegisterPassword,
      RegisterPasswordRef,

      sRegisterConfirmPassword,
      RegisterConfirmPasswordRef,

      sRegisterEmail,
      RegisterEmailRef,

      bCheckPrivacy,
      bCheckGetEmail,

      bLoginOrRegeist,
      bLoginIsPwd,
      bRegisterIsPwd,

      // functions
      loginSubmit,
      registerSubmit,
      resetLoginData,
      resetRegisterData,
    };
  },
};
</script>
