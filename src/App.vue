<script setup lang="ts">
import ConsultComponent from './components/consultComponent.vue';
import { useFetch } from './composable/useFetch';
import { useMenu } from './composable/useMenu';

const { items } = useMenu()
const { data, loading } = useFetch('/consultors');
const value1 = ref('consultor');

onMounted(() => {
  console.log('Component mounted.');
});
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
    <div class="my-4">
      <ConsultComponent v-if="value1 === 'consultor'" :is-loading="loading" :data="data ?? []" />
    </div>
  </div>

</template>

<style scoped></style>
