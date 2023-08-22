<template>
  <div
      class="bg-black bg-opacity-40 z-50 fixed inset-0 transition-all duration-200 w-full h-full justify-center items-center flex"
        >
    <div
        @click.stop
        class="bg-white rounded-lg p-4 flex flex-col gap-2 m-2 w-[500px]  h-fit shadow-2xl transition-all duration-200 "
    >
<!--      <div class="w-full text-right">
        <button @click="closeModal" class="text-xl p-2">x</button>
      </div>-->
      <div class="flex flex-col gap-8">

        <div class="text-center heading1 pt-6">
          <slot name="title"></slot>
        </div>
        <div class="px-8 text-left">
          <slot name="body"></slot>
        </div>

        <div class="flex justify-center text-xl font-custom pb-4 pr-4">
          <slot name="button"></slot>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "LModal",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const closeModal = () => emit("close");
    return {
      closeModal,
    };
  }
}
</script>

<style scoped>

</style>