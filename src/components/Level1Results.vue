<template>
  {{loadedData}}
</template>

<script>
export default {
  name: "Level1Results",
  setup(){
    const loadedData = localStorage.getItem("roundData");



    return{
      loadedData,
    }
  }
}
</script>

<style scoped>

</style>