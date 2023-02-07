<template>
  <div class="keyboard-container">
    <div>
      <h6>Enter Pin</h6>
      <span class="text-right d-block" @click="$emit('close')"
        ><i-icon icon="mingcute:close-fill"
      /></span>
    </div>

    <div class="code-input">
      <!-- <input v-for="i in pin" :key="i" type="text" /> -->
      <span v-for="(item, index) in pin" :key="index">{{ item }} </span>
      <!-- <span>{{ pin }}</span> -->
      <!-- <PincodeInput
        v-model="code"
        @keypress.backspace="remove()"
        placeholder="0"
      /> -->
    </div>

    <div class="keyboard">
      <span @click="enterNum('1')">1</span>
      <span @click="enterNum('2')">2</span>
      <span @click="enterNum('3')">3</span>
      <span @click="enterNum('4')">4</span>
      <span @click="enterNum('5')">5</span>
      <span @click="enterNum('6')">6</span>
      <span @click="enterNum('7')">7</span>
      <span @click="enterNum('8')">8</span>
      <span @click="enterNum('9')">9</span>
      <span @click="remove">
        <i-icon icon="fluent:backspace-24-regular" width="30px" />
      </span>
      <span @click="enterNum('0')">0</span>
      <span class="ok" @click="done">Ok</span>
    </div>

    <div class="mt-4">
      <h6>Forgot Pin?</h6>
    </div>
  </div>
</template>

<script>
// import PincodeInput from "vue-pincode-input";
// The name can be different depending on your desire
export default {
  components: {
    // PincodeInput,
  },
  data() {
    return {
      pin: new Array(4),
      code: "",
    };
  },
  methods: {
    enterNum(value) {
      //   if (this.pin.length < 4) {
      this.code = value;
      let newPin = [...this.pin];
      newPin[this.pin.findIndex((el) => el === undefined)] = value;
      this.pin = newPin;
    },
    remove() {
      let newPin = [...this.pin];
      let i = this.pin.findIndex((el) => el === undefined);
      newPin[i > 0 ? i - 1 : 3] = undefined;
      //   console.log(this.pin, newPin, i);
      this.pin = newPin;
    },
    done() {
      this.$emit("done", this.pin.join(""));
    },
  },
  //   computed: {

  //   },
};
</script>
