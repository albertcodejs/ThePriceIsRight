<script setup>
import { ref } from "vue";

let isGameStarted = ref(false);
let timeLeft = ref(30);
let isPriceFound = ref(false);
let tryNumber = ref();
let triedNumber = ref([]);
let numberToFind = 499;
let message = ref("Enter the right price here to win the game :");
let isDisabled = ref(false);

function start() {
  isGameStarted.value = true;
  const timer = setInterval(() => {
    if (timeLeft.value > 0 && isPriceFound.value === false) {
      timeLeft.value--;
    }
    if (timeLeft.value === 0) {
      message = "Game over !";
      isDisabled = true;
      clearInterval(timer);
    }
  }, 1000);
}

function addTryNumber(newNumber) {
  triedNumber.value.push(newNumber);
}

function isThePriceRight() {
  if (tryNumber.value === numberToFind) {
    message.value = "Congratulations !";
    isPriceFound = true;
    isDisabled = true;
  } else if (tryNumber.value > numberToFind) {
    message.value = "It's less !";
    addTryNumber(tryNumber.value);
    tryNumber.value = "";
  } else if (tryNumber.value < numberToFind) {
    message.value = "It's more !";
    addTryNumber(tryNumber.value);
    tryNumber.value = "";
  }
}
</script>

<template>
  <div v-if="isGameStarted === false">
    <div class="pt-20">
      <h1 class="text-7xl text-white">
        The <br />
        Price <br />
        Is <br />Right
      </h1>
      <p class="text-white pt-3">Find the right price to win the game.</p>
    </div>
    <div class="pt-40">
      <button
        type="button"
        class="text-3xl px-8 py-3 border-4 border-white rounded-full hover:border-red-500 hover:text-red-500"
        @click="start"
      >
        Press Start
      </button>
    </div>
  </div>
  <div v-else class="px-6 pt-20">
    <h1 class="text-2xl pb-4">
      How much did the first iPhone cost when it was released?
    </h1>
    <h2 class="text-xs pb-4 mx-16">
      (iPhone 2G with 4GB of storage in June 2007 and in $)
    </h2>
    <h3
      class="flex-none bg-white rounded-full px-3 py-4 w-20 m-auto text-5xl"
      :class="[timeLeft >= 10 ? 'text-black' : 'text-red-500']"
    >
      {{ timeLeft }}
    </h3>
    <p class="mt-2 mb-2">{{ message }}</p>
    <form class="flex mx-10">
      <input
        class="flex-grow ml-2 mr-2 rounded-full text-black pl-2"
        type="number"
        id="input"
        required
        v-model="tryNumber"
        placeholder="Try a number here.."
        @keydown.enter.prevent="isThePriceRight"
        :disabled="isDisabled"
      />
      <input
        type="button"
        class="flex-none"
        value="⬆️"
        @click="isThePriceRight"
      />
    </form>
    <div class="flex flex-row mt-2 mx-10">
      <p class="mr-2 line-through" v-for="item in triedNumber">{{ item }}</p>
    </div>
  </div>
</template>
