<!--<template>
  <div id="LoginModal">
    <transition name="slide-fade">
      <div v-if="openModal">
        <div class="overlay">
          <div
            class="modal"
            v-if="bLoginOrRegeist"
          >
            <div class="btn-cancel">
              <button @click="closeModal()">X</button>
            </div>
            <label class="welcome">歡迎光臨</label>
            <img src="../assets/PatyLogo.png" />
            <input
              type="text"
              placeholder="Email/帳號"
              v-model="sLoginAccount"
            />
            <input
              type="password"
              placeholder="密碼"
              v-model="sLoginPassword"
            />
            <div class="right">
              <a
                class="forget"
                href=""
              >忘記密碼了, 995 QwQ</a>
            </div>
            <button
              class="btn-login"
              @click="getLoginResult()"
            >登入</button>
            <button
              class="btn-regist"
              @click="bLoginOrRegeist = !bLoginOrRegeist"
            >
              註冊
            </button>
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

          <div
            class="modal"
            v-if="!bLoginOrRegeist"
          >
            <div class="btn-cancel">
              <button @click="closeModal()">X</button>
            </div>
            <label class="register-text">成為<span><img
                  src="../assets/PatyLogo.png"
                  width="125"
                /></span>的一分子 =)</label>

            <div class="left">
              <label class="register-text">帳號設定</label>
              <input
                type="text"
                v-model="sRegisterAccount"
              />
            </div>

            <div class="left">
              <label class="register-text">密碼設定</label>
              <input
                type="password"
                placeholder="輸入密碼"
                v-model="sRegisterPassword"
              />
              <input
                type="password"
                placeholder="再次確認"
                v-model="sRegisterConfirmPassword"
              />
              <div>
                <button>
                  <span>
                    <i
                      class="fas"
                      :class="{
                        'fa-eye-slash': true,
                        'fa-eye': false,
                      }"
                    ></i>
                  </span>
                </button>
              </div>
            </div>

            <div class="left">
              <label class="register-text">連結信箱</label>
              <input
                type="text"
                v-model="sRegisterEmail"
              />
            </div>

            <div class="check-div">
              <input
                type="checkbox"
                style="margin-right:5px;width:15px;height:15px;"
                v-model="bCheckPrivacy"
              />
              <label class="check-text">我已經閱讀過且同意PAty club的服務條款以及隱私權政策。
              </label>
            </div>

            <div class="check-div">
              <input
                type="checkbox"
                style="margin-right:5px;width:15px;height:15px;"
                v-model="bCheckGetEmail"
              />
              <label class="check-text">我知道PAty
                club會寄送給我一些電子郵件，例如私人訊息、通知、公告訊息等，但我隨時可以在設定中取消這些信件的寄送。
              </label>
            </div>

            <div>
              <button
                class="btn-regeist-regist"
                style="margin-bottom:5px"
                @click="registerHandler()"
              >
                註冊
              </button>
              <button
                class="btn-regist"
                @click="bLoginOrRegeist = !bLoginOrRegeist"
              >
                返回登入畫面
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { apiGetLoginResult, apiPostRegister } from "@/apis/api/userRequest.ts";
export default {
  props: {
    openModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      bLoginOrRegeist: true,
      sLoginAccount: "",
      sLoginPassword: "",
      sRegisterAccount: "",
      sRegisterPassword: "",
      sRegisterConfirmPassword: "",
      sRegisterEmail: "",
      bCheckPrivacy: false,
      bCheckGetEmail: false,
    };
  },
  methods: {
    closeModal() {
      this.bLoginOrRegeist = true;
      this.$emit("close-modal");
    },
    getLoginResult() {
      apiGetLoginResult({
        account: this.sLoginAccount,
        password: this.sLoginPassword,
      }).then((response) => {
        if (response.status == 200) {
          alert("登入成功");
        }
      });
    },
    registerHandler() {
      if (
        this.sRegisterPassword === this.sRegisterConfirmPassword &&
        this.bCheckGetEmail &&
        this.bCheckPrivacy
      ) {
        apiPostRegister({
          account: this.sRegisterAccount,
          password: this.sRegisterPassword,
          email: this.sRegisterEmail,
        }).then((response) => {
          if (response.status == 200) {
            alert("註冊成功");
            this.resetData();
          }
        });
      } else {
        alert("密碼不符 或未勾選");
      }
    },
    resetData() {
      this.sRegisterAccount = "";
      this.sRegisterPassword = "";
      this.sRegisterConfirmPassword = "";
      this.sRegisterEmail = "";
      this.bCheckPrivacy = false;
      this.bCheckGetEmail = false;
    },
  },
};
</script>
-->
<template>
  <q-dialog ref="dialog" @hide="onDialogHide" id="LoginModal">
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
            filled
            v-model="sLoginAccount"
            label="Email/帳號"
            style="width:278px"
            :rules="[(val) => (val && val.length > 0) || '請輸入email']"
          />

          <q-input
            filled
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
              @click="bLoginOrRegeist = !bLoginOrRegeist"
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
    <q-card style="width:400px" align="center" v-show="!bLoginOrRegeist">
      <q-card-section align="center">
        <label class="title-text"
          >成為
          <span><img src="../assets/PatyLogo.png" width="125"/></span> 的一分子
          =)</label
        >
      </q-card-section>

      <q-card-section align="center">
        <q-form @submit="registerSubmit">
          <q-card-section align="left">
            <label class="content-text">帳號設定</label>
            <q-input
              ref="accountRef"
              filled
              v-model="sRegisterAccount"
              label="輸入帳號"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '請輸入帳號']"
            />

            <label class="content-text">密碼設定</label>
            <q-input
              ref="passwordRef"
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
              ref="confirmPasswordRef"
              filled
              v-model="sRegisterConfirmPassword"
              :type="bRegisterIsPwd ? 'password' : 'text'"
              label="再次確認密碼"
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

            <label class="content-text">連結信箱</label>
            <q-input
              ref="emailRef"
              filled
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
            />
          </q-card-section>

          <q-card-section align="left">
            <q-checkbox
              color="orange"
              v-model="bCheckGetEmail"
              label="我知道PAty
                club會寄送給我一些電子郵件，例如私人訊息、通知、公告訊息等，但我隨時可以在設定中取消這些信件的寄送。"
            />
          </q-card-section>

          <q-card-section align="center">
            <q-btn class="btn-regeister" label="註冊" type="submit" />
            <q-btn
              class="btn-transToLogin"
              label="返回登入頁面"
              @click="
                bLoginOrRegeist = !bLoginOrRegeist;
                resetData();
                reset();
              "
            />
          </q-card-section>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
// import { apiGetLoginResult } from "@/apis/api/userRequest.ts";
import { ref } from "vue";
export default {
  setup() {
    const accountRef = ref(null);
    const passwordRef = ref(null);
    const confirmPasswordRef = ref(null);
    const emailRef = ref(null);
    return {
      accountRef,
      passwordRef,
      confirmPasswordRef,
      emailRef,
      reset() {
        accountRef.value.resetValidation();
        passwordRef.value.resetValidation();
        confirmPasswordRef.value.resetValidation();
        emailRef.value.resetValidation();
      },
    };
  },
  props: {},

  emits: [
    // REQUIRED
    "ok",
    "hide",
  ],

  data() {
    return {
      // trans Login and Register mode
      bLoginOrRegeist: true,

      // Login mode
      sLoginAccount: "",
      sLoginPassword: "",
      bLoginIsPwd: true,

      // Register mode
      sRegisterAccount: "",
      sRegisterPassword: "",
      sRegisterConfirmPassword: "",
      sRegisterEmail: "",
      bRegisterIsPwd: true,
      bCheckPrivacy: false,
      bCheckGetEmail: false,
    };
  },

  methods: {
    // following method is REQUIRED
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      this.$emit("ok");
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      this.hide();
    },

    loginSubmit() {
      this.onOKClick();

      // apiGetLoginResult({
      //   account: this.sLoginAccount,
      //   password: this.sLoginPassword,
      // }).then((response) => {
      //   if (response.status == 200) {
      //     alert("登入成功");
      //   }
      // });
    },

    registerSubmit() {
      if (
        this.sRegisterPassword === this.sRegisterConfirmPassword &&
        this.bCheckGetEmail &&
        this.bCheckPrivacy
      ) {
        // apiPostRegister({
        //   account: this.sRegisterAccount,
        //   password: this.sRegisterPassword,
        //   email: this.sRegisterEmail,
        // }).then((response) => {
        //   if (response.status == 200) {
        //     alert("註冊成功");
        //     this.resetData();
        //   }
        // });
      } else {
        alert("密碼不符 或未勾選");
      }
    },
    resetData() {
      this.sRegisterAccount = "";
      this.sRegisterPassword = "";
      this.sRegisterConfirmPassword = "";
      this.sRegisterEmail = "";
      this.bCheckPrivacy = false;
      this.bCheckGetEmail = false;
    },
  },
};
</script>
