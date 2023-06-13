<script setup>
import router from '../routes';
import { useField, useForm } from "vee-validate";
import { useUsersStore } from '../stores/users'

const { login } = useUsersStore()

const user = localStorage.getItem('user');

const { handleSubmit } = useForm({
    validationSchema: {
        password(value) {
            if (value?.length >= 2) return true;
            return "Name needs to be at least 2 characters.";
        },
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
            return "Must be a valid e-mail.";
        },
    },
});

const email = useField("email");
const password = useField("password");

const submit = handleSubmit(() => {
    if (user) {
        router.push('/');
    } else {
        login(email.value.value)
        localStorage.setItem('user', email.value.value);
        router.push({path: '/'});
    }
});
</script>

<template>
        <v-container class="fill-height" fluid>
            <v-row justify="center">
                <v-col cols="12" sm="8" md="10">
                    <v-card class="elevation-8" :rounded="0">
                        <v-window>
                            <v-window-item :value="1">
                                <v-row>
                                    <v-col cols="12" md="8">
                                        <v-card-text>
                                            <h1 class="
                                                text-center
                                                display-2
                                                mb-4
                                                light-blue--text
                                                text--darken-3
                                            ">
                                                Sign in
                                            </h1>
                                            <div class="text-center">
                                                <v-btn class="mx-2" fab color="blue darken-2" outlined>
                                                    <v-icon>mdi-facebook</v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab color="red darken-2" outlined>
                                                    <v-icon>mdi-google</v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab color="blue darken-3" outlined>
                                                    <v-icon>mdi-linkedin</v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab color="blue lighten-1" outlined>
                                                    <v-icon>mdi-twitter</v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab color="black" outlined>
                                                    <v-icon>mdi-github</v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab color="orange darken-4" outlined>
                                                    <v-icon>mdi-gitlab</v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" color="blue darken-3">
                                                    <v-icon>mdi-bitbucket</v-icon>
                                                </v-btn>
                                            </div>
                                            <form class="mt-4" @submit.prevent="submit">
                                                <v-text-field v-model="email.value.value" label="Email" name="Email"
                                                    prepend-icon="email" type="text" color="blue accent-3"
                                                    :error-messages="email.errorMessage.value"></v-text-field>
                                                <v-text-field v-model="password.value.value" id="password" label="Password"
                                                    name="Password" prepend-icon="password" type="password"
                                                    color="red accent-3" :counter="8"
                                                    :error-messages="password.errorMessage.value"></v-text-field>
                                                <div class="text-center">
                                                    <v-btn type="submit" variant="tonal" rounded="0"
                                                        color="white--text light-blue" class="text-center mt-4 mb-6"> Sign
                                                        in </v-btn>
                                                </div>
                                            </form>
                                        </v-card-text>
                                    </v-col>
                                    <v-col cols="12" md="4" class="light-blue darken-2">
                                        <v-card-text class="white--text mt-12">
                                            <h1 class="text-center display-1">Hi, there</h1>
                                            <h3 class="text-center mt-2">
                                                Sign up if you still don't have an account
                                            </h3>
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-window-item>
                        </v-window>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        </template>

<style scoped></style>
