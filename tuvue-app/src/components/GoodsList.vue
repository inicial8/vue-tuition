<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'

defineProps({
  msg: String,
})

const goodsList = ref()
const loading = ref(true)
const error = ref(null)

function fetchData() {
  loading.value = true
  return fetch(' https://fakestoreapi.com/products', {
    method: 'get'
  })
    .then(res => {
      return res.json()
    })
    .then(data => {
      goodsList.value = data
    })
    .catch(err => {
      error.value = err
      if (err.json) {
        return err.json.then(json => {
          error.value.message = json.message
        })
      }
    })
    .then(() => {
      loading.value = false
    })
}

onMounted(() => {
   fetchData()
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <ul v-if="!loading && goodsList && goodsList.length">
    <li v-for="good of goodsList" :key="good.id">
      <p><strong>{{ good.title }}</strong> - {{ good.price }}$</p>
    </li>
  </ul>

  <p v-if="loading">
   loading...
  </p>
  <p v-if="error">
    {{ error.value.message }}
  </p>
</template>

<style scoped>
ul {
  list-style: none;
  text-align: left;
}
</style>
