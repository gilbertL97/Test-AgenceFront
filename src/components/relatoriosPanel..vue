<script setup lang="ts">
import type { UserData } from '@/types/types';
import TableRelatorio from './tableRelatorio.vue';
import {
  LoadingOutlined
} from '@ant-design/icons-vue';

defineProps<{
  data: UserData[];
  isloading: boolean;
}>()
</script>
<template>
  <div class="mt-3">
    <div v-if="isloading">
      <LoadingOutlined />
    </div>
    <div v-else>
      <div v-for="(item, index) in data" :key="index" class="mb-6">
        <TableRelatorio :data="item" />
      </div>
    </div>

  </div>
</template>



<style scoped></style>
