<template>
  <div class="flex gap-4 justify-center">
    <BaseInput label="Enter your Prolific ID" v-model="userId" />
    <button @click="handleLogin" class="primaryButton h-fit self-end">Login</button>
  </div>
</template>

<script>
import {ref} from "vue";
import BaseInput from "@/components/BaseInput.vue";

export default ({
  name: "LoginSection",
  components: {
    BaseInput,
  },
  setup(props,{emit}) {
    const userId = ref("");

    const handleLogin = () => {
      emit("login", userId.value);
    };

    return {
      userId,
      handleLogin,
    };
  },
});
</script>
