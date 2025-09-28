<script setup lang="ts">
import type { UserData } from '@/types/types';


defineProps<{
  data: UserData;
}>()

const columns = [
  {
    title: 'Período',
    dataIndex: 'periodo',
  },
  {
    title: 'Receita Líquida',
    dataIndex: 'receita_liquida',
  },
  {
    title: 'Custo Fixo',
    dataIndex: 'salario',
  },
  {
    title: 'Comissão',
    dataIndex: 'valor_comissao',
  },
  {
    title: 'Lucro',
    dataIndex: 'lucro',
  },
];
</script>
<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered>
      <template #title>{{ data.name }}</template>

      <template #summary>
        <a-table-summary-row>
          <a-table-summary-cell>Total</a-table-summary-cell>
          <a-table-summary-cell>
            <a-typography-text>{{ data.total[0] }}</a-typography-text>
          </a-table-summary-cell>
          <a-table-summary-cell>
            <a-typography-text>{{ data.total[1] }}</a-typography-text>
          </a-table-summary-cell>
          <a-table-summary-cell>
            <a-typography-text>{{ data.total[2] }}</a-typography-text>
          </a-table-summary-cell>
          <a-table-summary-cell>
            <a-typography-text>{{ data.total[3] }}</a-typography-text>
          </a-table-summary-cell>
        </a-table-summary-row>
      </template>
    </a-table>
  </div>
</template>



<style scoped></style>
