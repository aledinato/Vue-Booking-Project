<script setup>
  import logo from "../images/logo3.png"

  defineProps({
    width: {
      type: Number,
      default: 300,
    },
  })
</script>

<template>
  <img :src="logo" :width=width alt="logo">
</template>
