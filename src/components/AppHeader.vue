<template>
  <div class="container py-3">
    <div class="app-header d-flex align-items-center justify-content-between">
      <div class="w-100">
        <span class="font-weight-bold">Buy Airtime and Data</span>
      </div>
      <div
        class="d-flex align-items-center justify-content-end"
        style="gap: 10px"
      >
        <img width="40%" src="@/assets/img/e-Naira-logo.png" alt="" />
        <span role="button" @click="drawer = true">
          <i-icon icon="ic:outline-menu" width="30px" />
        </span>
      </div>
    </div>

    <!-- Drawer Menu  -->
    <el-drawer size="80%" :visible.sync="drawer" :direction="direction">
      <div class="py-3 px-4">
        <ul class="mb-0 d-flex flex-column" style="gap: 20px">
          <li role="button" @click="drawer = !drawer">
            <span> <i-icon icon="eva:home-outline" /></span>
            <span>Buy airtime & data</span>
          </li>
          <li role="button" @click="support = !support">
            <span> <i-icon icon="bx:support" /> </span> <span>Support</span>
          </li>
          <li role="button" @click="faq = !faq">
            <span> <i-icon icon="octicon:question-24" /> </span>
            <span>FAQs</span>
          </li>
        </ul>
      </div>
    </el-drawer>

    <!-- Support -->
    <div class="support">
      <el-drawer
        id="support"
        size="100%"
        :visible.sync="support"
        title="Support"
        :direction="direction"
      >
        <div class="py-3 px-4">
          <support-page />
        </div>
      </el-drawer>
    </div>

    <!-- FAQ -->
    <div class="faq">
      <el-drawer
        id="faq"
        size="100%"
        :visible.sync="faq"
        title="FAQs"
        :direction="direction"
      >
        <div class="py-3 px-4">
          <faq-s />
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import FaqS from "./static/faqS.vue";
import supportPage from "./static/supportPage.vue";
export default {
  components: { supportPage, FaqS },
  data: () => {
    return {
      drawer: false,
      support: false,
      faq: false,
    };
  },
};
</script>

<style>
ul li {
  display: flex;
  align-items: center;
  gap: 12px;
}

ul li span:first-child {
  color: var(--primary-color);
}

.support header#el-drawer__title.el-drawer__header,
.faq .el-drawer__header {
  flex-direction: row-reverse;
  color: #000;
  gap: 20px;
}
</style>
