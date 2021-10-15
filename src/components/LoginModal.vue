<template>
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
