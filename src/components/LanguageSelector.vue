<template>
  <div class="lang-selector">
    <button
      v-for="lang in languages"
      :key="lang"
      :class="['lang-btn', { 'lang-btn--active': currentLocale === lang }]"
      @click="changeLanguage(lang)"
    >
      {{ lang.toUpperCase() }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()
const languages = ['ca', 'en']

const currentLocale = computed(() => locale.value)

function changeLanguage(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<style scoped>
.lang-selector {
  display: flex;
  gap: 8px;
  align-items: center;
}

.lang-btn {
  background: white;
  border: 2px solid #cccccc;
  color: #333;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.lang-btn:hover {
  border-color: #0066cc;
  color: #0066cc;
}

.lang-btn--active {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}
</style>
