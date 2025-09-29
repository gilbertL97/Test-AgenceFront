<template>
  <div style="height: 600px; width: 100%;">
    <Chart type="bar" v-if="chartDataReady" :data="chartData" :options="chartOptions" />
    <div v-else class="text-center py-10">
      Carregando...
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'vue-chartjs'
import { toRef } from 'vue'
import type { UserData } from '@/types/types'
import { useDataCharts } from '@/composable/useDataCharts';

const props = defineProps<{ userDataList: UserData[] }>()

const { chartData, chartOptions, chartDataReady } = useDataCharts(toRef(props, 'userDataList'))
</script>
