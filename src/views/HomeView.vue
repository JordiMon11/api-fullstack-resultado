<template>
  <div class="page">
    <div class="hero">
      <h1 class="hero__title">{{ $t('home.title') }}</h1>
      <p class="hero__sub">{{ $t('home.subtitle') }}</p>
      <RouterLink to="/conflicts" class="hero__cta">{{ $t('home.explore') }}</RouterLink>
    </div>
    <div v-if="!store.loading" class="stats-grid">
      <StatsCard :title="$t('home.totalConflicts')">
        <p class="stat-num">{{ store.conflicts.length }}</p>
      </StatsCard>

      <StatsCard :title="$t('home.activeConflicts')">
        <p class="stat-num stat-num--active">{{ activeCount }}</p>
      </StatsCard>

      <StatsCard :title="$t('home.frozen')">
        <p class="stat-num stat-num--frozen">{{ frozenCount }}</p>
      </StatsCard>

      <StatsCard :title="$t('home.ended')">
        <p class="stat-num stat-num--ended">{{ endedCount }}</p>
      </StatsCard>
    </div>
    <div v-if="!store.loading && store.conflicts.length > 0" class="charts-section">
      <ChartCard
        type="doughnut"
        :title="$t('home.byStatus')"
        :labels="chartLabels"
        :data="chartData"
        :backgroundColor="['#00cc00', '#0066cc', '#cc0000']"
      />
    </div>
    <div class="section">
      <h2 class="section__title">{{ $t('home.recentActive') }}</h2>
      <p v-if="store.loading" class="state-msg">{{ $t('common.loading') }}</p>
      <p v-else-if="store.error" class="state-msg error">{{ store.error }}</p>
      <div v-else class="cards-grid">
        <ConflictCard
          v-for="c in activeConflicts"
          :key="c.id"
          :conflict="c"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useConflictsStore } from '../stores/conflicts.js'
import StatsCard    from '../components/StatsCard.vue'
import ConflictCard from '../components/ConflictCard.vue'
import ChartCard   from '../components/ChartCard.vue'

const { t } = useI18n()
const store = useConflictsStore()
onMounted(() => store.fetchConflicts())

const activeCount   = computed(() => store.conflicts.filter(c => c.status === 'ACTIVE').length)
const frozenCount   = computed(() => store.conflicts.filter(c => c.status === 'FROZEN').length)
const endedCount    = computed(() => store.conflicts.filter(c => c.status === 'ENDED').length)
const activeConflicts = computed(() => store.conflicts.filter(c => c.status === 'ACTIVE'))

const chartLabels = computed(() => [
  t('badges.active'),
  t('badges.frozen'),
  t('badges.ended')
])

const chartData = computed(() => [
  activeCount.value,
  frozenCount.value,
  endedCount.value
])

async function handleDelete(id) {
  if (confirm(t('form.deleteConfirm'))) {
    await store.deleteConflict(id)
  }
}
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 40px 20px 30px;
}
.hero__title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}
.hero__sub {
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
}
.hero__cta {
  background: #0066cc;
  color: white;
  padding: 10px 20px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 14px;
}
.hero__cta:hover { 
  background: #0052a3;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}
.stat-num {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}
.stat-num--active { 
  color: #00cc00;
}
.stat-num--frozen { 
  color: #0066cc;
}
.stat-num--ended { 
  color: #cc0000;
}

.charts-section {
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px 0;
}

.section__title {
  font-size: 14px;
  font-weight: bold;
  color: #666;
  margin-bottom: 15px;
  text-transform: uppercase;
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}
</style>
