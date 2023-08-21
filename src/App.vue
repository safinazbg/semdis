<template>
<!--  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>-->
  <router-view/>
  <div class="fixed inset-0 p-2 w-fit h-fit" >Dev mode:
    <div class="flex flex-col gap-2">

  <button class="primaryButton w-24 p-1 !px-0 !py-1 text-xs " @click="router.push('/level1')
">Level 1</button>
  <button class="primaryButton w-24 p-1 !px-0 !py-1 text-xs" @click="router.push('/level1/results')">Level 1 Result</button>
  <button class="primaryButton w-24 p-1 !px-0 !py-1 text-xs" @click="router.push('/level1/feedback')">Level 1 FeedBack</button>
  <button class="primaryButton w-24 p-1 !px-0 !py-1 text-xs" @click="router.push('/level2')">Level 2 </button>
  <button class="primaryButton w-24 p-1 !px-0 !py-1 text-xs" @click="router.push('/done')">Level 2 result/finish </button>
    </div>
  </div>
</template>

<style>





</style>
<script setup>
import router from "@/router";
</script>