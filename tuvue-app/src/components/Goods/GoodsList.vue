<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import Goods from "./Goods.vue";
import Cart from "../Cart/Cart.vue";
import CreateOrder from "../Cart/CreateOrder.vue";
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
const choosedGoods = reactive([]);
const initOrder = ref(false);

function addToCart(item) {
  choosedGoods.push(item);
}

onMounted(() => {
  fetchData(url + "products", method)
    .then((res) => (goodsList.value = res))
    .finally(() => {
      loading.value = false;
    });
});

const searchedGoods = computed(() => {
    return search.value ? goodsList.value.filter((goods) => {
    return (
      goods.title.toLowerCase().indexOf(search.value.toLowerCase()) != -1 ||
      goods.price == search.value
    );
  }) : goodsList.value  
});

function createOrder(args) {
  initOrder.value = args.init;
}
</script>

<template>
  <v-row no-gutters v-if="!initOrder">
    <v-col cols="8" sm="2">
      <v-sheet class="ma-2 pa-2">
        <v-card class="mx-auto" width="300" elevation="0">
          <v-card-text>
            <v-text-field label="search..." prepend-icon="mdi-magnify" variant="underlined" v-model="search"
              hint="search by Title or Price"></v-text-field>
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
                  <Goods :goods="goods" @add-to-cart="addToCart"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col cols="8" sm="2">
      <v-sheet class="ma-2 pa-2">
        <Cart :choosedGoods="choosedGoods" @create-order="createOrder"></Cart>
      </v-sheet>
    </v-col>
  </v-row>
  <CreateOrder :choosedGoods="choosedGoods"></CreateOrder>
</template>

<style scoped></style>
