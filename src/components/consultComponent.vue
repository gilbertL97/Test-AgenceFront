<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import TransferCutsom from './transferCutsom.vue';
import {
  ProjectOutlined,
  BarChartOutlined,
  PieChartOutlined
} from '@ant-design/icons-vue';

import type { Consultor } from '@/types/types';
type RangeValue = [Dayjs, Dayjs];
const dateRange = ref<RangeValue>();
const selectedConsultors = ref<string[]>([]);
const props = defineProps<{
  isLoading: boolean;
  data: Consultor[];
}>();
const emits = defineEmits(['SelectedConsultors', 'DateRange', 'Action']);
const verifiConsultors = (selected: number[]) => {
  selected.map((idx) =>
    selectedConsultors.value.push(props.data[idx]?.co_usuario));
  //emits('SelectedConsultors', coUsuarios);
}
const handleAction = (action: string) => {
  emits('Action', {
    action,
    consultors: selectedConsultors.value,
    dateRange: dateRange.value
  });
};
const isButtonsEnabled = computed(() => {
  return (
    selectedConsultors.value.length > 0 &&
    dateRange.value &&
    dateRange.value[0] &&
    dateRange.value[1]
  );
});
</script>

<template>
  <div class="ml-5">
    <div class="ml-15">
      <a-range-picker v-model:value="dateRange" picker="month" format="MM/YYYY" valueFormat="YYYY-MM" />
    </div>
    <div class="flex mt-2 items-center justify-center">
      <TransferCutsom :is-loading="isLoading" :data="data" @selected-consultors="verifiConsultors" />
      <div class="flex flex-col ml-10 gap-8 ">
        <a-button class="p-2" :disabled="!isButtonsEnabled" @click="handleAction('relatorio')"> <template #icon>
            <ProjectOutlined class="text-lg" />
          </template>Relatório</a-button>
        <a-button class="py-2 px-4" :disabled="!isButtonsEnabled" @click="handleAction('grafico')"><template #icon>
            <BarChartOutlined class="text-lg " />
          </template>Gráfico</a-button>
        <a-button class="py-2 px-4" :disabled="!isButtonsEnabled" @click="handleAction('pizza')"><template #icon>
            <PieChartOutlined class="text-lg " />
          </template>Pizza</a-button>
      </div>
    </div>
  </div>
</template>


<style scoped></style>
