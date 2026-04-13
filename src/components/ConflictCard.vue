<template>
  <div class="card" :class="`card--${conflict.status}`">
    <div class="card__head">
      <span class="badge" :class="`badge--${conflict.status}`">
        {{ statusLabel }}
      </span>
      <span class="card__date">{{ formatDate(conflict.startDate) }}</span>
    </div>
    <h3 class="card__title">{{ conflict.name }}</h3>
    <p class="card__desc">{{ truncate(conflict.description) }}</p>
    <div class="card__countries" v-if="conflict.countries?.length">
      <span
        v-for="country in conflict.countries"
        :key="country.id"
        class="card__flag"
        :title="country.name"
      >
        <img
          :src="`https://flagcdn.com/w20/${country.code.toLowerCase().slice(0,2)}.png`"
          :alt="country.name"
          width="20"
          height="14"
          @error="handleImageError"
        />
        <span>{{ country.name }}</span>
      </span>
    </div>
    <div class="card__actions">
      <RouterLink :to="`/conflicts/${conflict.id}`" class="card__btn card__btn--view">
        {{ $t('common.view') }} →
      </RouterLink>
      <button class="card__btn card__btn--delete" @click="$emit('delete', conflict.id)">
        {{ $t('common.delete') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  conflict: { type: Object, required: true }
})
defineEmits(['delete'])

const STATUS_LABELS = {
  'ACTIVE': t('badges.active'),
  'FROZEN': t('badges.frozen'),
  'ENDED': t('badges.ended')
}

const statusLabel = computed(() => STATUS_LABELS[props.conflict.status] ?? props.conflict.status)

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('ca-ES', { year: 'numeric', month: 'short', day: 'numeric' })
}
function truncate(text, max = 110) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + '...' : text
}

function handleImageError(e) {
  e.target.style.display = 'none'
}
</script>

<style scoped>
.card {
  background: white;
  border: 2px solid #cccccc;
  border-radius: 3px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card:hover { 
  border-color: #0066cc;
}
.card--ACTIVE { 
  border-left: 5px solid #00cc00;
}
.card--FROZEN { 
  border-left: 5px solid #0066cc;
}
.card--ENDED { 
  border-left: 5px solid #cc0000;
}

.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card__date { 
  font-size: 12px; 
  color: #999;
}
.card__title { 
  font-size: 16px; 
  font-weight: bold; 
  color: #333;
}
.card__desc { 
  font-size: 14px; 
  color: #666;
}

.card__countries {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.card__flag {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 3px 8px;
  font-size: 13px;
  color: #666;
}
.card__flag img { 
  border-radius: 1px;
}

.card__actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.card__btn {
  font-size: 13px;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 3px;
  font-family: Arial, sans-serif;
  border: none;
  cursor: pointer;
}
.card__btn--view {
  background: #e6f2ff;
  color: #0066cc;
  flex: 1;
  text-align: center;
}
.card__btn--view:hover { 
  background: #cce6ff;
}
.card__btn--delete {
  background: #ffe6e6;
  color: #cc0000;
}
.card__btn--delete:hover { 
  background: #ffcccc;
}
</style>
