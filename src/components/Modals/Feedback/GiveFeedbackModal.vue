<template>
  <LModal class="visible " :class="{ 'hidden': !show} " show="show" @close="show = false">
    <template #title>
      Give feedback on your scores
    </template>
    <template #body>
      <ol class="list-decimal flex flex-col gap-4 ">
        <li>
          Thank you for playing the game! <strong> We would like to know your opinion about the scores you got. </strong> This will help us to improve the game in the future.
        </li>
        <li>
          For every word you wrote, you will have to click on the option that best describes your opinion, from "the score should be higher" to "the score should be lower".
        </li>
        <li>
      <div class="flex justify-center align-middle items-start  gap-2">

          <strong>
          Click on the clipboards on the right give your feedback.
          </strong>
            <svg class="w-8 h-8 text-gray-800 dark:text-white ml-auto mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h8m-1-3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1m6 0v3H6V2m6 0h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m0 9.464 2.025 1.965L12 9.571"/>
            </svg>
      </div>
        </li>
      </ol>
    </template>
    <template #button>
      <button class="primaryButton ml-auto  " @click="onNext"
      >
        Next
      </button>
    </template>
  </LModal>

</template>

<script>
import {ref} from "vue";
import LModal from "@/components/Layout/LModal.vue";

export default {
  name: "GiveFeedbackModal",
  components: {LModal},
  setup(_, {emit}) {
    let show = ref(true);

    const onNext = () => {
      emit("close")
      show.value = false
    };


    return {
      show,
      onNext,
    }
  }
}
</script>

<style scoped>

</style>