<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

const props = defineProps({
    orderCreated: Array,
});

const emit = defineEmits(['setOrderCreated'])

const url = "https://httpbin.org/status/200";
const method = "POST";
const formData = ref();

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value) {
            if (value?.length >= 2) return true;
            return "Name needs to be at least 2 characters.";
        },
        phone(value) {
            if (value?.length > 10 && /[0-9-]+/.test(value)) return true;
            return "Phone number needs to be at least 11 digits.";
        },
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
            return "Must be a valid e-mail.";
        },
        select(value) {
            if (value) return true;
            return "Select a payment method.";
        },
        checkbox(value) {
            if (value === "1") return true;
            return "Must be checked.";
        },
    },
});
const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const select = useField("select");
const checkbox = useField("checkbox");

const items = ref(["Сash payment", "Сard payment", "Payment by bonuses"]);

const submit = handleSubmit((values) => {
    fetch(url, { method }).then((res) => {
        if (res.status === 200) {
            emit("setOrderCreated", true);
        }
    });

    formData.value = JSON.stringify(values, null, 2);
});
</script>

<template>
    <form @submit.prevent="submit">
        <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
            label="Name"></v-text-field>

        <v-text-field v-model="phone.value.value" :counter="7" :error-messages="phone.errorMessage.value"
            label="Phone Number"></v-text-field>

        <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail"></v-text-field>

        <v-select v-model="select.value.value" :items="items" :error-messages="select.errorMessage.value"
            label="Select"></v-select>

        <v-checkbox v-model="checkbox.value.value" :error-messages="checkbox.errorMessage.value" value="1"
            label="Agreement with the order processing rules" type="checkbox"></v-checkbox>

        <v-btn class="me-4" type="submit" variant="tonal"> submit </v-btn>

        <v-btn @click="handleReset" flat > clear </v-btn>
    </form>
    {{ formData }}
</template>

<style scoped></style>
