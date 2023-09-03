<template>
  <canvas ref="chart"></canvas>
</template>
<script>
import {onMounted, ref} from "vue";
import { Chart, LinearScale, BarController, CategoryScale, registerables } from "chart.js";

export default {
  name: 'ChartComponent',
  props:{
    data1:{
      type:Number,
    },
    data2:{
      type:Number,
    },
    data3:{
      type:Number,
    },
    data4:{
      type:Number,
    },
    data5:{
      type:Number,
    },
    name1:{
      type:String,
    },
    name2:{
      type:String,
    },
    name3:{
      type:String,
    },
    name4:{
      type:String,
    },
    name5:{
      type:String,
    },
  },
  setup(props){
    const chart = ref(null);
    Chart.register(...registerables, LinearScale, BarController, CategoryScale);

    onMounted(() => {
      const data = {
        labels: [`1. ${props.name1}`, `2. ${props.name2}`, `3. ${props.name3}`, `4. ${props.name4}`, `5. ${props.name5}`],
        datasets: [
          {
            label: "",
            data: [props.data1, props.data2, props.data3, props.data4, props.data5],
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
          plugins: {
            legend: {
              display: false, // Hide the legend (which contains the label and its color)
            },
          },
          animation: {
            duration: 1000,
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
    };
  },
}
</script>
