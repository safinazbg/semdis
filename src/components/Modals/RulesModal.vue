<template>
  <LModal class="visible " :class="{ 'hidden': !show} " show="show" @close="show = false">
    <template #title>
      Rules
    </template>
    <template #body>
      <ol class=" flex flex-col gap-4 pb-4 ">
        <li>
          1. Type <strong>five nouns</strong> whose meanings are as unrelated with the word at the top as possible.
        </li>
        <li>
          2. Be sure to type <strong> only one word at a time</strong>. Don’t make sentences or phrases.
        </li>
        <li>
          3. <strong>Avoid proper nouns</strong> (e.g., no specific people or places).
        </li>
      </ol>
      <p>You will start with 1 practice round. Then, you will play 5 rounds of the game. For each round, you will see a
        word and type the five most distant nouns you can think of.</p>
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
  name: "RulesModal",
  components: {LModal},
  setup(_,{emit}) {
    let show = ref(true);

    const onNext = () => {
      emit("close")
      show.value=false
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