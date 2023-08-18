<template>
  <div class="flex flex-col items-center">
      <div class="relative -top-6 text-xs" v-if="practiceRound">
        <div class="flex p-2 rounded-md bg-yellow-200 gap-2 ">
          <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 21 21">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"/>
          </svg>
          Practice Round
        </div>
      </div>
    <div  class="relative -top-6 text-xs text-white " v-if="roundNumber">
      <div class="flex p-2 rounded-md bg-green-500  gap-2 ">
        <svg class="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 21 21">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"/>
        </svg>
        Round {{roundNumber}} / 5
      </div>

    </div>
    <p class="">A distant word from
    </p>

    <h2 class="text-4xl pb-8">
      {{ initialWord }}
    </h2>
    <div class="w-96 ">
      <p class="text-end pb-2">
        Total Words: {{ wordCount }} / 5</p>
    </div>
    <div class="w-96">
      <div class="flex ">
        <BaseInput v-model="userInput" class="!rounded-r-none w-full "/>
        <button @click="handleSubmitWord" :disabled="wordCount === 5"
                :class="{'disabledButton hover:bg-slate-500 hover:border-slate-500 ':wordCount === 5}"
                class="primaryButton !rounded-l-none h-fit border border-blue-500">Submit
        </button>
      </div>
      <p class="text-red-500 opacity-0 transition duration-100 " :class="{'opacity-100 ':inputError}">Please choose an
        english noun, that you did not type previously. Proper
        nouns are not allowed.</p>
    </div>

    <div v-for="(value, key, index) in userWords" :key="index" class="flex flex-col gap-4">
      <div class="w-96 pb-4">
        <Slider :score="value.score" :index="index" :word="key"/>
      </div>
    </div>

    <div class="opacity-0" :class="{
      'opacity-100 translate-y-1': wordCount === 5 && showButton}">
    Good Job, get ready for the next round
    </div>
    <button @click="nextRound" :class="{
      'opacity-100 translate-y-1': wordCount === 5 && showButton
    }"
            class="primaryButton opacity-0 transition-all duration-1000 mt-4">
      Next Round
    </button>
    <div class=" relative  bg-slate-100 my-12 px-8 p-4 rounded-md" :class="{'opacity-100':showHelp}">
      <p class="font-bold pb-3">Rules:</p>
      <svg class=" w-6 h-6 absolute right-4 top-4 text-gray-800 dark:text-white" aria-hidden="true"
           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
      <ol class="list-decimal">
        <li>
          Think of the most unrelated nouns
        </li>
        <li>Type only one word at a time</li>
        <li>
          Avoid proper nouns (e.g., no specific people or places)
        </li>
      </ol>
    </div>


  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import {computed, onMounted, ref, watch} from "vue";
import Slider from "@/components/Slider.vue";

export default {
  name: "Level1GamePlay",
  props: {
    initialWord: {
      type: String,
      default: "Bench"
    },
    practiceRound: {
      type: Boolean,
      default: false
    },
    roundNumber: {
      type: Number,
    }
  },
  components: {
    Slider,
    BaseInput
  },
  setup(props, {emit}) {
    const userWords = ref({})
    const wordCount = computed(() => Object.keys(userWords.value).length);
    const userInput = ref("");
    const inputError = ref(false);
    const showButton = ref(false);

    const nextRound = () => {
      // Submit the userWords to the database
      // Convert the data object to JSON
      const jsonData = JSON.stringify(userWords.value, null, 2); // Using null, 2 for pretty formatting
      // Lav spread operater og add det hele til den samme
      localStorage.setItem(`roundData${props.roundNumber}`, jsonData);
      userWords.value = {}
      emit('next-round')
    }
    const handleSubmitWord = async () => {
      // inputError.value = true;
      //validate noun and if error then:

      //Random number for now

      const randomScore = Math.floor(Math.random() * 100) + 1;
      const currentUserInput = userInput.value
      userInput.value = ""
      userWords.value[currentUserInput] = {score: randomScore}
    };

    watch(inputError, (newValue) => {
      if (newValue) {
        setTimeout(() => {
          inputError.value = false;
        }, 2000);
      }
    });

    watch(wordCount, (newValue) => {
      if (newValue === 5) {
        setTimeout(() => {
          showButton.value = true;
        }, 2000);
      }
    });

    onMounted(() => {
      const event = new Event("wordCountChange");
      window.dispatchEvent(event);
    });


    return {
      userInput,
      wordCount,
      handleSubmitWord,
      inputError,
      userWords,
      nextRound,
      showButton
    }
  }
}

</script>

<style scoped>

</style>