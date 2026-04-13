<template>
  <div>
    <nav class="navbar">
      <div class="navbar__inner">
        <RouterLink to="/" class="navbar__brand">
          <span class="navbar__dot"></span>
          Global Conflict Monitor
        </RouterLink>
        <div class="navbar__links">
          <RouterLink to="/"          class="navbar__link">Inici</RouterLink>
          <RouterLink to="/conflicts" class="navbar__link">Conflictes</RouterLink>
          <RouterLink to="/conflicts/new" class="navbar__btn">+ Nou</RouterLink>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.navbar {
  background: #161b27;
  border-bottom: 1px solid #1e2d40;
  position: sticky;
  top: 0;
  z-index: 100;
}
.navbar__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1rem;
  color: #f1f5f9;
  letter-spacing: -0.01em;
}
.navbar__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 8px #ef4444aa;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.navbar__links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.navbar__link {
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}
.navbar__link:hover,
.navbar__link.router-link-active { color: #f1f5f9; }
.navbar__btn {
  background: #1d4ed8;
  color: #fff;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.2s;
}
.navbar__btn:hover { background: #2563eb; }
</style>
