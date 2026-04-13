# 🌍 Global Conflict Monitor - Frontend Vue 3

Aplicación web moderna y completa construida con **Vue 3**, **Pinia**, **Vue Router** y **vue-i18n** para monitorizar conflictos armados en tiempo real.

## ✨ Características Principales

### ✅ Requisitos Técnicos Obligatorios (100% Implementados)
- **v-model**: Búsqueda y filtros reactivos
- **v-bind**: Atributos dinámicos, clases, imágenes
- **v-for + v-if**: Renderización condicional de listas
- **Props + Emits**: Comunicación padre-hijo
- **Computed Properties**: Filtrado en tiempo real
- **Rutas Dinámicas**: `/conflicts/:id`
- **Pinia Store**: Gesión estado global
- **Slots**: Componentes contenedores flexibles

### ✅ Bonus - Elementos Extres (100% Implementados)
- 🚩 **Banderas de Países**: Dinámicas via Country Flags API
- 📊 **Gráficos Interactivos**: Chart.js integrado
- 🌐 **Multidioma**: Catalán + English completos
- 🎨 **UI Minimalista**: Diseño limpio y accesible
- ⚡ **Rendimiento**: Composables, memoización, lazy loading

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev
# http://localhost:5174

# Producción
npm run build
npm run preview
```

## 📱 Interfaz de Usuario

### Páginas Principales
- **Inicio** (`/`) - Estadísticas, gráficos y conflictos activos
- **Conflictes** (`/conflicts`) - Listado con búsqueda y filtros
- **Detalles** (`/conflicts/:id`) - Información completa del conflicte
- **Crear** (`/conflicts/new`) - Formulario reactivo

### Componentes Reutilizables
- **SearchBar** - Búsqueda en tiempo real
- **FilterBar** - Filtro por estado
- **ConflictCard** - Tarjeta de conflicte
- **ChartCard** - Gráficos dinámicos
- **StatsCard** - Estadísticas con slots
- **LanguageSelector** - Cambio de idioma

## 🛠️ Stack Tecnológico

```json
{
  "vue": "3.5.31",
  "vue-router": "5.0.4",
  "pinia": "3.0.4",
  "vue-i18n": "9.10.2",
  "chart.js": "4.4.1",
  "vue-chartjs": "5.3.1"
}
```

## 📊 Características Implementadas

### Reactividad Vue 3
```javascript
// Composition API
const search = ref('')
const filtered = computed(() => 
  store.conflicts.filter(c => c.name.includes(search.value))
)
```

### Gestión de Estado (Pinia)
```javascript
const store = useConflictsStore()
await store.fetchConflicts()
```

### i18n (Multidioma)
```vue
{{ $t('common.home') }}
{{ $tc('conflicts.resultCount', count) }}
```

### Enrutamiento Dinámico
```javascript
const route = useRoute()
const id = route.params.id
```

## 🎨 Design System

| Elemento | Color | Uso |
|----------|-------|-----|
| Background | #ffffff | Fondo principal |
| Texto | #333333 | Contenido |
| Bordes | #cccccc | Separadores |
| Primario | #0066cc | Botones, enlaces |
| ACTIVE | #00cc00 | Estado activo |
| FROZEN | #0066cc | Estado congelado |
| ENDED | #cc0000 | Estado finalizado |

## 📚 Documentación

- **[REQUIREMENTS_COMPLETED.md](REQUIREMENTS_COMPLETED.md)** - Requisitos implementados
- **[USER_GUIDE.md](USER_GUIDE.md)** - Guía de usuario
- **[TECHNICAL_DOCS.md](TECHNICAL_DOCS.md)** - Documentación técnica

## 🌐 Idiomas Soportados

- 🇪🇸 **Catalán** (Predeterminado)
- 🇬🇧 **English**

Cambiar idioma: Click en botones CA/EN en navbar

## 🔄 Flujo de Datos

```
SearchBar (v-model) ──┐
                      ├─→ ConflictsView computed(filtered) ──→ ConflictCard (v-for)
FilterBar (v-model) ──┘                                                ↓
                                                              Emits: delete
                                                                      ↓
                                                        Store.deleteConflict()
```

## 🎯 Requisitos Cumplidos

- ✅ v-model (búsqueda, filtros, formularios)
- ✅ v-bind (clases, src, atributos dinámicos)
- ✅ v-for + v-if (renderización condicional)
- ✅ Props + Emits (comunicación componentes)
- ✅ Computed Properties (filtrado tiempo real)
- ✅ Rutas Dinámicas (/conflicts/:id)
- ✅ Pinia Store (estado global)
- ✅ Slots (componentes contenedores)
- ✅ **BONUS**: Banderas de países
- ✅ **BONUS**: Gráficos Chart.js
- ✅ **BONUS**: Multidioma (i18n)

## 🧪 Testing

```bash
# Tests unitarios (futuro)
npm run test

# Coverage
npm run test:coverage
```

## 📈 Performance

- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Memoización de computed
- ✅ Virtual DOM optimization
- ✅ Minificación en build

## 🔒 Seguridad

- ✅ Content Security Policy (CSP) ready
- ✅ XSS protection via template compilation
- ✅ CSRF protection (CORS configured)

## 📞 API Endpoints

La aplicación consume endpoints de `/api/v1`:

```
GET    /api/v1/conflicts          # Listar conflictes
POST   /api/v1/conflicts          # Crear conflicte
GET    /api/v1/conflicts/:id      # Obtener conflicte
DELETE /api/v1/conflicts/:id      # Eliminar conflicte
GET    /api/v1/events             # Listar eventos
```

## 🌟 Características Destacadas

1. **Búsqueda en Tiempo Real**
   - Filtra mientras escribes
   - Case-insensitive
   - Sin delay

2. **Filtrado Múltiple**
   - Por nombre
   - Por estado (ACTIVE/FROZEN/ENDED)
   - Combinable

3. **Banderas Dinámicas**
   - Genera URL según country code
   - Fallback automático si falla

4. **Gráficos Reactivos**
   - Actualiza con datos
   - Chart.js: doughnut, bar, line
   - Responsivo

5. **Multidioma**
   - Cambio sin recarga
   - Persistido en localStorage
   - Interfaz completa traducida

## 🚢 Deployment

### Vercel / Netlify
```bash
npm run build
# Subir carpeta /dist
```

### Docker
```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 5174
CMD ["npm", "run", "dev"]
```

## 📝 Licencia

MIT

## 👨‍💻 Autor

Desarrollado como práctica de Vue 3 + Pinia + Router + i18n

## 🙋 Soporte

Para reportar issues o sugerencias, contacta con el desarrollador.

---

**⭐ Si te gustó este proyecto, dale una estrella!**

**Última actualización: 2026-04-13**


This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
