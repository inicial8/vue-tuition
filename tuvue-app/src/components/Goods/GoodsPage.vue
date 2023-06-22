<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import Cart from "../Cart/Cart.vue";
import CreateOrder from "../Cart/CreateOrder.vue";
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useGoodsStore } from '../../stores/goods'
import { useCartStore } from '../../stores/cart'

defineProps({
  id: String,
});

const { product, loading, error } = storeToRefs(useGoodsStore())
const { goodsListInCart } = storeToRefs(useCartStore())
const { fetchProduct } = useGoodsStore()
const { add } = useCartStore()

const initOrder = ref(false);

const route = useRoute();

function addToCart(item) {
  add(item)
}

onMounted(() => {
  fetchProduct(route.params.id)
});

function createOrder(args) {
  initOrder.value = args.init
}
</script>

<template>
  <v-row no-gutters v-if="!initOrder">
    <v-col cols="8" sm="2">
      <v-sheet class="ma-2 pa-2">
        {{ error }}
      </v-sheet>
    </v-col>
    <v-col cols="12" sm="7">
      <v-sheet class="ma-2 pa-2">

        <v-container v-if="product">
          <v-row no-gutters>
            <v-col cols="10" sm="4">
              <v-sheet class="ma-2 pa-2">
                <v-card class="mx-auto" max-width="800" elevation="0" :loading="loading">

                  <v-img class="align-end text-white" width="300" aspect-ratio="1/1" cover :src="product.image"></v-img>
                </v-card>
              </v-sheet>
            </v-col>
            <v-col cols="10" sm="8">
              <v-sheet class="ma-2 pa-2">
                <v-card class="mx-auto" max-width="800" elevation="0">

                  <v-banner color="success" lines="two">
                    <template v-slot:prepend>
                      <v-avatar color="red-accent-4" icon="mdi-sale-outline"></v-avatar>
                    </template>
                    <template v-slot:text>
                      <v-card-title class="text-wrap">{{ product.title }}</v-card-title>
                    </template>

                    <template v-slot:actions>
                      <v-btn @click="addToCart(product)">
                        Add To Cart
                      </v-btn>

                      <v-btn disabled>
                        Buy
                      </v-btn>
                    </template>
                  </v-banner>

                  <v-card-text>
                    <div class="pa-4"><strong>Category:</strong> <u>{{ product.category }}</u></div>

                    <div class="pa-4"><strong>Details:</strong> {{ product.description }}</div>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-col>
    <v-col cols="8" sm="3">
      <v-sheet class="ma-2 pa-2">
        <Cart :choosedGoods="goodsListInCart" @create-order="createOrder"></Cart>
      </v-sheet>
    </v-col>
  </v-row>
  <CreateOrder :choosedGoods="goodsListInCart" v-if="initOrder"></CreateOrder>
</template>

<style scoped></style>
