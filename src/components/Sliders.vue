<template>
  <div v-for="(value, key, index) in userWords" :key="index" class="flex flex-col gap-4">
    <div class="w-96 pb-4">
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
