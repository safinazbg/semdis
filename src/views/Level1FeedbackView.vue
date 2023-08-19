<template>
  <div>
    <Header/>
    <!--Info modals-->
    <GiveFeedbackModal v-if="feedback" @close="closeFeedback"/>

    <Level1Feedback
        @next-round="handleNextRound"
        :initial-word="currentRound.initialWord"
        :roundNumber="currentRound.roundNumber"
    />

  </div>
</template>

<script>
import router from "@/router";
import GiveFeedbackModal from "@/components/Modals/Feedback/GiveFeedbackModal.vue";
import {computed, ref} from "vue";
import Level1Feedback from "@/components/Level1Feedback.vue";

export default {
  name: "Level1FeedbackView",
  components: {Level1Feedback, GiveFeedbackModal},
  setup() {
    const feedback = ref(true);

    const currentRoundIndex = ref(0);
    const currentRound = computed(() => rounds[currentRoundIndex.value]);


    const handleNextRound = () => {
      if (currentRoundIndex.value < 4) {
        currentRoundIndex.value++;
      } else {
        router.push('/level2')
      }
    };

    const rounds = [
      {
        roundNumber: 1, initialWord: "Train"
      },
      {
        roundNumber: 2, initialWord: "Steam"
      },
      {
        roundNumber: 3, initialWord: "Page"
      },
      {
        roundNumber: 4, initialWord: "Sink"
      },
      {
        roundNumber: 5, initialWord: "Fence"
      },
    ]


    const closeFeedback = () => {
      feedback.value = false;
    };



    return {
      feedback,
      currentRound,
      closeFeedback,
      handleNextRound,
    }
  }
}
</script>

<style scoped>

</style>