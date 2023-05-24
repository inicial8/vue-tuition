<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  dialog: Boolean,
});
const overlay = ref();

onMounted(() => {
  overlay.value = props.dialog ? true : false;
});

function close() {
  window.location.href = "\\";
}
</script>

<template>
  <v-overlay v-model="overlay" class="align-center justify-center" persistent>
    <v-fade-transition hide-on-leave>
      <v-card
        v-if="dialog"
        append-icon="$close"
        class="mx-auto"
        elevation="24"
        title="Send a order"
      >
        <template v-slot:append>
          <v-btn icon="$close" variant="text" @click="close"></v-btn>
        </template>

        <v-divider></v-divider>

        <div class="py-12 text-center">
          <v-icon
            class="mb-6"
            color="success"
            icon="mdi-check-circle-outline"
            size="128"
          ></v-icon>

          <div class="text-h4 font-weight-bold" style="width: 500px;">This order was sent</div>
        </div>

        <v-divider></v-divider>

        <div class="pa-4 text-end">
          <v-btn
            class="text-none"
            color="medium-emphasis"
            min-width="92"
            variant="outlined"
            @click="close"
          >
            OKAY!
          </v-btn>
        </div>
      </v-card>
    </v-fade-transition>
  </v-overlay>
</template>

<style scoped>
</style>
