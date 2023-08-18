<template>

  <div class="w-full bg-slate-100 flex flex-col py-4 mb-12 text-center justify-center">
    <img id="linksLogo" @click="goHome" class="self-center w-56 py-2 cursor-pointer" src="../assets/semdis_logo.svg">
    <div class="">A Creative Word Association Game</div>
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