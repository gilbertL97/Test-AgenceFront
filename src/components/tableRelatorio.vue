<script setup lang="ts">
import { formatBRL, getMonthName } from '@/helpers/helper';
import type { UserData, MonthlyData } from '@/types/types';


defineProps<{
  data: UserData;
}>()


const columns = [
  {
    title: 'Período',
    dataIndex: 'periodo',
    customRender: ({ record }: { record: MonthlyData }) => {
      return `${getMonthName(record.mes)} de ${record.ano}`;
    },
  },
  {
    title: 'Receita Líquida',
    dataIndex: 'receita_liquida',
    customRender: ({ text }: { text: string | number }) => {
      const { text: display, color } = formatBRL(text);
      return h('span', { style: { color } }, display);
    },
  },
  {
    title: 'Custo Fixo',
    dataIndex: 'salario',
    customRender: ({ text }: { text: string | number }) => {
      const { text: display, color } = formatBRL(text);
      return h('span', { style: { color } }, display);
    },
  },
  {
    title: 'Comissão',
    dataIndex: 'valor_comissao',
    customRender: ({ text }: { text: string | number }) => {
      const { text: display, color } = formatBRL(text);
      return h('span', { style: { color } }, display);
    },
  },
  {
    title: 'Lucro',
    dataIndex: 'lucro',
    customRender: ({ text }: { text: string | number }) => {
      const { text: display, color } = formatBRL(text);
      return h('span', { style: { color } }, display);
    },
  },
];
</script>
<template>
  <div>
    <a-table :columns="columns" :data-source="data.mensual" bordered>
      <template #title>
        <h3 class="text-lg">{{ data.name }}</h3>
      </template>

      <template #summary>
        <a-table-summary-row>
          <a-table-summary-cell>
            <a-typography-text strong>Total</a-typography-text>
          </a-table-summary-cell>
          <a-table-summary-cell>
            <a-typography-text strong>{{ formatBRL(data.total[0]).text }}</a-typography-text>
          </a-table-summary-cell>
          <a-table-summary-cell>
            <a-typography-text strong>{{ formatBRL(data.total[1]).text }}</a-typography-text>
          </a-table-summary-cell>
          <a-table-summary-cell>
            <a-typography-text strong>{{ formatBRL(data.total[2]).text }}</a-typography-text>
          </a-table-summary-cell>
          <a-table-summary-cell>
            <a-typography-text strong>{{ formatBRL(data.total[3]).text }}</a-typography-text>
          </a-table-summary-cell>
        </a-table-summary-row>
      </template>
    </a-table>
  </div>
</template>



<style scoped></style>
