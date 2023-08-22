<template>
  <Header></Header>
  <div class="flex flex-col text-center items-center">
    <div class="w-96">
      <h1 class="text-4xl">
        Thanks for playing!
        You may now come back to the Prolific website
      </h1>
    </div>
  <div class="w-full p-8 mt-8 bg-slate-100">
    <div class="w-full flex flex-col gap-6 justify-center k1:flex-row k1:justify-around items-center ">
      <div class="w-full k1:w-5/12">
        <h1 class="text-3xl">Result Level 1</h1>
      <Level1ChatContainer/>
      </div>
      <div class=" w-full k1:w-5/12">
        <h1 class="text-3xl">Result Level 2</h1>
      <Level2ChartContainer/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Level2ChartContainer from "@/components/Level2/Level2ChartContainer.vue";
import Level1ChatContainer from "@/components/Level1ChartContainer.vue";

export default {
  name: "FinishedView",
  components: {
    Level1ChatContainer,
    Level2ChartContainer,
    Header
  }
}
</script>

<style scoped>

</style>