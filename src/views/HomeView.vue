<template>
  <div class="">
    <Header></Header>
    <LoginSection @login="handleLogin" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import LoginSection from "@/components/LoginSection";
import router from "@/router";


export default {
  name: 'HomeView',
  components: {
    Header,
    LoginSection
  },
  setup() {

    const handleLogin = (userId) => {
      console.log(userId, "userId")
      //Check the userID here
      router.push('level1')
    }

    return {
      handleLogin,
    }
  }
}
</script>
