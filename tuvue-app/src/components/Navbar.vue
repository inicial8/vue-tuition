<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
    <v-app-bar scroll-behavior="elevate" scroll-threshold="8">
        <v-avatar class="ml-4">
            <v-btn icon="mdi-airballoon-outline" variant="plain"></v-btn>
        </v-avatar>
        Shop Balloon

        <v-spacer></v-spacer>

        <v-tabs centered stacked slider-color="primary" bg-color="transparent" color="basil">
            <v-tab small :to="{ name: 'home' }" variant="text">
                home
            </v-tab>
            <v-tab small :to="{ name: 'goods' }">
                products
            </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>

        Theme<v-btn icon="mdi-theme-light-dark" @click="toggleTheme" variant="plain"></v-btn>
    </v-app-bar>
</template>

<style scoped></style>
