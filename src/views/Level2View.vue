<template>
    <Header/>
  <IntroductionModal v-if="introduction" @close="showRulesModal"/>
  <RulesModal v-if="rules" @close="showExampleModal" level2 />
  <DetailsModal v-if="details" @close="showLevel2Start"/>

  level 2 coming soon
</template>

<script>
import Header from "@/components/Header";
import IntroductionModal from "@/components/Modals/IntroductionModal.vue";
import {ref} from "vue";
import RulesModal from "@/components/Modals/RulesModal.vue";
import DetailsModal from "@/components/Modals/Level2/DetailsModal.vue";

export default {
  name: "Level2View",
  components: {
    DetailsModal,
    RulesModal,
    IntroductionModal,
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
      showLevel2Start

    }
  }
}
</script>

<style scoped>

</style>