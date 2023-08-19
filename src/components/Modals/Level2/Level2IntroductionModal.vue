<template>
  <LModal class="visible " :class="{ 'hidden': !show} " show="show" @close="show = false">
    <template #title>
      Level 2 Introduction
    </template>
    <template #body>
      <ol class="list-disc flex flex-col gap-4 ">
        <li>
          For level 2, the goal is still to think of the  <strong>most unrelated nouns</strong> that you can.        </li>
        <li>
          But this time, you must type <strong> five nouns that are very distant from each other </strong>, not just the prompt word.        </li>
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
import LModal from "@/components/Layout/LModal.vue";
import {ref} from "vue";

export default {
  name: "Level2IntroductionModal",
  components: {LModal},
  setup(_,{emit}) {
    let show = ref(true);

    const onNext = () => {
      show.value=false
      emit("close")
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