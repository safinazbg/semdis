<template>
  <ChartComponent :data1="averageTrain" name1="Train" name2="Steam" name3="Page" name4="Sink" name5="Fence" :data2="averageSteam" :data3="averagePage" :data4="averageSink" :data5="averageFence"/>

</template>

<script>
import ChartComponent from "@/components/Chart.vue";

export default {
  name: "Level1ChatContainer"
  ,
  components: {ChartComponent},
  setup(){
    const loadedDataTrain  = localStorage.getItem("roundData1") || 0;
    const loadedDataSteam = localStorage.getItem("roundData2") || 0;
    const loadedDataPage = localStorage.getItem("roundData3") || 0;
    const loadedDataSink = localStorage.getItem("roundData4") || 0;
    const loadedDataFence = localStorage.getItem("roundData5") || 0;

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
    return {
      averageTrain,
      averageSteam,
      averagePage,
      averageSink,
      averageFence
    };
  }
}
</script>

<style scoped>

</style>