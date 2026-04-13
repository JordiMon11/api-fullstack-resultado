import { createRouter, createWebHistory } from 'vue-router'
import HomeView      from '../views/HomeView.vue'
import ConflictsView from '../views/ConflictsView.vue'
import DetailView    from '../views/DetailView.vue'
import CreateView    from '../views/CreateView.vue'

const routes = [
  { path: '/',               component: HomeView,      name: 'home' },
  { path: '/conflicts',      component: ConflictsView, name: 'conflicts' },
  { path: '/conflicts/new',  component: CreateView,    name: 'createConflict' },
  { path: '/conflicts/:id',  component: DetailView,    name: 'detailConflict' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})
