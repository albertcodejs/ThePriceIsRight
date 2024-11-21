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
    <button type="button" class="" @click="start">Press Start !</button>
  </div>
  <div v-else>
    <h1 class="text-3xl">Le prix du premier iPhone à sa sortie ?</h1>
    <h2>
      Combien coûtait l'iPhone 2G (4Gb de stockage) à sa sortie (juin 2007) en
      dollars US ?
    </h2>
    <div class="flex">
      <div>
        <img src="/public/iphone2G.png" alt="iPhone 2G" />
      </div>
      <div>
        <h3
          class="text-7xl"
          :class="[timeLeft >= 10 ? 'text-black' : 'text-red-500']"
          v-if="timeLeft > 0"
        >
          {{ timeLeft }}
        </h3>
        <h3 class="text-7xl text-red-500" v-else>Temps écoulé</h3>
        <form>
          <input
            type="number"
            id="input"
            required
            v-model="tryNumber"
            @keydown.enter.prevent="isThePriceRight"
          />
          <input type="submit" class="hidden" />
        </form>
      </div>
    </div>
  </div>
</template>
