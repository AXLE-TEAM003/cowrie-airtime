<template>
  <div>
    <div class="mb-3">
      <label for="">Choose Category</label>
      <el-dropdown class="w-100" trigger="click">
        <div class="input-area el-dropdown-link">
          <span>{{ selected.name }}</span>
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
          :value="Amount"
          @change="$emit('update:Amount', $event.target.value)"
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
    <div class="mb-3">
      <label for="">Mobile Number</label>
      <div class="input-field">
        <input
          type="tel"
          maxlength="11"
          :value="PhoneNumber"
          @change="$emit('update:PhoneNumber', $event.target.value)"
        />
        <i-icon icon="ic:baseline-phone-in-talk" width="24px" color="green" />
      </div>
    </div>
  </div>
</template>

<script>
import categories from "@/api/categories";
export default {
  props: {
    Amount: Number,
    PhoneNumber: String,
  },
  components: {},
  data() {
    return {
      categories,
      drawer: false,
      activeName: "first",
      tabItem: "1",
      selected: {
        selected: false,
        name: "Choose Category",
        icon: null,
      },
      initialNum: 0,
      max: 10,
    };
  },

  methods: {
    getCategory(value) {
      this.selected = value;
      this.selected.selected = true;
    },
    handleChange(value) {
      //   if (value === "decrease") {
      //     if (this.initialNum > 0) {
      //       this.initialNum--;
      //     } else {
      //       return this.initialNum;
      //     }
      //   } else {
      //     this.initialNum++;
      //   }
      this.$emit("handleChange", value);
    },
    selectAmount(value) {
      this.$emit("selectNum", value);
    },
  },
  computed: {
    num() {
      return "₦" + Number(this.initialNum).toFixed(2);
    },
  },
};
</script>
