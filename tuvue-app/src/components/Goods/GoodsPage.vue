<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import Cart from "../Cart/Cart.vue";
import CreateOrder from "../Cart/CreateOrder.vue";
import fetchData from "../fetchData";
import { useRoute } from 'vue-router';


defineProps({
  id: String,
});

const goodsList = ref({});
const loading = ref(true);
const search = ref("");
const url = "https://fakestoreapi.com";
const method = "get";
const choosedGoods = reactive([]);
const initOrder = ref(false);

const route = useRoute();
// const router = useRouter();

function addToCart(item) {
  choosedGoods.push(item);
}

onMounted(() => {
  fetchData(`${url}/products/${route.params.id}`, method)
    .then((res) => (goodsList.value = { ...res }))
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
  // router.push('/cart/create-order')
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

        <v-container>
          <v-row no-gutters>
            <v-col cols="12" sm="4">
              <v-sheet class="ma-2 pa-2">
                <v-card class="mx-auto" max-width="800" elevation="0">

                  <v-img class="align-end text-white" width="300" aspect-ratio="1/1" cover :src="goodsList.image"></v-img>
                </v-card>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="8">
              <v-sheet class="ma-2 pa-2">
                <v-card class="mx-auto" max-width="800" elevation="0">

                  <v-banner color="success" lines="two">
                    <template v-slot:prepend>
                      <v-avatar color="red-accent-4" icon="mdi-sale-outline"></v-avatar>
                    </template>
                    <template v-slot:text>
                      <v-card-title class="text-wrap">{{ goodsList.title }}</v-card-title>
                    </template>

                    <template v-slot:actions>
                      <v-btn @click="addToCart(goodsList)">
                        Add To Cart
                      </v-btn>

                      <v-btn disabled>
                        Buy
                      </v-btn>
                    </template>
                  </v-banner>

                  <v-card-text>
                    <div class="pa-4"><strong>Category:</strong> <u>{{ goodsList.category }}</u></div>

                    <div class="pa-4"><strong>Details:</strong> {{ goodsList.description }}</div>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
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
