<script setup>
import { ref, computed } from "vue";
import ReadyOrder from "./ReadyOrder.vue";
import CreateOrderForm from "./CreateOrderForm.vue";

const props = defineProps({
  choosedGoods: Array,
});

const orderCreated = ref(false);

let total = computed(() => {
  let total = 0;
  props.choosedGoods.forEach((item) => {
    total += item.price*item.count;
  });
  return total;
});

function deleteItem(index) {
  if (props.choosedGoods.length > 1) {
    props.choosedGoods.splice(index, 1);
  } else {
    window.location.href = "\\";
  }
}

function setOrderCreated(value) {
  orderCreated.value = value;
}
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="500"
    elevation="0"
    v-if="choosedGoods.length !== 0"
  >
    <v-card-title>Your order in the amount of {{ total }}$</v-card-title>
    <v-card-subtitle
      >until the order is created, you can edit the list of
      products</v-card-subtitle
    >
    <v-card-text>
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
              @click="deleteItem(index)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
  <v-card
    class="mx-auto"
    max-width="500"
    elevation="0"
    v-if="choosedGoods.length !== 0"
  >
    <v-card-title><h3>Create an order</h3></v-card-title>
    <v-card-text>
      <create-order-form @set-order-created="setOrderCreated"></create-order-form>
    </v-card-text>
  </v-card>
  <ready-order :dialog="orderCreated" v-if="orderCreated"></ready-order>
</template>

<style scoped>
</style>
