<template>
  <div
      @click="closeModal"
      class="bg-opacity-50 z-50 fixed inset-0 bg-white transition-all duration-200 w-full h-full justify-center items-center flex"
      :class="{
      'hidden': !isOpen
    }"
  >
    <div
        @click.stop
        class="bg-white rounded-lg p-4 flex flex-col gap-2 w-96 h-fit shadow-2xl transition-all duration-200 translate-x-0"
        :class="{ 'translate-x-5': !isOpen }"
    >
      <div class="w-full text-right">
        <button @click="closeModal" class="text-xl p-2">x</button>
      </div>
      <div class="text-md ">
        <h1>{{ modalText }}</h1>
      </div>
      <div class="flex flex-row justify-evenly">

        <button
            @click="continueAction"
            class="primaryButton"
        >
          {{ modalAction }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalComponent",
  props: {
    isOpen: Boolean,
    close: Function,
    continueAction: Function,
    modalText: String,
    modalAction: String,
  },
  setup(){

  const closeModal = (e) => {
    e.preventDefault();
    close(false);
  };

  return {
    closeModal
  }
}
};
</script>

<style scoped>
</style>
