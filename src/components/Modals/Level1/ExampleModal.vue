<template>
  <LModal >
    <template #title>
      Examples
    </template>
    <template #body>
      <ol class="list-decimal flex flex-col gap-4 ">
        <li>
          If the prompt word is "car", then "bike" would not give a high score, because both are means of
          transportation, thus closely related.
        </li>
        <li>
          If the prompt word is "start", then "end" would not give a high score. They could seem distant, but they are
          in fact opposite, which means related.
        </li>
      </ol>
      <div class="flex justify-center">
        <img src="../../../assets/rules.gif" alt="rules" class=" w-full h-56 mt-4 object-cover self-center">
      </div>

    </template>
    <template #button>
      <button class="primaryButton ml-auto  " @click="onNext"
      >
        Start Playing
      </button>
    </template>
  </LModal>
</template>

<script>
import LModal from "@/components/Layout/LModal.vue";

export default {
  name: "ExampleModal",
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