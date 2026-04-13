<template>
  <div class="stats-card">
    <p class="stats-card__label">{{ title }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true }
})
</script>

<style scoped>
.stats-card {
  background: white;
  border: 2px solid #cccccc;
  border-radius: 3px;
  padding: 15px;
}
.stats-card__label {
  font-size: 13px;
  font-weight: bold;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 8px;
}
</style>
