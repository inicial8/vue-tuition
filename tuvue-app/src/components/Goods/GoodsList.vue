<script setup>
import { ref, onMounted, computed } from "vue";
import Goods from "./Goods.vue";
import fetchData from "../fetchData";

defineProps({
  msg: String,
});

const goodsList = ref();
const loading = ref(true);
const error = ref(null);
const search = ref("");
const url = "https://fakestoreapi.com/";
const method = "get";

onMounted(() => {
  fetchData(url + "products", method)
    .then((res) => (goodsList.value = res))
    .finally(() => {
      loading.value = false;
    });
});

const searchedGoods = computed(() => {
  return goodsList.value.filter((goods) => {
    return (
      goods.title.toLowerCase().indexOf(search.value.toLowerCase()) != -1 ||
      goods.price == search.value
    );
  });
});
</script>

<template>
  <v-row no-gutters>
    <v-col cols="8" sm="2">
      <v-sheet class="ma-2 pa-2">
        <v-card class="mx-auto" width="300" elevation="0">
          <v-card-text>
            <v-text-field
              label="search..."
              prepend-icon="mdi-magnify"
              variant="underlined"
              v-model="search"
              hint="search by Title or Price"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col cols="12" sm="8">
      <v-sheet class="ma-2 pa-2">
        <v-card flat class="pa-4" tile :loading="loading">
          <v-card-title class="text-center">
            <h1 class="pb-6">{{ msg }}</h1>
          </v-card-title>

          <v-card-subtitle v-if="error">
            {{ error.value }}
          </v-card-subtitle>

          <v-card-text>
            <v-row dense v-if="!loading && goodsList && goodsList.length">
              <v-col v-for="goods in searchedGoods" :key="goods.id">
                <Goods :goods="goods" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped>
ul {
  list-style: none;
  text-align: left;
}
</style>
