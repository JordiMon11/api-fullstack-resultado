<template>
  <div class="page">
    <RouterLink to="/conflicts" class="back-link">{{ $t('common.back') }}</RouterLink>
    <h1 class="form-title">{{ $t('common.newConflict') }}</h1>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="form__group">
        <label class="form__label">{{ $t('form.conflictName') }} *</label>
        <input
          class="form__input"
          v-model="form.name"
          type="text"
          placeholder="Ex: Guerra del Sudan"
          required
        />
      </div>
      <div class="form__group">
        <label class="form__label">{{ $t('form.startDate') }} *</label>
        <input
          class="form__input"
          v-model="form.startDate"
          type="date"
          required
        />
      </div>
      <div class="form__group">
        <label class="form__label">{{ $t('form.status') }} *</label>
        <select class="form__input form__select" v-model="form.status" required>
          <option value="" disabled>{{ $t('form.selectStatus') }}</option>
          <option v-for="s in statuses" :key="s.value" :value="s.value">
            {{ s.label }}
          </option>
        </select>
      </div>
      <div class="form__group">
        <label class="form__label">{{ $t('form.description') }}</label>
        <textarea
          class="form__input form__textarea"
          v-model="form.description"
          :placeholder="$t('form.description')"
          rows="4"
        ></textarea>
      </div>
      <p v-if="error" class="form__error">{{ error }}</p>
      <div class="form__actions">
        <RouterLink to="/conflicts" class="form__btn form__btn--cancel">{{ $t('common.cancel') }}</RouterLink>
        <button class="form__btn form__btn--submit" type="submit" :disabled="submitting">
          {{ submitting ? 'Creant...' : $t('common.create') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useConflictsStore } from '../stores/conflicts.js'

const { t } = useI18n()
const store    = useConflictsStore()
const router   = useRouter()
const submitting = ref(false)
const error    = ref(null)

const statuses = [
  { value: 'ACTIVE', label: t('badges.active') },
  { value: 'FROZEN', label: t('badges.frozen') },
  { value: 'ENDED',  label: t('badges.ended') },
]

const form = reactive({
  name:        '',
  startDate:   '',
  status:      '',
  description: '',
  countryIds:  []
})

async function handleSubmit() {
  submitting.value = true
  error.value      = null
  try {
    const created = await store.createConflict({
      name:        form.name,
      startDate:   form.startDate,
      status:      form.status,
      description: form.description,
      countryIds:  []
    })
    router.push(`/conflicts/${created.id}`)
  } catch (e) {
    error.value = e.message
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.back-link {
  display: inline-block;
  color: #0066cc;
  font-size: 14px;
  margin-bottom: 20px;
}
.back-link:hover { 
  color: #0052a3;
}
.form-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}
.form {
  background: white;
  border: 2px solid #cccccc;
  border-radius: 3px;
  padding: 20px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.form__group { 
  display: flex; 
  flex-direction: column; 
  gap: 5px;
}
.form__label { 
  font-size: 14px; 
  font-weight: bold; 
  color: #333;
}
.form__input {
  background: white;
  border: 2px solid #cccccc;
  border-radius: 3px;
  padding: 10px;
  color: #333;
  font-size: 14px;
  font-family: Arial, sans-serif;
  outline: none;
}
.form__input:focus { 
  border-color: #0066cc;
}
.form__select { 
  cursor: pointer;
}
.form__select option { 
  background: white;
}
.form__textarea { 
  resize: vertical; 
  min-height: 100px;
}
.form__error {
  color: #cc0000;
  font-size: 14px;
  background: #ffe6e6;
  padding: 10px;
  border-radius: 3px;
}
.form__actions { 
  display: flex; 
  gap: 10px; 
  justify-content: flex-end;
}
.form__btn {
  padding: 10px 15px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  border: none;
  cursor: pointer;
}
.form__btn--cancel {
  background: #f0f0f0;
  color: #666;
}
.form__btn--cancel:hover { 
  background: #e0e0e0;
}
.form__btn--submit {
  background: #0066cc;
  color: white;
}
.form__btn--submit:hover:not(:disabled) { 
  background: #0052a3;
}
.form__btn--submit:disabled { 
  opacity: 0.5; 
  cursor: not-allowed;
}
</style>
