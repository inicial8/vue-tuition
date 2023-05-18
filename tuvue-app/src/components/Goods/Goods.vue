<script setup>
defineProps({
  goods: Object,
})
</script>

<template>
    <p><strong>{{ goods.title }}</strong> - {{ goods.price }}$</p>
</template>

