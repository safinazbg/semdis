<template>
  <div class="flex items-center flex-col">
  <div class="flex flex-col items-center k1:w-96 w-80 relative">
    <PracticeRoundDisplay :practice-round="practiceRound"/>
    <RoundNumberDisplay :round-number="roundNumber"/>
    <p class="">A distant word from</p>

    <h2 class="text-4xl pb-8">
      {{ initialWord }}
    </h2>
    <div class=" ">
      <p class="text-end pb-2">
        Total Words: {{ wordCount }} / {{ totalWords }}</p>
    </div>
    <div class=" ">
      <div class="flex ">
        <BaseInput v-model="userInput" class="!rounded-r-none w-full "
                   @keydown.enter="handleEnterKey"
        />
        <button @click="handleSubmitWord" :disabled="wordCount === totalWords"
                :class="{'disabledButton hover:bg-slate-500 hover:border-slate-500 ':wordCount === totalWords}"
                class="primaryButton !rounded-l-none h-fit border border-blue-500">Submit
        </button>
      </div>
      <ErrorMessage :input-error="inputError"/>
    </div>

    <Sliders :user-words="userWords"/>

    <div class="opacity-0 select-none transition-all duration-200" :class="{
      'opacity-100 translate-y-1 ': wordCount === totalWords && showButton}">
      <p v-if="roundNumber === totalWords"> Well done you finished Level 1. Go see how well you did</p>
      <p v-else>Good Job, get ready for the next round</p>
    </div>
    <button @click="nextRound"  class="primaryButton opacity-0 transition-all duration-500 my-2 mb-6"
      :class="{
      'opacity-100 translate-y-1': wordCount === totalWords && showButton
    }"
            :disabled="!showButton"
    >
      <p v-if="roundNumber === totalRounds">See Results</p>
      <p v-else>Next Round</p>
    </button>
    <div class="k1:absolute -right-12 -top-12 w-80  k1:translate-x-full">
      <Level1Rules/>
    </div>
  </div>
  </div>

</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import {computed, onMounted, ref, watch} from "vue";
import Level1Rules from "@/components/Level1/Level1Rules.vue";
import Sliders from "@/components/Sliders.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import RoundNumberDisplay from "@/components/RoundNumberDisplay.vue";
import PracticeRoundDisplay from "@/components/PracticeRoundDisplay.vue";

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
    PracticeRoundDisplay,
    RoundNumberDisplay,
    ErrorMessage,
    Sliders,
    Level1Rules,
    BaseInput
  },
  setup(props, {emit}) {
    const userWords = ref({})
    const wordCount = computed(() => Object.keys(userWords.value).length);
    const userInput = ref("");
    const inputError = ref(false);
    const showButton = ref(false);
    const totalWords = 7
    const totalRounds = 5

    const nextRound = () => {
      // Submit the userWords to the database
      // Convert the data object to JSON
      const jsonData = JSON.stringify(userWords.value, null, 2); // Using null, 2 for pretty formatting
      localStorage.setItem(`roundData${props.roundNumber}`, jsonData);
      userWords.value = {}
      emit('next-round')
    }
    const handleEnterKey= () => {
      if (wordCount.value !== totalWords ) {
        handleSubmitWord();
      }
    }
    const handleSubmitWord = async () => {
      // inputError.value = true;
      //validate noun and if error then:

      if (userInput.value !== ""){
      const randomScore = Math.floor(Math.random() * 100) + 1;
      const currentUserInput = userInput.value
      userInput.value = ""
      userWords.value[currentUserInput] = {score: randomScore}
      }
      //Random number for now
    };

    watch(inputError, (newValue) => {
      if (newValue) {
        setTimeout(() => {
          inputError.value = false;
        }, 2000);
      }
    });

    watch(wordCount, (newValue) => {
      if (newValue === totalWords) {
        setTimeout(() => {
          showButton.value = true;
        }, 300);
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
      showButton,
      handleEnterKey,
      totalWords,
      totalRounds
    }
  }
}

</script>

