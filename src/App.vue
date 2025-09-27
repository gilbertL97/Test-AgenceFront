<script setup lang="ts">
import { useMenu } from './composable/useMenu';

const { items } = useMenu()
const value1 = ref('consultor');
</script>

<template>
  <div class="mx-10 mt-4">
    <a-menu mode="horizontal" :items="items" />
    <div class="mt-4">
      <a-radio-group v-model:value="value1">
        <a-radio-button value="clientes">Cliente</a-radio-button>
        <a-radio-button value="consultor">Consultor</a-radio-button>
      </a-radio-group>
    </div>
  </div>

</template>

<style scoped></style>
