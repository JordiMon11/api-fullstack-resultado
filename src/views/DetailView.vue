<template>
  <div class="page">
    <RouterLink to="/conflicts" class="back-link">{{ $t('common.back') }}</RouterLink>
    <p v-if="loading" class="state-msg">{{ $t('common.loading') }}</p>
    <p v-else-if="error" class="state-msg error">{{ error }}</p>
    <div v-else-if="conflict" class="detail">
      <div class="detail__hero">
        <div class="detail__hero-top">
          <span class="badge" :class="`badge--${conflict.status}`">{{ statusLabel }}</span>
          <span class="detail__date">{{ $t('detail.start') }}: {{ formatDate(conflict.startDate) }}</span>
        </div>
        <h1 class="detail__title">{{ conflict.name }}</h1>
        <p class="detail__desc">{{ conflict.description }}</p>
      </div>
      <section class="detail__section">
        <h2 class="detail__section-title">{{ $t('detail.involvedCountries') }}</h2>
        <div v-if="conflict.countries?.length" class="countries-list">
          <div
            v-for="country in conflict.countries"
            :key="country.id"
            class="country-chip"
          >
            <img
              :src="`https://flagcdn.com/w40/${country.code.toLowerCase().slice(0,2)}.png`"
              :alt="country.name"
              width="28"
              height="20"
              class="country-flag"
              @error="handleFlagError"
            />
            <span class="country-name">{{ country.name }}</span>
            <span class="country-code">{{ country.code }}</span>
          </div>
        </div>
        <p v-else class="empty-msg">{{ $t('detail.noCountries') }}</p>
      </section>
      <section class="detail__section">
        <h2 class="detail__section-title">{{ $t('detail.highlights') }}</h2>
        <p v-if="eventsLoading" class="empty-msg">{{ $t('common.loading') }}</p>
        <div v-else-if="events.length" class="events-list">
          <div v-for="ev in events" :key="ev.id" class="event-item">
            <div class="event-item__date">{{ formatDate(ev.eventDate) }}</div>
            <div class="event-item__body">
              <p class="event-item__location">{{ ev.location }}</p>
              <p class="event-item__desc">{{ ev.description }}</p>
            </div>
          </div>
        </div>
        <p v-else class="empty-msg">{{ $t('detail.noEvents') }}</p>
      </section>
      <section class="detail__section">
        <h2 class="detail__section-title">{{ $t('detail.mapTitle') }}</h2>
        <ConflictMap :conflict="conflict" />
      </section>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useConflictsStore } from '../stores/conflicts.js'
import ConflictMap from '../components/ConflictMap.vue'

const { t } = useI18n()
const route   = useRoute()
const store   = useConflictsStore()

const conflict     = ref(null)
const events       = ref([])
const loading      = ref(true)
const eventsLoading = ref(true)
const error        = ref(null)

const STATUS_LABELS = {
  'ACTIVE': t('badges.active'),
  'FROZEN': t('badges.frozen'),
  'ENDED': t('badges.ended')
}

const statusLabel = computed(() => STATUS_LABELS[conflict.value?.status] ?? '')

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

function handleFlagError(e) {
  e.target.style.display = 'none'
}

onMounted(async () => {
  try {
    conflict.value = await store.fetchById(route.params.id)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }

  try {
    events.value = await store.fetchEventsByConflict(route.params.id)
  } finally {
    eventsLoading.value = false
  }
})
</script>

<style scoped>
.back-link {
  display: inline-block;
  color: #0066cc;
  font-size: 14px;
  margin-bottom: 20px;
}
.back-link:hover { 
  color: #0052a3;
}

.detail__hero {
  background: white;
  border: 2px solid #cccccc;
  border-radius: 3px;
  padding: 20px;
  margin-bottom: 20px;
}
.detail__hero-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.detail__date { 
  font-size: 13px; 
  color: #999;
}
.detail__title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}
.detail__desc { 
  color: #666; 
  font-size: 14px;
}

.detail__section { 
  margin-bottom: 20px;
}
.detail__section-title {
  font-size: 13px;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.countries-list { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 8px;
}
.country-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  border: 2px solid #cccccc;
  border-radius: 3px;
  padding: 8px 12px;
  font-size: 13px;
  color: #666;
}
.country-chip img { 
  border-radius: 2px;
}
.country-code {
  font-size: 12px;
  color: #999;
  background: #e6e6e6;
  padding: 1px 5px;
  border-radius: 2px;
}

.events-list { 
  display: flex; 
  flex-direction: column; 
  gap: 10px;
}
.event-item {
  display: flex;
  gap: 15px;
  background: white;
  border: 2px solid #cccccc;
  border-radius: 3px;
  padding: 12px;
}
.event-item__date {
  font-size: 12px;
  font-weight: bold;
  color: #0066cc;
  white-space: nowrap;
  min-width: 80px;
}
.event-item__location { 
  font-size: 13px; 
  color: #666; 
  margin-bottom: 3px;
}
.event-item__desc { 
  font-size: 13px; 
  color: #666;
}

.empty-msg { 
  color: #999; 
  font-size: 14px;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid #cccccc;
  font-size: 13px;
  font-weight: bold;
  border-radius: 3px;
}
.badge--ACTIVE { 
  background: #e6ffe6; 
  color: #006600;
}
.badge--FROZEN { 
  background: #e6f2ff; 
  color: #0033cc;
}
.badge--ENDED { 
  background: #ffe6e6; 
  color: #cc0000;
}
</style>
