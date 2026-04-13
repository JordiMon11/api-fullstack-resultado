<template>
  <div class="conflict-map" ref="mapRef" aria-label="Map" />
</template>

<script setup>
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import L from 'leaflet'

const props = defineProps({
  conflict: { type: Object, required: true }
})

const mapRef = ref(null)
let mapInstance = null
let markerLayer = null

function parseLocation(location) {
  if (!location || typeof location !== 'string') return null
  const match = location.match(/(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/)
  if (!match) return null
  return [Number(match[1]), Number(match[2])]
}

async function resolveCoordinates() {
  const coords = []
  if (props.conflict.latitude && props.conflict.longitude) {
    coords.push([props.conflict.latitude, props.conflict.longitude])
  }
  const parsed = parseLocation(props.conflict.location)
  if (parsed) {
    coords.push(parsed)
  }

  if (props.conflict.countries?.length) {
    for (const country of props.conflict.countries) {
      if (country.latitude && country.longitude) {
        coords.push([country.latitude, country.longitude])
        continue
      }
      if (!country.code) continue
      const code = country.code.toLowerCase().slice(0, 2)
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        if (!response.ok) continue
        const data = await response.json()
        const latlng = data[0]?.latlng
        if (Array.isArray(latlng) && latlng.length === 2) {
          coords.push([latlng[0], latlng[1]])
        }
      } catch {
        continue
      }
    }
  }

  return coords
}

function createMap() {
  if (!mapRef.value || mapInstance) return
  mapInstance = L.map(mapRef.value, {
    scrollWheelZoom: false,
    attributionControl: false
  }).setView([20, 0], 2)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(mapInstance)

  markerLayer = L.layerGroup().addTo(mapInstance)
}

async function updateMap() {
  if (!mapInstance) return
  markerLayer.clearLayers()
  const coords = await resolveCoordinates()
  if (!coords.length) {
    mapInstance.setView([20, 0], 2)
    return
  }
  const unique = Array.from(new Set(coords.map(([lat, lng]) => `${lat},${lng}`)))
  unique.forEach(coord => {
    const [lat, lng] = coord.split(',').map(Number)
    L.marker([lat, lng]).addTo(markerLayer)
  })
  const bounds = L.latLngBounds(coords)
  mapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 6 })
}

onMounted(() => {
  createMap()
  updateMap()
})

watch(() => props.conflict, () => updateMap(), { deep: true })

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
})
</script>

<style scoped>
.conflict-map {
  width: 100%;
  min-height: 340px;
  border: 2px solid #cccccc;
  border-radius: 3px;
}
</style>
