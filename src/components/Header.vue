<template>

  <div class="w-full flex flex-col py-8 pb-12 justify-center">
    <img id="linksLogo" @click="goHome" class="self-center w-80 py-2 cursor-pointer" src="../assets/semdis_logo.svg">
    <div class="font-bold">A Creative Word Association Game</div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "HeaderPage",
  setup(){
    const goHome = () => {
      router.push('/')
    }
    return {
      goHome
    }
  }
}
</script>

<style scoped>

</style>