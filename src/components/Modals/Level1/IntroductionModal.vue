<template>
  <LModal class="">
    <template #title>
      LINKS is a creative word association game.
    </template>
    <template #body>
      <ol class="list-disc flex flex-col gap-4 ">
        <li>
          The goal is to think of the most unrelated nouns you can think of.
        </li>
        <li>
          You will see a word and you will have to type 7 nouns that are very distant from that word, but also from each other as possible.
        </li>
      </ol>

    </template>
    <template #button>
      <button class="primaryButton ml-auto" @click="onNext"
      >
        Next
      </button>
    </template>
  </LModal>
</template>

<script>
import LModal from "@/components/Layout/LModal.vue";

export default {
  name: "IntroductionModal",
  components: {LModal},
  setup(_,{emit}) {

    const onNext = () => {
      emit("close")
    };

    return {
      onNext,
    }
  }
}
</script>

<style scoped>

</style>