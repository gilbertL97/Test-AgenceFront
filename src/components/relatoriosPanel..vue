<script setup lang="ts">
import type { UserData } from '@/types/types';
import TableRelatorio from './tableRelatorio.vue';

defineProps<{
  data: UserData[];
  isloading: boolean;
}>()
</script>
<template>
  <div class="mt-3">
    <div v-if="isloading" class="text-center py-10">
      Carregando...
    </div>
    <div v-else class="pr-2 my-10">
      <div v-for="(item, index) in data" :key="index" class="mb-6">
        <TableRelatorio :data="item" />
      </div>
    </div>

  </div>
</template>



<style scoped></style>
