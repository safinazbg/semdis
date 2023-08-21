<template>
  <div class="flex flex-col items-center">
    <PracticeRoundDisplay :practice-round="practiceRound"/>
    <RoundNumberDisplay :round-number="roundNumber"/>
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
        <BaseInput v-model="userInput" class="!rounded-r-none w-full "
                   @keydown.enter="handleEnterKey"
        />
        <button @click="handleSubmitWord" :disabled="wordCount === 5"
                :class="{'disabledButton hover:bg-slate-500 hover:border-slate-500 ':wordCount === 5}"
                class="primaryButton !rounded-l-none h-fit border border-blue-500">Submit
        </button>
      </div>
      <ErrorMessage :input-error="inputError"/>
    </div>

    <Sliders :user-words="userWords"/>

    <div class="opacity-0 select-none" :class="{
      'opacity-100 translate-y-1 ': wordCount === 5 && showButton}">
      <p v-if="roundNumber === 5"> Well done you finished Level 1. Go see how well you did</p>
      <p v-else>       Good Job, get ready for the next round
      </p>
    </div>
    <button @click="nextRound" :class="{
      'opacity-100 translate-y-1': wordCount === 5 && showButton
    }"
            :disabled="!showButton"
            class="primaryButton opacity-0 transition-all duration-1000 mt-4">
      <p v-if="roundNumber !== 5">Next Round</p>
      <p v-if="roundNumber === 5">See Results</p>
    </button>
    <Level1Rules/>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import {computed, onMounted, ref, watch} from "vue";
import Level1Rules from "@/components/Level1Rules.vue";
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

    const nextRound = () => {
      // Submit the userWords to the database
      // Convert the data object to JSON
      const jsonData = JSON.stringify(userWords.value, null, 2); // Using null, 2 for pretty formatting
      localStorage.setItem(`roundData${props.roundNumber}`, jsonData);
      userWords.value = {}
      emit('next-round')
    }
    const handleEnterKey= () => {
      if (wordCount.value !== 5 ) {
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
      showButton,
      handleEnterKey
    }
  }
}

</script>

