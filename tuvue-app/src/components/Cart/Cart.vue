<script setup>
import { computed } from "vue";
import { storeToRefs } from 'pinia'
import { useCartStore } from '../../stores/cart'
const props = defineProps({
  choosedGoods: Array,
});

const { getGoodsTotal } = storeToRefs(useCartStore())

let total = computed(() => {
  let total = 0;
  props.choosedGoods.forEach((item) => {
    total += item.price*item.count;
  });
  return total;
});
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="500"
    elevation="0"
    v-if="choosedGoods.length !== 0"
  >
    <v-toolbar color="gray">
      <v-btn variant="text" icon="mdi-cart"></v-btn>
      <v-toolbar-title>Your Cart ({{ getGoodsTotal }})</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-item
        v-for="(goods, index) in choosedGoods"
        :key="goods.id"
        :title="goods.title+' (x'+goods.count+')'"
        :subtitle="goods.price + '$'"
      >
        <template v-slot:prepend>
          <v-avatar>
            <v-img :src="goods.image" :alt="goods.description"></v-img>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-minus-circle-outline"
            variant="text"
            @click="choosedGoods.splice(index, 1)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <span>{{ total }}$</span>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('createOrder', { init: true })"
        >place an order</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style scoped>
</style>
