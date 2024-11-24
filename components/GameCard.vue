<script setup>
import { ref } from "vue";

let isGameStarted = ref(false);
let timeLeft = ref(30);
let isPriceFound = ref(false);
let tryNumber = ref();
let numberToFind = 499;

function start() {
  isGameStarted.value = true;
  startTimer();
}

function startTimer() {
  setInterval(() => {
    if (timeLeft.value > 0 && isPriceFound.value === false) {
      timeLeft.value--;
    }
  }, 1000);
}

function isThePriceRight() {
  if (tryNumber.value === numberToFind) {
    console.log("Félicitations");
    isPriceFound = true;
  } else if (tryNumber.value > numberToFind) {
    console.log("C'est moins !");
  } else if (tryNumber.value < numberToFind) {
    console.log("C'est plus !");
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
      <p class="text-white pt-3">Trouver le bon prix pour gagner la partie</p>
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
    <h2 class="text-xs pb-4">
      L'iPhone 2G (avec 4Go de stockage) en juin 2007 en $ ?
    </h2>
    <div class="flex flex-col">
      <div>
        <img src="/public/iphone2G.png" alt="iPhone 2G" class="w-1/2 m-auto" />
      </div>
      <div>
        <h3
          class="text-4xl"
          :class="[timeLeft >= 10 ? 'text-black' : 'text-red-500']"
          v-if="timeLeft > 0"
        >
          {{ timeLeft }}
        </h3>
        <h3 class="text-4xl pb-3 text-red-500" v-else>Temps écoulé</h3>
        <form>
          <input
            type="number"
            id="input"
            required
            v-model="tryNumber"
            class="text-black bg-gray-300 mb-5"
            @keydown.enter.prevent="isThePriceRight"
          />
          <input type="submit" class="hidden" />
        </form>
      </div>
    </div>
  </div>
</template>
