<script setup>
import { ref, computed, watch } from "vue";
import { useField, useForm } from "vee-validate";
import ReadyOrder from "./ReadyOrder.vue";

const props = defineProps({
  choosedGoods: Array,
});

const url = "https://httpbin.org/status/200";
const method = "POST";
const formData = ref();
const orderCreated = ref(false);

let total = computed(() => {
  let total = 0;
  props.choosedGoods.forEach((item) => {
    total += item.price;
  });
  return total;
});

function deleteItem(index) {
  if (props.choosedGoods.length > 1) {
    props.choosedGoods.splice(index, 1);
  } else {
    window.location.href = "\\";
  }
}

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true;
      return "Name needs to be at least 2 characters.";
    },
    phone(value) {
      if (value?.length > 10 && /[0-9-]+/.test(value)) return true;
      return "Phone number needs to be at least 9 digits.";
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
      orderCreated.value = true;
    }
  });

  formData.value = JSON.stringify(values, null, 2);
});
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="500"
    elevation="0"
    v-if="choosedGoods.length !== 0"
  >
    <v-card-title>Your order in the amount of {{ total }}$</v-card-title>
    <v-card-subtitle
      >until the order is created, you can edit the list of
      products</v-card-subtitle
    >
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(goods, index) in choosedGoods"
          :key="goods.id"
          :title="goods.title"
          :subtitle="goods.price + '$'"
        >
          <template v-slot:prepend>
            <v-avatar>
              <v-img :src="goods.image" :alt="goods.description"></v-img>
            </v-avatar>
          </template>

          <template v-slot:append>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-minus-circle-outline"
              variant="text"
              @click="deleteItem(index)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
  <v-card
    class="mx-auto"
    max-width="500"
    elevation="0"
    v-if="choosedGoods.length !== 0"
  >
    <v-card-title><h3>Create an order</h3></v-card-title>
    <v-card-text>
      <form @submit.prevent="submit">
        <v-text-field
          v-model="name.value.value"
          :counter="10"
          :error-messages="name.errorMessage.value"
          label="Name"
        ></v-text-field>

        <v-text-field
          v-model="phone.value.value"
          :counter="7"
          :error-messages="phone.errorMessage.value"
          label="Phone Number"
        ></v-text-field>

        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="E-mail"
        ></v-text-field>

        <v-select
          v-model="select.value.value"
          :items="items"
          :error-messages="select.errorMessage.value"
          label="Select"
        ></v-select>

        <v-checkbox
          v-model="checkbox.value.value"
          :error-messages="checkbox.errorMessage.value"
          value="1"
          label="Agreement with the order processing rules"
          type="checkbox"
        ></v-checkbox>

        <v-btn class="me-4" type="submit" variant="tonal"> submit </v-btn>

        <v-btn @click="handleReset" flat> clear </v-btn>
      </form>
    </v-card-text>
  </v-card>
  <ready-order :dialog="orderCreated" v-if="orderCreated"></ready-order>
  {{ formData }}
</template>

<style scoped>
</style>
