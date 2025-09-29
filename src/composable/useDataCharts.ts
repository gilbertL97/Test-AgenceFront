// composables/useDataCharts.ts
import { ref, watch, computed, type MaybeRef, type Ref } from 'vue'
import type { UserData } from '@/types/types'
import { formatBRL, getMonthName } from '@/helpers/helper'
import type { ChartData, ChartOptions } from 'chart.js'

export function useDataCharts(userDataList: MaybeRef<UserData[]>) {
  const chartData = ref<ChartData<'bar' | 'line'>>({ labels: [], datasets: [] })
  const chartDataReady = ref(false)

  const buildChartData = () => {
    const list = Array.isArray(userDataList) ? userDataList : userDataList.value

    if (!list || list.length === 0) {
      chartData.value = { labels: [], datasets: [] }
      chartDataReady.value = false
      return
    }

    // --- Paso 1: Meses únicos en orden de aparición ---
    const seen = new Set<string>()
    const monthLabels: string[] = []
    const monthKeys: string[] = []

    for (const user of list) {
      if (!user.mensual) continue
      for (const m of user.mensual) {
        const key = `${m.ano}-${String(m.mes).padStart(2, '0')}`
        if (!seen.has(key)) {
          seen.add(key)
          monthKeys.push(key)
          monthLabels.push(`${getMonthName(m.mes, true)} ${m.ano}`)
        }
      }
    }

    // --- Paso 2: Mapear usuarios activos por mes (solo para saber quiénes trabajaron) ---
    const monthToUsers = new Map<string, string[]>() // key -> [nombres de usuarios]
    for (const key of monthKeys) {
      monthToUsers.set(key, [])
    }

    // También extraemos el salario por usuario (del primer mes, ya que es constante)
    const userSalaryMap = new Map<string, number>()

    for (const user of list) {
      if (!user.mensual || user.mensual.length === 0) continue

      // ✅ Tomamos el salario del primer registro (es repetido)
      const salario = user.mensual[0].salario
      userSalaryMap.set(user.name, salario)

      // Registrar al usuario en cada mes que trabajó
      for (const m of user.mensual) {
        const key = `${m.ano}-${String(m.mes).padStart(2, '0')}`
        if (monthToUsers.has(key)) {
          monthToUsers.get(key)!.push(user.name)
        }
      }
    }

    // --- Paso 3: Calcular promedio de salario por mes ---
    const avgSalaryData = monthKeys.map(key => {
      const usersInMonth = monthToUsers.get(key) || []
      if (usersInMonth.length === 0) return 0

      const total = usersInMonth.reduce((sum, userName) => {
        return sum + (userSalaryMap.get(userName) ?? 0)
      }, 0)

      return total / usersInMonth.length
    })

    // --- Paso 4: Colores por usuario ---
    const userColors = new Map<string, string>()
    const getColorForUser = (name: string): string => {
      if (userColors.has(name)) return userColors.get(name)!
      let hash = 0
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
      }
      const hue = Math.abs(hash) % 360
      return `hsla(${hue}, 70%, 60%, 0.85)`
    }

    // --- Paso 5: Datasets de BARRAS (receita_liquida) ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const datasets: any[] = []

    for (const user of list) {
      if (!user.mensual || user.mensual.length === 0) continue

      const receitaMap = new Map<string, number>()
      for (const m of user.mensual) {
        const key = `${m.ano}-${String(m.mes).padStart(2, '0')}`
        receitaMap.set(key, m.receita_liquida)
      }

      const data = monthKeys.map(key => receitaMap.get(key) ?? 0)
      const color = getColorForUser(user.name)

      datasets.push({
        type: 'bar',
        label: user.name,
        order: 1, // ← detrás de la línea
        data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        barThickness: 20
      })
    }

    // --- Paso 6: Dataset de LÍNEA (promedio salarial) ---
    datasets.push({
      type: 'line',
      label: 'Média Salarial do Mês',
      order: 0, // ← adelante
      data: avgSalaryData,
      borderColor: '#2c3e50',
      backgroundColor: '#2c3e50',
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: '#2c3e50',
      pointHoverRadius: 6,
      fill: false,
      tension: 0.3
    })

    chartData.value = { labels: monthLabels, datasets }
    chartDataReady.value = true
  }

  watch(
    () => (Array.isArray(userDataList) ? userDataList : userDataList.value),
    () => buildChartData(),
    { immediate: true, deep: true }
  )

  const chartOptions = computed<ChartOptions<'bar' | 'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Receita Líquida e Média Salarial por Mês',
        font: { size: 16 }
      },
      legend: { position: 'top' as const },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed.y as number
            if (ctx.dataset.label === 'Média Salarial do Mês') {
              return `Média Salarial: ${formatBRL(value).text}`
            }
            return `${ctx.dataset.label}: Receita ${formatBRL(value).text}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatBRL(Number(value)).text
        },
        title: { display: true, text: 'Valores (R$)' }
      },
      x: {
        title: { display: true, text: 'Mês' }
      }
    }
  }))

  return {
    chartData: chartData as Ref<ChartData<'bar' | 'line'>>,
    chartOptions,
    chartDataReady
  }
}
