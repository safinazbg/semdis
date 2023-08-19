<template>
  <Header/>
  <div class="flex flex-col justify-center text-center ">
    <h1 class=" text-5xl font-bold">Level 1 Results</h1>
    <div class=" w-full flex justify-center">
      <div class="w-3/5 p-4 ">
      <canvas ref="chart"></canvas>
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
import {onMounted, ref} from "vue";
import Chart from "chart.js/auto";
import Header from "@/components/Header.vue";
import router from "@/router";

export default {
  name: "Level1Results",
  components: {
    Header,
  },
  setup() {
    const chart = ref(null);
    const loadedDataTrain  = localStorage.getItem("roundData1") || 0;
    const loadedDataSteam = localStorage.getItem("roundData2") || 0;
    const loadedDataPage = localStorage.getItem("roundData3") || 0;
    const loadedDataSink = localStorage.getItem("roundData4") || 0;
    const loadedDataFence = localStorage.getItem("roundData5") || 0;

    const onNext = () => {
      router.push("/level1/feedback")
    }
    function calculateAverage(data) {
      const scores = Object.values(data).map(item => item.score);
      const sum = scores.reduce((total, score) => total + score, 0);
      const average = sum / scores.length;
      return average;
    }

    const averageTrain = calculateAverage(JSON.parse(loadedDataTrain));
    const averageSteam = calculateAverage(JSON.parse(loadedDataSteam));
    const averagePage = calculateAverage(JSON.parse(loadedDataPage));
    const averageSink = calculateAverage(JSON.parse(loadedDataSink));
    const averageFence = calculateAverage(JSON.parse(loadedDataFence));

    onMounted(() => {
      const data = {
        labels: ["1. Train", "2. Steam", "3. Page", "4. Sink", "5. Fence"],
        datasets: [
          {
            label: "Average Score",
            data: [averageTrain, averageSteam, averagePage, averageSink, averageFence],
            backgroundColor: ["rgba(159, 176, 220, 1)",
              "rgba(245, 182, 154, 1)",
              "rgba(255, 218, 150, 1)",
              "rgba(166, 204, 149, 1)",
              "rgba(172, 184, 202, 1)",]
          },
        ],
      };


      // Create the bar chart
      new Chart(chart.value, {
        type: "bar",
        data: data,
        options: {
          animation: {
            duration: 1000,
/*
            easing: 'easeOutQuad', // Animation easing function
*/
            delay: (context) => {
              let delay
              if (context.type === 'data' && context.mode === 'default') {
                delay = context.dataIndex * 500 + context.datasetIndex * 100;
              }
              return delay;
            },

          },
          scales: {
            y: {
              beginAtZero: true,
              min:0,
              max:100,
            },
          },
        },
      });
    });

    return {
      chart,
      loadedDataTrain,
      loadedDataSteam,
      loadedDataPage,
      loadedDataSink,
      loadedDataFence,
      onNext,
    };
  },

}
</script>

<style scoped>

</style>