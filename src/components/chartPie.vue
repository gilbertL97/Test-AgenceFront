<script setup lang="ts">
// Chart.js setup
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import type { TooltipItem } from 'chart.js'

// Tipos
import type { UserData } from '@/types/types'
import { formatBRL } from '@/helpers/helper'

// Registrar elementos de Chart.js (obligatorio en v3+)
ChartJS.register(ArcElement, Tooltip, Legend)


const props = defineProps<{ userDataList: UserData[] }>()


// Total general (solo para cálculos internos)
const totalGeneral = computed(() => {
  return props.userDataList
    .filter(user =>
      Array.isArray(user.total) &&
      user.total.length > 0 &&
      typeof user.total[0] === 'number' &&
      !isNaN(user.total[0])
    )
    .reduce((sum, user) => sum + user.total[0], 0)
})

// Datos procesados
const rows = computed(() => {
  if (totalGeneral.value <= 0) return []

  return props.userDataList
    .filter(user =>
      Array.isArray(user.total) &&
      user.total.length > 0 &&
      typeof user.total[0] === 'number' &&
      !isNaN(user.total[0]) &&
      user.total[0] > 0
    )
    .map(user => ({
      name: user.name,
      total0: user.total[0]
    }))
    .sort((a, b) => b.total0 - a.total0)
})

const hasData = computed(() => rows.value.length > 0)

// Colores dinámicos
function genColors(count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const hue = Math.round((i * 360) / count) % 360
    return `hsl(${hue}, 70%, 60%)`
  })
}

// Datos del gráfico
const chartData = computed(() => ({
  labels: rows.value.map(r => r.name),
  datasets: [
    {
      data: rows.value.map(r => r.total0),
      backgroundColor: genColors(rows.value.length)
    }
  ]
}))

// Opciones del gráfico
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text:
        totalGeneral.value > 0
          ? `RECEITA LÍQUIDA por consultores Total Geral: R$${totalGeneral.value}`
          : 'RECEITA LÍQUIDA por consultores Sem dados',
      font: { size: 18 },
      padding: { top: 10, bottom: 20 }
    },
    legend: { position: 'right' as const },
    tooltip: {
      callbacks: {
        label(ctx: TooltipItem<'pie'>) {
          const dataset = ctx.dataset
          const total = (dataset.data as number[]).reduce((a, b) => a + b, 0)
          const value = ctx.parsed as number
          const pct = ((value / total) * 100).toFixed(2)
          return `${ctx.label}: ${formatBRL(value).text} (${pct} %)`
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <div v-if="hasData" class="chart-box">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
    <div v-else class="info">Sin datos</div>
  </div>
</template>
