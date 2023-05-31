<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const user = localStorage.getItem('user')
</script>

<template>
   <v-app id="inspire">
    <Navbar v-if="user"></Navbar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer v-if="user"></Footer>
  </v-app>
</template>
