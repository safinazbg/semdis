<template>
  <Header/>
  <div class="flex flex-col items-center">
    <RoundNumberDisplay :round-number="roundNumber"/>

    <h2 class="text-4xl pb-8">
      Round {{ roundNumber }}:
      {{ initialWord }}
    </h2>
    <div v-for="(value, key, index) in userWordsFromStorage" :key="index" class="flex flex-col gap-4">
      <div class="flex gap-2 pb-4 h-fit items-end ">
        <div class="k1:w-96 w-72  ">
          <div class=" flex w-full">
            <div class="">{{ initialWord }} - {{ key }}</div>
            <div class="value ml-auto">{{ value.score }} / 100</div>
          </div>
          <div class="w-full rounded-md h-6 w-full bg-slate-200">
            <div class="h-full rounded-md" :style="fillStyle(value.score)"></div>
          </div>
        </div>
        <div class="rounded-xl bg-slate-100 p-2 border-2 relative cursor-pointer " @click="toggleTooltip(index)"
             :class="getBorderColorClass(value.feedback)">
          <svg class="w-6 h-6 text-gray-300 " :class="getTextColorClass(value.feedback)" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 5h8m-1-3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1m6 0v3H6V2m6 0h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m0 9.464 2.025 1.965L12 9.571"/>
          </svg>
          <div v-if="tooltipVisible === index"
               class="w-56 rounded-xl border-2 absolute transform  -translate-y-1/2  top-1/2 k1:translate-x-0 k1:left-12   -translate-x-full -left-2 "
          >
            <div class="w-3 h-3 transform rotate-45 bg-slate-300 absolute transform   -translate-y-1/2 k1:-translate-x-2 k1:left-0  top-1/2 translate-x-full  right-1"></div>
            <div class=" p-2 rounded-t-lg border-b bg-slate-200">
              <h1>I Think the score should be</h1>
            </div>
            <div class="flex flex-col gap-1 p-2 bg-white rounded-b-xl">
              <button @click="addFeedback(key,1 )" :class=" {'!bg-red-600 hover:!bg-red-600 border-black border-2' : value.feedback === 1}" class="primaryButton !bg-red-500 hover:!bg-red-600 w-full">A lot
                Lower
              </button>
              <button @click="addFeedback(key,2 )" :class=" {'!bg-yellow-600 hover:!bg-yellow-600 border-black border-2' : value.feedback === 2}" class="primaryButton !bg-yellow-500 hover:!bg-yellow-600 w-full">
                Somewhat Lower
              </button>
              <button @click="addFeedback(key,3 )" :class=" {'!bg-gray-600 hover:!bg-gray-600 border-black border-2' : value.feedback === 3}" class="primaryButton !bg-gray-500 hover:!bg-gray-600 w-full">About
                what it was
              </button>
              <button @click="addFeedback(key,4 )" :class=" {'!bg-blue-600 hover:!bg-blue-600 border-black border-2' : value.feedback === 4}" class="primaryButton w-full">Somewhat Higher</button>
              <button @click="addFeedback(key,5 )" :class=" {'!bg-green-600 hover:!bg-green-600 border-black border-2' : value.feedback === 5}" class="primaryButton !bg-green-500 hover:!bg-green-600 w-full">A lot
                Higher
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>


    <h1 v-if="allFeedbackProvided" class="m-2 select-none">

      Thank you for the feedback
    </h1>
    <h1 v-if="!allFeedbackProvided" class="m-2 select-none">
      Please give feedback to all 5
    </h1>
    <button @click="nextRound" :class="{
      'disabledButton': !allFeedbackProvided,
      'primaryButton': allFeedbackProvided
    }"
            :disabled="!allFeedbackProvided"
            class=" transition-all duration-1000 ">
      <p v-if="roundNumber !== 5">Evaluate Round {{ roundNumber + 1 }}</p>
      <p v-if="roundNumber === 5">Start Level 2</p>
    </button>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import RoundNumberDisplay from "@/components/RoundNumberDisplay.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";

export default {
  name: "Level1Feedback",
  components: {
    RoundNumberDisplay,
    Header,
  },
  props: {
    roundNumber: {
      type: Number,
    },
    initialWord: {
      type: String,
      default: "Bench"
    },
  },
  setup(props,{emit}) {
    const tooltipVisible = ref(null);
    const allFeedbackProvided = ref(false);
    const userWordsFromStorage = ref(
        JSON.parse(localStorage.getItem(`roundData${props.roundNumber}`)) || {}
    );

    watch(
        () => props.roundNumber,
        (newRoundNumber) => {
          userWordsFromStorage.value =
              JSON.parse(localStorage.getItem(`roundData${newRoundNumber}`)) || {};
        }
    );

    const addFeedback = (keyToAddFeedback, feedbackType) => {
      const newValue = {...userWordsFromStorage.value[keyToAddFeedback], feedback: feedbackType};
      userWordsFromStorage.value[keyToAddFeedback] = newValue;
      allFeedbackProvided.value = true;
      
      //Makes button clickable when all feedback has been given
      for (const value of Object.values(userWordsFromStorage.value)) {
        if (value.feedback === undefined) {
          allFeedbackProvided.value = false;
          break;
        }
      }
    }
    const getTextColorClass = (feedbackValue) => {
      switch (feedbackValue) {
        case 1:
          return '!text-red-500';
        case 2:
          return '!text-yellow-500';
        case 3:
          return '!text-gray-500';
        case 4:
          return '!text-blue-500';
        case 5:
          return '!text-green-500';
        default:
          return '';
      }
    }
    const getBorderColorClass = (feedbackValue) => {
      switch (feedbackValue) {
        case 1:
          return 'border-red-500';
        case 2:
          return 'border-yellow-500';
        case 3:
          return 'border-gray-500';
        case 4:
          return 'border-blue-500';
        case 5:
          return 'border-green-500';
        default:
          return '';
      }
    }
    const toggleTooltip = (index) => {
      if (tooltipVisible.value === index) {
        tooltipVisible.value = null;
      } else {
        tooltipVisible.value = index;
      }
    };
    const handleGlobalClick = (event) => {
      if (!event.target.closest('.rounded-xl')) {
        tooltipVisible.value = null;
      }
    };


    const fillStyle = (score) => {
      let fillColor = "rgba(34, 197, 94, 1)"; // Default to green (bg-green-500)

      if (score >= 0 && score <= 33) {
        fillColor = "rgba(239, 68, 68, 1)"; // Equivalent to bg-red-500
      } else if (score > 33 && score <= 66) {
        fillColor = "rgba(234, 179, 8, 1)"; // Equivalent to bg-yellow-500
      }
      return `width: ${score}%; background-color: ${fillColor}; transition: width 1s ease-in-out;`;
    }

    onMounted(() => {
      window.addEventListener('click', handleGlobalClick);
    });

    onUnmounted(() => {
      window.removeEventListener('click', handleGlobalClick);
    });


    const nextRound = () => {
      // Submit the userWordsFromStorage to the database
      // Convert the data object to JSON
      const jsonData = JSON.stringify(userWordsFromStorage.value, null, 2); // Using null, 2 for pretty formatting
      localStorage.setItem(`roundData${props.roundNumber}`, jsonData);
      allFeedbackProvided.value = false;
      emit('next-round')
    }

    return {
      userWordsFromStorage,
      nextRound,
      allFeedbackProvided,
      tooltipVisible,
      toggleTooltip,
      addFeedback,
      getTextColorClass,
      getBorderColorClass,
      fillStyle,
    }
  }
}
</script>

<style scoped>

</style>