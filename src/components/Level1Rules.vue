<template>
  <div class=" relative  bg-slate-100 my-12 px-8 p-4 rounded-md">
    <p class="font-bold pb-3">Rules:</p>
    <svg class=" w-6 h-6 absolute right-4 top-4 text-gray-800 dark:text-white" aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>
    <ol class="list-decimal">
      <li>
        Think of the most unrelated nouns
      </li>
      <li>Type only one word at a time</li>
      <li>
        Avoid proper nouns (e.g., no specific people or places)
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Level1Rules"
}
</script>

<style scoped>

</style>