<template>
  <div class=" flex w-full ">
    <div class="">{{ index + 1 }} - {{ word }}</div>
    <div class="value ml-auto">{{ score }} / 100</div>
  </div>
  <div class="w-full rounded-md h-6 w-full bg-slate-200">
    <div class="h-full rounded-md"  :style="fillStyle"></div>
  </div>
</template>

<script >
import { ref, computed, onMounted } from 'vue';

export default {
  name: "SliderComponent",
  props:{
    score: {
    type: Number,
    default: -1,
    },
    index: {
    type: Number,
    default: 0,
    },
    word: {
    type: String,
    default: "",
    }
  },
  setup(props){
    const currentValue = ref(-1);
    const fillStyle = computed(() => {
      let fillColor = "rgba(34, 197, 94, 1)"; // Default to green (bg-green-500)

      if (props.score >= 0 && props.score <= 33) {
        fillColor = "rgba(239, 68, 68, 1)"; // Equivalent to bg-red-500
      } else if (props.score > 33 && props.score <= 66) {
        fillColor = "rgba(234, 179, 8, 1)"; // Equivalent to bg-yellow-500
      }
      return `width: ${currentValue.value}%; background-color: ${fillColor}; transition: width 1s ease-in-out;`;
    });


    const animateFilling = (targetValue) => {
      currentValue.value = 0;

      const duration = 1000; // Animation duration in milliseconds
      const interval = 10; // Interval for animation updates in milliseconds
      const increment = (targetValue / (duration / interval)) || 1;

      const animationInterval = setInterval(() => {
        currentValue.value += increment;

        if (currentValue.value >= targetValue) {
          clearInterval(animationInterval);
        }
      }, interval);
    };

    onMounted(() => {
      animateFilling(props.score);
    });

    return{
      fillStyle,
      currentValue,
      animateFilling,
    }
  }
}

</script>

<style scoped>

</style>
