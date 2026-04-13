<template>
  <div>
    <nav class="navbar">
      <div class="navbar__inner">
        <RouterLink to="/" class="navbar__brand">
          <span class="navbar__dot"></span>
          Global Conflict Monitor
        </RouterLink>
        <div class="navbar__center">
          <RouterLink to="/" class="navbar__link">{{ $t('common.home') }}</RouterLink>
          <RouterLink to="/conflicts" class="navbar__link">{{ $t('common.conflicts') }}</RouterLink>
        </div>
        <div class="navbar__right">
          <LanguageSelector />
          <RouterLink to="/conflicts/new" class="navbar__btn">+ {{ $t('common.newConflict') }}</RouterLink>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LanguageSelector from './components/LanguageSelector.vue'
</script>

<style scoped>
.navbar {
  background: #f0f0f0;
  border-bottom: 2px solid #cccccc;
  position: sticky;
  top: 0;
  z-index: 100;
}
.navbar__inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.navbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  font-size: 18px;
  color: #333333;
  min-width: fit-content;
}
.navbar__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #cc0000;
}
.navbar__center {
  display: flex;
  gap: 20px;
  flex: 1;
}
.navbar__right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.navbar__link {
  color: #333333;
  font-size: 14px;
  font-weight: normal;
}
.navbar__link:hover {
  color: #0066cc;
}
.navbar__link.router-link-active { 
  color: #0066cc;
  font-weight: bold;
}
.navbar__btn {
  background: #0066cc;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  min-width: fit-content;
}
.navbar__btn:hover { 
  background: #0052a3;
}
</style>
