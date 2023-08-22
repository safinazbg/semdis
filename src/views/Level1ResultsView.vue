<template>
  <Header/>
  <div class="flex flex-col justify-center text-center ">
    <h1 class=" text-4xl relative -top-4 font-bold">Level 1 Results</h1>
    <div class=" w-full flex justify-center">
      <div class="w-3/5 p-2 ">
        <ChartContainer/>
      </div>
    </div>
    <div class="w-full">
    <button class="primaryButton mb-8 " @click="onNext"
    >
      Next
    </button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import router from "@/router";
import ChartContainer from "@/components/Level1ChartContainer.vue";

export default {
  name: "Level1ResultsView",
  components: {
    ChartContainer,
    Header,
  },
  setup() {

    const onNext = () => {
      router.push("/level1/feedback")
    }


    return {
      onNext,
    };
  },

}
</script>

