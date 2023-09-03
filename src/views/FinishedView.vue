<template>
  <Header></Header>
  <div class="flex flex-col text-center items-center">
    <div class="k1:w-96 w-80">
      <h1 class="text-4xl relative -top-4">
        Thanks for playing!
        You may now come back to the Prolific website
      </h1>
    </div>
    <div class="w-full p-8 mt-8 bg-slate-100">
      <div class="w-full flex flex-col gap-6 justify-center k1:flex-row k1:justify-around items-center ">
        <div class="w-full k1:w-1/3">

          <h1 class="text-3xl">Level 1 </h1>
          <h1 class="text-xl">Average Score: {{ animatedAverageLevel1  }} / 100</h1>
          <Level1ChatContainer @average-calculated="handleAverageCalculatedLevel1"/>
        </div>
        <div class=" w-full k1:w-1/3">
          <h1 class="text-3xl">Level 2 </h1>
          <h1 class="text-xl">Average Score: {{ animatedAverageLevel2 }} / 100</h1>

          <Level2ChartContainer @average-calculated="handleAverageCalculatedLevel2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Level2ChartContainer from "@/components/Level2/Level2ChartContainer.vue";
import Level1ChatContainer from "@/components/Level1/Level1ChartContainer.vue";
import { ref} from "vue";

export default {
  name: "FinishedView",
  components: {
    Level1ChatContainer,
    Level2ChartContainer,
    Header
  }, setup() {
    const targetAverageLevel1 = ref(0);
    const targetAverageLevel2 = ref(0);

    const animatedAverageLevel1 = ref(0);
    const animatedAverageLevel2 = ref(0);
    const duration = 3000;

    const stepValueLevel1 = ref(0) ;
    const stepValueLevel2 =  ref(0);


    const handleAverageCalculatedLevel1 = (average) => {
      targetAverageLevel1.value =  average
      stepValueLevel1.value = Math.round((average - animatedAverageLevel1.value) / (duration / 100));
      animateScoreLevel1();
    }
    const handleAverageCalculatedLevel2 = (average) => {
      targetAverageLevel2.value =  average
      stepValueLevel2.value = Math.round((average - animatedAverageLevel2.value) / (duration / 100));
      animateScoreLevel2();
    }

    const animateScoreLevel1 = () => {
      const animationInterval = setInterval(() => {
        if (animatedAverageLevel1.value >= targetAverageLevel1.value) {
          clearInterval(animationInterval);
          animatedAverageLevel1.value = targetAverageLevel1.value; // Ensure the final value is exactly the target value
        } else {
          animatedAverageLevel1.value += stepValueLevel1.value;
        }
      }, 100);
    };
    const animateScoreLevel2 = () => {
      const animationInterval = setInterval(() => {
        if (animatedAverageLevel2.value >= targetAverageLevel2.value) {
          clearInterval(animationInterval);
          animatedAverageLevel2.value = targetAverageLevel2.value;
        } else {
          animatedAverageLevel2.value += stepValueLevel2.value;
        }
      }, 100);
    };

    return {
      handleAverageCalculatedLevel1,
      handleAverageCalculatedLevel2,
      animatedAverageLevel1,
      animatedAverageLevel2
    }
  }
}
</script>

<style scoped>

</style>