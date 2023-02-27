<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <section class="container py-4">
      <!-- <div>
        {{ validated }}
      </div> -->
      <div class="mb-3">
        <label for="">Enter eNaira Phone Number</label>
        <div class="input-field">
          <i-icon icon="ic:outline-lock" width="24px" />
          <input
            type="tel"
            maxlength="11"
            v-model="credentials.auth.walletId"
          />
          <i-icon
            v-if="credentials.auth.walletId.length === 11"
            icon="teenyicons:tick-small-outline"
            width="24px"
            color="green"
          />
        </div>
      </div>

      <div class="mb-3">
        <label for="">Choose Network</label>
        <el-dropdown class="w-100" trigger="click">
          <div class="input-area el-dropdown-link">
            <span class="">
              <span class="d-flex align-items-center" style="gap: 10px">
                <span>
                  <img
                    v-if="selected.selected"
                    :src="selected.icon"
                    alt=""
                    style="width: 25px; height: 25px; border-radius: 3px"
                  />
                </span>
                <span>{{
                  selected.selected ? selected.name : "Select Provider"
                }}</span>
              </span>
            </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>

          <el-dropdown-menu slot="dropdown" class="w-50">
            <el-dropdown-item v-for="item in networks" :key="item.id">
              <span
                @click="getNetwork(item)"
                class="d-flex align-items-center"
                style="gap: 10px"
              >
                <span>
                  <img
                    :src="item.icon"
                    alt=""
                    style="width: 25px; height: 25px; border-radius: 3px"
                  />
                </span>
                <span>{{ item.name }}</span>
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </section>

    <!-- Section To Select  -->
    <section>
      <div class="tabs-header mt-4">
        <span
          role="button"
          :class="{ active: tabItem === '1' }"
          @click="selectTab('1')"
          >For Myself</span
        >
        <span
          role="button"
          :class="{ active: tabItem === '2' }"
          @click="selectTab('2')"
          >For Others</span
        >
      </div>
      <div class="tab-content container">
        <div class="mb-3">
          <label for="">Choose Category</label>
          <el-dropdown class="w-100" trigger="click">
            <div class="input-area el-dropdown-link">
              <span>{{ selectedCategory.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>

            <el-dropdown-menu slot="dropdown" class="w-50">
              <el-dropdown-item v-for="item in categories" :key="item.id">
                <span
                  @click="getCategory(item)"
                  class="d-flex align-items-center"
                  style="gap: 10px"
                >
                  <span>{{ item.name }}</span>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="mb-4">
          <label for="">Enter Amount</label>
          <div class="input-qty d-flex align-items-center" style="gap: 10px">
            <span role="button" @click="handleChange('decrease')">
              <i-icon icon="ic:twotone-minus" />
            </span>
            <input
              type="tel"
              min="1"
              max="10"
              v-model="credentials.request.amount"
            />
            <span role="button" @click="handleChange('increase')">
              <i-icon icon="ic:baseline-plus" />
            </span>
          </div>
        </div>

        <!-- Select Amounts  -->
        <div class="select-amounts mb-4">
          <span role="button" @click="selectAmount('100')">₦100</span>
          <span role="button" @click="selectAmount('500')">₦500</span>
          <span role="button" @click="selectAmount('1000')">₦1,000</span>
          <span role="button" @click="selectAmount('5000')">₦5,000</span>
        </div>

        <!-- Enter Mobile Number -->
        <div class="mb-3" v-if="tabItem === '2'">
          <label for="">Mobile Number</label>
          <div class="input-field">
            <input
              type="tel"
              maxlength="11"
              v-model="credentials.request.phone"
            />
            <i-icon
              icon="ic:baseline-phone-in-talk"
              width="24px"
              color="green"
            />
          </div>
        </div>
        <!-- <ForMe
          v-if="tabItem === '1'"
          :Amount.sync="credentials.request.amount"
          @selectNum="selectNum"
          @handleChange="handleChange"
        />
        <ForOthers
          :Amount.sync="credentials.request.amount"
          :PhoneNumber.sync="credentials.request.phone"
          v-if="tabItem === '2'"
          @selectNum="selectNum"
          @handleChange="handleChange"
        /> -->
      </div>
    </section>

    <!-- Button  to Continue -->
    <div class="mt-3 container">
      <button
        v-if="tabItem === '1'"
        @click="continueToNext"
        :class="{
          'bg-secondary':
            credentials.auth.walletId === '' ||
            credentials.request.net === '' ||
            credentials.request.amount < 1 ||
            credentials.auth.walletId.length < 11 ||
            !selectedCategory.selected,
        }"
        :disabled="
          credentials.auth.walletId === '' ||
          credentials.request.net === '' ||
          credentials.request.amount < 1 ||
          credentials.auth.walletId.length < 11 ||
          !selectedCategory.selected
        "
        class="btn--primary w-100"
      >
        Continue
      </button>
      <button
        v-if="tabItem === '2'"
        @click="continueToNext"
        :class="{
          'bg-secondary':
            credentials.auth.walletId === '' ||
            credentials.request.net === '' ||
            credentials.request.amount < 1 ||
            credentials.auth.walletId.length < 11 ||
            !selectedCategory.selected ||
            credentials.request.phone === '' ||
            credentials.request.phone.length < 11,
        }"
        :disabled="
          credentials.auth.walletId === '' ||
          credentials.request.net === '' ||
          credentials.request.amount < 1 ||
          credentials.auth.walletId.length < 11 ||
          !selectedCategory.selected
        "
        class="btn--primary w-100"
      >
        Continue
      </button>
    </div>

    <!-- Bottom Drawer  -->
    <div>
      <el-drawer
        title="I am the title"
        :visible.sync="drawer"
        direction="btt"
        :withHeader="false"
        :before-close="handleClose"
      >
        <div v-if="!succesful && !failed">
          <KeyBoard @close="handleClose" @done="done" />
        </div>

        <div class="succesful" v-show="succesful">
          <h5 class="text-center font-weight-bold">Success</h5>
          <div class="my-2">
            <span>
              <i-icon icon="ic:twotone-check" class="success-status" />
            </span>
          </div>

          <div class="mt-4">
            <h6
              class="text-center font-weight-bold"
              style="color: var(--primary-color)"
            >
              Your N{{ responseData.amount }} airtime <br />
              purchase was successful.
            </h6>
            <hr />
            <h6 class="small text-muted mb-3 text-center">
              Transaction Details
            </h6>
            <div>
              <div class="details">
                <span>Date</span>
                <span class="text-muted">{{ timestamp }}</span>
              </div>
              <hr />
              <div class="details">
                <span>Reference</span>
                <span class="text-muted">{{ responseData.reference }}</span>
              </div>
              <hr />
              <div class="details">
                <span>Beneficiary</span>
                <span class="text-muted">{{ credentials.request.phone }}</span>
              </div>
            </div>
            <div class="mt-4">
              <button class="btn--primary w-100" @click="handleClose">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div class="succesful" v-show="failed">
          <h5 class="text-center font-weight-bold text-danger">Error</h5>
          <div class="my-2 text-center">
            <span class="fail-status">
              <i-icon
                icon="mdi:warning-circle-outline"
                class="text-danger"
                width="80px"
              />
            </span>
          </div>

          <div class="mt-4">
            <h6 class="text-center font-weight-bold">
              Your N{{ credentials.request.amount }} airtime <br />
              purchase was not successful.
            </h6>
            <div class="text-center">
              <small class="text-danger">{{ responseData.message }}</small>
            </div>
          </div>
          <div class="mt-4">
            <button class="btn--primary w-100" @click="handleClose">Ok</button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import categories from "@/api/categories";
import networks from "@/api/networks";
// import ForMe from "../components/forMe.vue";
// import ForOthers from "../components/forOthers.vue";
import KeyBoard from "../components/KeyBoard.vue";
export default {
  components: {
    KeyBoard,
  },
  data() {
    return {
      loading: false,
      networks,
      categories,
      drawer: false,
      activeName: "first",
      succesful: false,
      failed: false,
      tabItem: "1",
      selectedCategory: {
        selected: true,
        name: "Airtime Purchase",
        icon: null,
      },
      selected: {
        selected: false,
        name: "",
        icon: null,
      },
      credentials: {
        auth: {
          walletId: "",
          passcode: "",
        },
        request: {
          net: "",
          phone: "",
          amount: 0,
        },
      },
      responseData: {},
      timestamp: "",
      phoneNum: "",
    };
  },

  methods: {
    getCategory(value) {
      this.selectedCategory = value;
      this.selectedCategory.selected = true;
    },

    continueToNext() {
      this.drawer = true;
      if (this.tabItem === "1") {
        this.credentials.request.phone = this.credentials.auth.walletId;
        localStorage.setItem("credentials", JSON.stringify(this.credentials));
      } else {
        localStorage.setItem("credentials", JSON.stringify(this.credentials));
      }
    },

    getNetwork(value) {
      this.selected = value;
      this.selected.selected = true;
      this.credentials.request.net = value.alias;
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    selectTab(value) {
      this.tabItem = value;
    },

    selectAmount(value) {
      this.credentials.request.amount = Number(value);
    },

    done(value) {
      this.credentials.auth.passcode = value;
      this.loading = true;
      axios
        .post("https://enaira.cowrie.services/airtime", this.credentials)
        .then((res) => {
          console.log(res);
          this.succesful = true;
          this.responseData = res.data.data;
          this.reset();
        })
        .catch((err) => {
          console.log(err);
          this.failed = true;
          this.responseData = err.response.data;
        })
        .finally(() => {
          this.getNow();
          this.loading = false;
        });
    },

    handleClose() {
      (this.failed = false), (this.succesful = false);
      this.drawer = false;
      this.credentials.request.net = "";
      this.credentials.request.phone = "";
      this.credentials.request.amount = 0;
      this.selected.selected = false;
    },

    handleChange(value) {
      if (value === "decrease") {
        if (this.credentials.request.amount > 0) {
          this.credentials.request.amount--;
        } else {
          return this.credentials.request.amount;
        }
      } else {
        this.credentials.request.amount++;
      }
    },

    reset() {
      this.credentials.request.net = "";
      this.credentials.request.phone = "";
      this.credentials.request.amount = 0;
      this.selected.name = "Select Provider";
      this.selected.selected = false;
    },

    getNow: function () {
      let days = [
        { id: 1, name: "Jan" },
        { id: 2, name: "Feb" },
        { id: 3, name: "Mar" },
        { id: 4, name: "Apr" },
        { id: 5, name: "May" },
        { id: 6, name: "Jun" },
        { id: 7, name: "Jul" },
        { id: 8, name: "Aug" },
        { id: 9, name: "Sept" },
        { id: 10, name: "Oct" },
        { id: 11, name: "Nov" },
        { id: 12, name: "Dec" },
      ];
      const today = new Date();
      const date =
        today.getDate() +
        " " +
        days[today.getMonth() + 1].name +
        " " +
        today.getFullYear();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " | " + time;
      // const dateTime = date;
      this.timestamp = dateTime;
    },
  },

  computed: {},
};
</script>
