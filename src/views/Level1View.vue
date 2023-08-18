<template>
  <div >
    <Header/>
    <!--Info modals-->
    <IntroductionModal v-if="introduction" @close="showRulesModal"/>
    <RulesModal v-if="rules" @close="showExampleModal"/>
    <ExampleModal v-if="example" @close="showTrainingRoundModal"/>

    <Level1GamePlay v-if="Level1GamePlayTraining" @next-round="handleStartGame" initial-word="Bench" practice-round/>
    <Level1GamePlay
        v-if="Level1GamePlayReal"
        @next-round="handleNextRound"
        :initial-word="currentRound.initialWord"
        :roundNumber="currentRound.roundNumber"
    />
    <Level1Results v-if="Level1Results"/>

  </div>
</template>

<script>
import Header from "@/components/Header";
import {computed, ref} from "vue";
import IntroductionModal from "@/components/Modals/IntroductionModal.vue";
import RulesModal from "@/components/Modals/RulesModal.vue";
import ExampleModal from "@/components/Modals/ExampleModal.vue";
import Level1GamePlay from "@/components/Level1GamePlay.vue";
import Level1Results from "@/components/Level1Results.vue";

export default {
  name: 'Level1View',
  components: {
    Level1Results,
    Level1GamePlay,
    ExampleModal,
    RulesModal,
    IntroductionModal,
    Header,
  },
  setup() {

    const introduction = ref(true);
    const rules = ref(false);
    const example = ref(false);
    const Level1GamePlayTraining = ref(false);
    const Level1GamePlayReal = ref(false);
    const Level1Results = ref(false);
    const currentRoundIndex = ref(0);
    const currentRound = computed(() => rounds[currentRoundIndex.value]);


    const handleNextRound = () => {
      if (currentRoundIndex.value < 4){
      currentRoundIndex.value++;
      } else{
        Level1GamePlayReal.value = false
        Level1Results.value = true
      }
    };

    const rounds = [
      { roundNumber: 1, initialWord: "Train"
      },
      { roundNumber: 2, initialWord: "Steam"
      },
      { roundNumber: 3, initialWord: "Page"
      },
      { roundNumber: 4, initialWord: "Sink"
      },
      { roundNumber: 5, initialWord: "Fence"
      },
    ]


    const showRulesModal = () => {
      introduction.value = false;
      rules.value = true;
    };

    const showExampleModal = () => {
      rules.value = false;
      example.value = true;
    };

    const showTrainingRoundModal = () => {
      example.value = false;
      Level1GamePlayTraining.value = true;
    };

    const handleStartGame = () => {
      Level1GamePlayTraining.value = false
      Level1GamePlayReal.value = true
    }

    return {
      introduction,
      rules,
      example,
      handleStartGame,
      showExampleModal,
      showRulesModal,
      showTrainingRoundModal,
      Level1GamePlayTraining,
      handleNextRound,
      Level1GamePlayReal,
      currentRound,
      Level1Results
    }
  }
}
</script>
