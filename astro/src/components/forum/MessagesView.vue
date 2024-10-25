<script setup>
  import { ref } from "vue";

  const count = ref(0);

  const doInit = () => {
    console.log("init it!");
  };

  doInit();
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>
