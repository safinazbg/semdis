<template>
  <div class="flex flex-col items-center">
    <RoundNumberDisplay :round-number="roundNumber"/>
    <p class="">A distant word from
    </p>
    <div class=" w-96 text-center">
<!--      <h2 class="text-2xl pb-3 ">
        {{ initialWord }}
      </h2>-->
      <h2 class="text-2xl pb-3" v-for="(word, index) in userWords" :key="index">
        {{ word }}
      </h2>
    </div>

    <div class="k1:w-96 w-80 ">
      <p class="text-end pb-2">
        Total Words: {{ wordCount -1 }} / 5</p>
    </div>
    <div class="k1:w-96 w-80">
      <div class="flex ">
        <BaseInput v-model="userInput" class="!rounded-r-none w-full "
                   @keydown.enter="handleEnterKey"

        />
        <button @click="handleSubmitWord" :disabled="wordCount === 6"
                :class="{'disabledButton hover:bg-slate-500 hover:border-slate-500 ':wordCount === 6}"
                class="primaryButton !rounded-l-none h-fit border border-blue-500">Submit
        </button>
      </div>
      <ErrorMessage :input-error="inputError"/>
    </div>
    <div class="opacity-0 select-none transition-all duration-200" :class="{
      'opacity-100 translate-y-1 ': wordCount === 6 && showButton}">
      <p v-if="roundNumber === 5"> Well done you finished the game. Thank you for playing</p>
      <p v-else> Good Job, get ready for the next round</p>
    </div>
    <button @click="nextRound" :class="{
      'opacity-100 translate-y-1': wordCount === 6 && showButton
    }"
            :disabled="!showButton"
            class="primaryButton opacity-0 transition-all duration-500 mt-4">
      <p v-if="roundNumber === 5">See Results</p>
      <p v-else>Next Round</p>
    </button>
    <div :class="{
      'opacity-100 translate-y-1 pt-4': wordCount === 6 && showButton
    }" class="opacity-0 text-xl font-bold " >
      <p>Your global score is {{ matrixAverageValue }}/100</p>
    </div>
    <div class="k1:w-[500px] w-80  my-4">
      <div class="w-full px-2 pt-2 text-center pb-8 bg-slate-200 ">
      <p class="font-bold text-md py-4 ">Score matrix of the distances between words</p>
        <table class="mx-auto">
          <tbody>
          <tr v-for="(word, rowIndex) in userWords" :key="rowIndex" class="text-center k1:text-xs text-[10px]">
            <td>{{ word }}</td>
            <td
                v-for="(comparisonWord, colIndex) in userWords"
                :key="colIndex"
                class=" border k1:w-12 k1:h-12 w-10 h-10"
                :style="{
              backgroundColor: getColor(getMatrixValue(rowIndex, colIndex))
                }"
            >
              <p v-if="getMatrixValue(rowIndex, colIndex) !== '-1' ">
                {{ getMatrixValue(rowIndex, colIndex) }}
              </p>
            </td>
          </tr>
          </tbody>
          <tr>
            <th></th>
            <th v-for="(word, colIndex) in userWords" :key="colIndex" class="k1:text-xs text-[10px] font-normal transform -rotate-45 relative top-2 right-2 pt-2">{{ word }}</th>
          </tr>
        </table>
      </div>
      <p class="">The green and red tiles respectively indicate your highest and lowest score</p>

    </div>
    <div class="k1:w-96 w-80">
      <Level1Rules/>
    </div>

  </div>
</template>

<script>
import ErrorMessage from "@/components/ErrorMessage.vue";
import {computed, onMounted, ref, watch} from "vue";
import BaseInput from "@/components/BaseInput.vue";
import Level1Rules from "@/components/Level1/Level1Rules.vue";
import RoundNumberDisplay from "@/components/RoundNumberDisplay.vue";

export default {
  name: "Level2GamePlay",
  components: {RoundNumberDisplay, Level1Rules, ErrorMessage, BaseInput},
  props: {
    initialWord: {
      type: String,
      default: ""
    },
    roundNumber: {
      type: Number,
    }

  },
  setup(props, {emit}) {
    const inputError = ref(false);
    const userWords = ref([props.initialWord])
    const wordCount = computed(() => Object.keys(userWords.value).length);
    const showButton = ref(false);
    const userInput = ref("");
    const matrixData = ref([]);
    const matrixAverageValue = ref(0);

    watch(userWords, (newUserWords) => {
      matrixData.value = generateMatrixData(newUserWords);
    });
    watch(() => props.initialWord, (newInitialWord) => {
      // Update the userWords array with the new initialWord
      userWords.value = [newInitialWord];
    });
    const getMatrixValue = (row, col) => {
      if (row > col) {
        return matrixData.value[row][col];
      } else {
        return "-1";
      }
    };

    watch(userWords, () => {
      matrixAverageValue.value = calculateMatrixAverage();
    });
    const calculateMatrixAverage = () => {
      let sum = 0;
      let totalValues = 0;

      for (let row = 0; row < matrixData.value.length; row++) {
        for (let col = 0; col < matrixData.value[row].length; col++) {
          const value = matrixData.value[row][col];
          if (value !== "") {
            sum += value;
            totalValues++;
          }
        }
      }

      if (totalValues === 0) {
        return 0; // Avoid division by zero
      }
      const average = sum / totalValues;

      const roundedAverage = Math.round(average);

      return  roundedAverage;
    };

    const handleEnterKey = () => {
      if (wordCount.value !== 6) {
        handleSubmitWord();
      }
    }
    const getColor = (value) => {
      if (value === "-1" ) return "rgb(255,255,255)"
      const red = 255 * (1 - value / 100);
      const green = 255 * (value / 100);
      return `rgb(${red}, ${green}, 0)`;
    };
    const nextRound = () => {
      // Submit the userWords to the database with values
      userWords.value = [props.initialWord]
      emit('next-round')
    }
    const handleSubmitWord = () => {
      // inputError.value = true;
      //validate noun and if error then:
      if (userInput.value !== "") {
        const currentUserInput = userInput.value
        userWords.value = [...userWords.value, currentUserInput]; // Update using the ref's .value property
        userInput.value = ""
      }
    };
    watch(inputError, (newValue) => {
      if (newValue) {
        setTimeout(() => {
          inputError.value = false;
        }, 2000);
      }
    });

    watch(wordCount, (newValue) => {
      if (newValue === 6) {
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
      inputError,
      handleSubmitWord,
      showButton,
      userInput,
      wordCount,
      userWords,
      nextRound,
      handleEnterKey,
      getColor,
      getMatrixValue,
      calculateMatrixAverage,
      matrixAverageValue
    }
  }
}
function generateMatrixData(words) {
  const matrix = Array.from({ length: words.length }, () =>
      Array.from({ length: words.length }, () => getRandomNumber())
  );
  return matrix;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 101);
}
</script>

<style scoped>

</style>