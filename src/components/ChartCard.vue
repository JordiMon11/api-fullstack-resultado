<template>
  <div class="chart-card">
    <h3 class="chart-title">{{ title }}</h3>
    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  type: { type: String, default: 'doughnut' },
  title: { type: String, required: true },
  labels: { type: Array, required: true },
  data: { type: Array, required: true },
  backgroundColor: {
    type: Array,
    default: () => ['#00cc00', '#0066cc', '#cc0000', '#ff9900', '#9900cc']
  }
})

const chartRef = ref(null)
let chartInstance = null

function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
}

function createChart() {
  if (!chartRef.value) return
  
  destroyChart()
  
  chartInstance = new Chart(chartRef.value, {
    type: props.type,
    data: {
      labels: props.labels,
      datasets: [{
        label: props.title,
        data: props.data,
        backgroundColor: props.backgroundColor,
        borderColor: '#ffffff',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: props.type === 'doughnut' ? 'bottom' : 'top',
        }
      }
    }
  })
}

watch(() => [props.data, props.labels], () => {
  createChart()
}, { deep: true })

onMounted(() => createChart())
</script>

<style scoped>
.chart-card {
  background: white;
  border: 2px solid #cccccc;
  border-radius: 3px;
  padding: 20px;
  margin: 15px 0;
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.chart-container {
  position: relative;
  height: 300px;
}
</style>
