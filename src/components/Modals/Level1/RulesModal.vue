<template>
  <LModal >
    <template #title>
      Rules
    </template>
    <template #body>
      <ol class=" flex flex-col gap-4 pb-4 ">
        <li v-if="!level2">
          1. Type <strong>five nouns</strong> whose meanings are as unrelated with the word at the top as possible.
        </li>
        <li v-if="level2">
          1. Type <strong>five nouns</strong> whose meanings are as unrelated with the word at the top, <strong> and with each other</strong>, as possible.
        </li>
        <li>
          2. Be sure to type <strong> only one word at a time</strong>. Don’t make sentences or phrases.
        </li>
        <li>
          3. <strong>Avoid proper nouns</strong> (e.g., no specific people or places).
        </li>
      </ol>
       <p v-if="level2" class="pt-2" >You will play <strong>5 rounds </strong> of the game. For each round, you will see a
        word and type the five most distant nouns you can think of.</p>
      <p v-else class="pt-2">
        You will start with 1 practice round. Then, you will play 5 rounds of the game. For each round, you will see a
        word and type the five most distant nouns you can think of.
      </p>
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

export default {
  name: "RulesModal",
  components: {LModal},
  props: {
    level2:{
      type: Boolean,
      default:false
    }
  },
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