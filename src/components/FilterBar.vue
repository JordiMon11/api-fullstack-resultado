<template>
  <div class="filter-bar">
    <button
      v-for="opt in options"
      :key="opt.value"
      class="filter-btn"
      :class="{ 'filter-btn--active': modelValue === opt.value }"
      @click="$emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  modelValue: { type: String, default: '' }
})
defineEmits(['update:modelValue'])

const { t } = useI18n()

const options = [
  { value: '',       label: t('common.all') },
  { value: 'ACTIVE', label: t('badges.active') },
  { value: 'FROZEN', label: t('badges.frozen') },
  { value: 'ENDED',  label: t('badges.ended') },
]
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.filter-btn {
  background: white;
  border: 2px solid #cccccc;
  color: #333;
  padding: 8px 12px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: normal;
  font-family: Arial, sans-serif;
  cursor: pointer;
}
.filter-btn:hover { 
  border-color: #0066cc;
  color: #0066cc;
}
.filter-btn--active {
  background: #0066cc;
  border-color: #0066cc;
  color: white;
  font-weight: bold;
}
</style>
