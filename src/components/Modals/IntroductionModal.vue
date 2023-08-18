<template>
  <LModal class="visible " :class="{ 'hidden': !show} " show="show" @close="show = false">
    <template #title>
      LINKS is a creative word association game.
    </template>
    <template #body>
      <ol class="list-disc flex flex-col gap-4 ">
        <li>
          The goal is to think of the most unrelated nouns you can think of.
        </li>
        <li>
          You will see a word and type five nouns that are very distant from it.
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
import LModal from "@/components/Layout/LModal.vue";
import {ref} from "vue";

export default {
  name: "IntroductionModal",
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