<template>
  <div class="flex gap-4 flex-col">
    <label v-if="label">
      {{ label }}
    </label>
    <input class="inputField"
           type="text"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value )"
           v-bind="$attrs"
           autofocus
    >
  </div>
</template>

<script>
export default {
  name: "BaseInput.vue",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    }
  },

}
</script>

<style scoped>

</style>