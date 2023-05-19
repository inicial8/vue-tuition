<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import Goods from './Goods.vue'
import fetchData from '../fetchData'

defineProps({
  msg: String,
})

const goodsList = ref()
const loading = ref(true)
const error = ref(null)
const url = 'https://fakestoreapi.com/'
const method = 'get'

onMounted(() => {
  fetchData(url+'products', method)
  .then(res => goodsList.value = res)
  .finally(() => {
    loading.value = false
  })
})
</script>

<template>
  <h1>{{ msg }}</h1>
  
  <p v-if="loading">loading...</p>

  <ul v-if="!loading && goodsList && goodsList.length">
    <li v-for="goods of goodsList" :key="goods.id">
      <Goods :goods="goods"/>
    </li>
  </ul>

  <p v-if="error">
    {{ error.value }}
  </p>
</template>

<style scoped>
ul {
  list-style: none;
  text-align: left;
}
</style>
