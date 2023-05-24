<script setup>
import { ref } from "vue";

defineProps({
  goods: Object,
});

const show = ref(true);
</script>

<template>
  <v-card class="mx-auto" max-width="344" elevation="0">
    <v-img :src="goods.image" height="150px"></v-img>

    <v-card-title>
      {{ goods.title }}
    </v-card-title>

    <v-card-subtitle> {{ goods.price }}$ </v-card-subtitle>

    <v-card-actions>
      <v-btn color="green"> Add to cart </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ goods.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

