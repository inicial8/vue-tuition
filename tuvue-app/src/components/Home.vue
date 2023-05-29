<script setup>
const items = [
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
  },
]
</script>

<template>
  <v-carousel :show-arrows="false">
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover height="600"></v-carousel-item>
  </v-carousel>
</template>

<style scoped></style>
