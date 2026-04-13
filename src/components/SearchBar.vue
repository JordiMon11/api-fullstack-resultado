<template>
  <div class="search-wrap">
    <span class="search-icon">S</span>
    <input
      class="search-input"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button
      v-if="modelValue"
      class="search-clear"
      @click="$emit('update:modelValue', '')"
    >x</button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 10px;
  font-size: 16px;
  pointer-events: none;
}
.search-input {
  width: 100%;
  background: white;
  border: 2px solid #cccccc;
  border-radius: 3px;
  padding: 12px 35px;
  color: #333;
  font-size: 16px;
  font-family: Arial, sans-serif;
  outline: none;
}
.search-input:focus { 
  border-color: #0066cc;
}
.search-input::placeholder { 
  color: #999;
}
.search-clear {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #999;
  font-size: 16px;
  padding: 2px 4px;
  cursor: pointer;
}
.search-clear:hover { 
  color: #333;
}
</style>
