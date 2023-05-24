<script setup>
import GoodsList from './components/Goods/GoodsList.vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
   <v-app id="inspire">
    <v-app-bar
      class="px-3"
      flat
    >
      <v-avatar
        size="32"
      >
      <v-icon icon="mdi-airballoon-outline"></v-icon>
    </v-avatar>

      <v-spacer></v-spacer>

      <v-tabs
        centered
      >
        <v-tab small>
          Products
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-btn icon="mdi-weather-night" @click="toggleTheme" variant="plain"></v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
          <GoodsList msg="Goods List" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
