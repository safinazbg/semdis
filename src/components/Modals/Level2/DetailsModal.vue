<template>
  <LModal class="visible " :class="{ 'hidden': !show} " show="show" @close="show = false">
    <template #title>
      Details on the scoring

    </template>
    <template #body>
      <ol class="list-decimal flex flex-col gap-4 ">
        <li>
          At the intersection of each row and column, you will see the score between the two selected nouns.        </li>
        <li>
          For example, in the matrix below, the score between <strong> “pressure” </strong> and <strong>“test”</strong>  is <strong>16</strong> .
        </li>
      </ol>
      <div class="flex justify-center">
        <img src="../../../assets/matrixExample.png" alt="example" class=" w-3/4  mt-4 object-cover self-center">
      </div>
      <p>The green and red tiles respectively indicate your highest and lowest scores.</p>

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
import {ref} from "vue";
import LModal from "@/components/Layout/LModal.vue";

export default {
  name: "DetailsModal",
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