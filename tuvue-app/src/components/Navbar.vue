<script setup>
import { useTheme } from 'vuetify'
import router from '../routes'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '../stores/users'

const { username, loading, error } = storeToRefs(useUsersStore())

const theme = useTheme()
function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    localStorage.setItem("theme", !theme.global.current.value.dark ? 'light' : 'dark')
}

const user = localStorage.getItem("user")

function logout() {
    localStorage.removeItem("user")
    router.push({path: '/auth'});
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
        <span class="text-caption">{{ user || username }}</span>
        <v-btn variant="plain" icon="mdi-logout" @click="logout"></v-btn>

        Theme<v-btn icon="mdi-theme-light-dark" @click="toggleTheme" variant="plain"></v-btn>
    </v-app-bar>
</template>

<style scoped></style>
