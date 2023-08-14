<template>
  <div class="">
    <Header></Header>
    <button @click="openModal()" class="primaryButton"> Open modal</button>
    <Modal :isOpen="modalOpen" :close="closeModal" :continueAction="handleContinueAction"
           :modalText="modalText"
           :modalAction="modalAction" />

  </div>
</template>

<script>
import Modal from "@/components/Modal.vue"; // Adjust the path
import Header from "@/components/Header";
import {ref} from "vue";

export default {
  name: 'Level1View',
  components: {
    Header,
    Modal
  },
  setup() {
    let modalOpen = ref(false)
    const modalText = "LINKS is a creative word association game.\n" +
        "\n" +
        "The goal is to think of the most unrelated nouns you can think of.\n" +

        "You will see a word and type five nouns that are very distant from it."
    const modalAction = "Next"

    function openModal() {
      modalOpen.value = true;
    }

    function closeModal() {
      modalOpen.value = false;
    }

    function handleContinueAction() {
      console.log("Continue action clicked");
    }

    return {
      openModal,
      closeModal,
      handleContinueAction,
      modalOpen,
      modalText,
      modalAction,
    }
  }
}
</script>
