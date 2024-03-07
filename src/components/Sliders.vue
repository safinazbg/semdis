<template>
  <div class="flex flex-col gap-2">
  <div v-for="(value, key, index) in userWords" :key="index" class="k1:w-96 w-80">
      <Slider :score="value.score" :index="index" :word="key"/>
  </div>
  </div>
</template>
<script>
import Slider from "@/components/Slider.vue"

export default {
  name: 'SlidersComponent',
  components: {Slider},
  props: {
    userWords: {}
  }
}
</script>
