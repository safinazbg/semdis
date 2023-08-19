<template>
  <p class="text-red-500 opacity-0 select-none transition duration-100 " :class="{'opacity-100 ':inputError}">Please choose an
    english noun, that you did not type previously. Proper
    nouns are not allowed.</p>
</template>
<script>
export default {
  name: 'ErrorMessage',
  props: {
    inputError: {}
  }
}
</script>