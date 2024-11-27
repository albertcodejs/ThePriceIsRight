<script setup>
import { ref } from "vue";

let isGameStarted = ref(false);
let timeLeft = ref(30);
let isPriceFound = ref(false);
let tryNumber = ref();
let numberToFind = 499;
let message = ref("Entrez un prix pour commencer à jouer :");
let isDisabled = ref(false);

function start() {
  isGameStarted.value = true;
  const timer = setInterval(() => {
    if (timeLeft.value > 0 && isPriceFound.value === false) {
      timeLeft.value--;
    }
    if (timeLeft.value === 0) {
      isDisabled = true;
      clearInterval(timer);
    }
  }, 1000)
}

function isThePriceRight() {
  if (tryNumber.value === numberToFind) {
    message.value = "Félicitations !";
    isPriceFound = true;
    isDisabled = true;
  } else if (tryNumber.value > numberToFind) {
    message.value = "C'est moins !";
  } else if (tryNumber.value < numberToFind) {
    message.value = "C'est plus !";
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
      Quel était le prix du premier iPhone à sa sortie ?
    </h1>
    <h2 class="text-xs pb-4 mx-16">
      (iPhone 2G avec 4Go de stockage en juin 2007 et en $)
    </h2>
    <p class="mb-2">{{ message }}</p>
    <form class="flex mx-10">
      <label
        class="flex-none bg-white rounded-full px-3 py-1"
        :class="[timeLeft >= 10 ? 'text-black' : 'text-red-500']"
      >
        {{ timeLeft }}
      </label>
      <input
        class="flex-grow ml-2 mr-2 rounded-full text-black pl-2"
        type="number"
        id="input"
        required
        v-model="tryNumber"
        placeholder="Essayez un nombre.."
        @keydown.enter.prevent="isThePriceRight"
        :disabled="isDisabled"
      />
      <input class="flex-none" type="submit" value="⬆️"></input> 
    </form>
  </div>
</template>
