<template>
  <div class="flex gap-4 flex-col">
    <label>
      {{ label }}
    </label>
    <input class="inputField"
           type="text"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value )"
           v-bind="$attrs"
    >
  </div>
</template>

<script>
export default {
  name: "BaseInput1.vue",
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
  setup(props) {
    console.log(props.modelValue, "modelValue");

  }
}
</script>

<style scoped>

</style>