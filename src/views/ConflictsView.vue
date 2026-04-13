<template>
  <div class="page">
    <div class="list-header">
      <h1 class="list-title">{{ $t('conflicts.title') }}</h1>
      <RouterLink to="/conflicts/new" class="btn-new">{{ $t('conflicts.newButton') }}</RouterLink>
    </div>

    <div class="controls">
      <SearchBar v-model="search" :placeholder="t('common.search')" />
      <FilterBar v-model="statusFilter" />
    </div>
    <p class="result-count" v-if="!store.loading">
      {{ tc('conflicts.resultCount', filtered.length) }}
    </p>
    <p v-if="store.loading" class="state-msg">{{ t('common.loading') }}</p>
    <p v-else-if="store.error" class="state-msg error">{{ store.error }}</p>
    <p v-else-if="filtered.length === 0" class="state-msg">
      {{ t('conflicts.noResults') }}
    </p>
    <div v-else class="cards-grid">
      <ConflictCard
        v-for="c in filtered"
        :key="c.id"
        :conflict="c"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useConflictsStore } from '../stores/conflicts.js'
import ConflictCard from '../components/ConflictCard.vue'
import SearchBar    from '../components/SearchBar.vue'
import FilterBar    from '../components/FilterBar.vue'

const { t, tc } = useI18n()
const store        = useConflictsStore()
const search       = ref('')
const statusFilter = ref('')

onMounted(() => store.fetchConflicts())

const filtered = computed(() => {
  return store.conflicts.filter(c => {
    const matchName   = c.name.toLowerCase().includes(search.value.toLowerCase())
    const matchStatus = statusFilter.value === '' || c.status === statusFilter.value
    return matchName && matchStatus
  })
})

async function handleDelete(id) {
  if (confirm(t('form.deleteConfirm'))) {
    await store.deleteConflict(id)
  }
}
</script>

<style scoped>
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.list-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}
.btn-new {
  background: #0066cc;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  font-size: 14px;
}
.btn-new:hover { 
  background: #0052a3;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}
.result-count {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}
</style>
