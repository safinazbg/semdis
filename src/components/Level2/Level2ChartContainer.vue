<template>
  <ChartComponent :data1="averageBelt" name1="Belt" name2="Tea" name3="Net" name4="Earth" name5="Tray" :data2="averageTea" :data3="averageNet" :data4="averageEarth" :data5="averageTray"/>
</template>

<script>
import ChartComponent from "@/components/Chart.vue";

export default {
  name: "Level2ChartContainer",
  components: {ChartComponent},
  setup(){

    //GET THE AVARAGE SCORE FROM THE 5 rounds in LEVEL 2, FOR NOW JUST RANDOM STUFF FROM LOCAL STORAGE
    const loadedDataBelt  = localStorage.getItem("Level2roundData1") || 10;
    const loadedDataTea = localStorage.getItem("Level2roundData2") || 20;
    const loadedDataNet = localStorage.getItem("Level2roundData3") || 30;
    const loadedDataEarth = localStorage.getItem("Level2roundData4") || 40;
    const loadedDataTray = localStorage.getItem("Level2roundData5") || 50;

    function calculateAverage(data) {
      const scores = Object.values(data).map(item => item.score);
      const sum = scores.reduce((total, score) => total + score, 0);
      const average = sum / scores.length;
      return average;
    }

    const averageBelt = calculateAverage(JSON.parse(loadedDataBelt)) || 10;
    const averageTea = calculateAverage(JSON.parse(loadedDataTea)) || 20;
    const averageNet = calculateAverage(JSON.parse(loadedDataNet)) || 30;
    const averageEarth = calculateAverage(JSON.parse(loadedDataEarth)) ||40;
    const averageTray = calculateAverage(JSON.parse(loadedDataTray)) ||50;
    return {
      averageBelt,
      averageTea,
      averageNet,
      averageEarth,
      averageTray
    };
  }
}
</script>

<style scoped>

</style>