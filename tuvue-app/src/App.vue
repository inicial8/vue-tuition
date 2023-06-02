<script setup>
import { useTheme } from 'vuetify'
import { onBeforeMount } from "vue";
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const theme = useTheme()

onBeforeMount(() =>{
  theme.global.name.value = localStorage.getItem('theme')
})
</script>

<template>
   <v-app id="inspire">
    <Navbar />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>
