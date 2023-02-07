<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <section class="container py-4">
      <div class="mb-3">
        <label for="">Enter eWallet ID</label>
        <div class="input-field">
          <i-icon icon="ic:outline-lock" width="24px" />
          <input
            type="tel"
            maxlength="11"
            v-model="credentials.auth.walletId"
          />
          <i-icon
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
                <span>{{ selected.name }}</span>
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
        <ForMe
          v-if="tabItem === '1'"
          :Amount.sync="credentials.request.amount"
          @selectNum="selectNum"
        />
        <ForOthers
          :Amount.sync="credentials.request.amount"
          :PhoneNumber.sync="credentials.request.phone"
          v-if="tabItem === '2'"
          @selectNum="selectNum"
        />
      </div>
    </section>

    <!-- Button  to Continue -->
    <div class="mt-3 container">
      <button @click="continueToNext" class="btn--primary w-100">
        Continue
      </button>
    </div>

    <!-- Bottom Drawer  -->
    <div>
      <el-drawer
        title="I am the title"
        :visible.sync="drawer"
        direction="btt"
        size="80%"
        :withHeader="false"
        :before-close="handleClose"
      >
        <div v-if="!succesful && !failed">
          <KeyBoard @close="handleClose" @done="done" />
        </div>

        <div class="succesful" v-if="succesful">
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
                <!-- <span class="text-muted">{{ date }}</span> -->
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
          </div>
        </div>

        <div class="succesful" v-if="failed">
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
            <h6 class="text-center font-weight-bold text-danger">
              Your N{{ credentials.request.amount }} airtime <br />
              purchase was not successful.
            </h6>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import networks from "@/api/networks";
import ForMe from "../components/forMe.vue";
import ForOthers from "../components/forOthers.vue";
import KeyBoard from "../components/KeyBoard.vue";
export default {
  components: {
    ForMe,
    ForOthers,
    KeyBoard,
  },
  data() {
    return {
      loading: false,
      networks,
      drawer: false,
      activeName: "first",
      succesful: false,
      failed: false,
      tabItem: "1",
      selected: {
        selected: false,
        name: "Select Provider",
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
          amount: "0",
        },
      },
      responseData: {},
    };
  },

  methods: {
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
      this.credentials.request.net = value.name;
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    selectTab(value) {
      this.tabItem = value;
    },
    selectNum(value) {
      this.credentials.request.amount = value;
    },

    done(value) {
      this.credentials.auth.passcode = value;
      this.loading = true;
      axios
        .post("http://enaira.cowrie.services/airtime", this.credentials)
        .then((res) => {
          console.log(res);
          this.succesful = true;
          this.responseData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          this.failed = true;
        })
        .finally(() => [(this.loading = false)]);
    },
    handleClose() {
      (this.failed = false), (this.succesful = false);
      this.drawer = false;
    },
  },
  computed: {},
};
</script>
