import { defineStore } from 'pinia'
import { ref } from 'vue'

const BASE = '/api/v1'

export const useConflictsStore = defineStore('conflicts', () => {
  const conflicts = ref([])
  const loading   = ref(false)
  const error     = ref(null)

  async function fetchConflicts() {
    loading.value = true
    error.value   = null
    try {
      const res = await fetch(`${BASE}/conflicts`)
      if (!res.ok) throw new Error('Error al carregar els conflictes')
      conflicts.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id) {
    const res = await fetch(`${BASE}/conflicts/${id}`)
    if (!res.ok) throw new Error('Conflicte no trobat')
    return await res.json()
  }

  async function createConflict(data) {
    const res = await fetch(`${BASE}/conflicts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Error al crear el conflicte')
    const created = await res.json()
    conflicts.value.push(created)
    return created
  }

  async function deleteConflict(id) {
    const res = await fetch(`${BASE}/conflicts/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Error al eliminar')
    conflicts.value = conflicts.value.filter(c => c.id !== id)
  }

  async function fetchEventsByConflict(conflictId) {
    const res = await fetch(`${BASE}/events`)
    if (!res.ok) return []
    const all = await res.json()
    return all.filter(e => e.conflictId === Number(conflictId))
  }

  async function fetchCountries() {
    await fetchConflicts()
    const map = new Map()
    conflicts.value.forEach(c => {
      c.countries?.forEach(country => map.set(country.id, country))
    })
    return Array.from(map.values())
  }

  return {
    conflicts, loading, error,
    fetchConflicts, fetchById, createConflict, deleteConflict,
    fetchEventsByConflict, fetchCountries
  }
})
