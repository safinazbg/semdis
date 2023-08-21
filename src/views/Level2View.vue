<template>
    <Header/>
  <Level2IntroductionModal v-if="introduction" @close="showRulesModal"/>
  <RulesModal v-if="rules" @close="showExampleModal" level2 />
  <DetailsModal v-if="details" @close="showLevel2Start"/>

  <Level2GamePlay
      @next-round="handleNextRound"
      :initial-word="currentRound.initialWord"
      :roundNumber="currentRound.roundNumber"/>

</template>

<script>
import Header from "@/components/Header";
import {computed, ref} from "vue";
import RulesModal from "@/components/Modals/RulesModal.vue";
import DetailsModal from "@/components/Modals/Level2/DetailsModal.vue";
import Level2IntroductionModal from "@/components/Modals/Level2/Level2IntroductionModal.vue";
import Level2GamePlay from "@/components/Level2/Level2GamePlay.vue";
import router from "@/router";

export default {
  name: "Level2View",
  components: {
    Level2GamePlay,
    Level2IntroductionModal,
    DetailsModal,
    RulesModal,
    Header,
  },
  setup(){
    const introduction = ref(true);
    const rules = ref(false);
    const details = ref(false);
    const showRulesModal = () => {
      introduction.value = false;
      rules.value = true;
    };
    const currentRoundIndex = ref(0);
    const currentRound = computed(() => rounds[currentRoundIndex.value]);

    const rounds = [
      { roundNumber: 1, initialWord: "Belt"
      },
      { roundNumber: 2, initialWord: "Tea"
      },
      { roundNumber: 3, initialWord: "Net"
      },
      { roundNumber: 4, initialWord: "Earth"
      },
      { roundNumber: 5, initialWord: "Tray"
      },
    ]

    const handleNextRound = () => {
      if (currentRoundIndex.value < 4){
        currentRoundIndex.value++;
      } else{
        router.push('/done')
      }
    };

    const showExampleModal = () => {
      rules.value = false;
      details.value = true;
    };
    const showLevel2Start = () => {
      details.value = false;

    }


    return{
      introduction,
      rules,
      details,
      showRulesModal,
      showExampleModal,
      showLevel2Start,
      handleNextRound,
      currentRound

    }
  }
}
</script>

<style scoped>

</style>