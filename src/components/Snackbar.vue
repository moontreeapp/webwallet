<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { fadeDuration, slideDuration } from '@/utils/animationUtils'
import { useSnackbarStore } from '@/stores/useSnackbarStore'

export default defineComponent({
  name: 'Snackbar',
  setup() {
    onMounted(() => {
      // set the CSS variable
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })

    const snackbarStore = useSnackbarStore()
    const showComponent = computed(() => snackbarStore.showComponent)
    const isFaded = computed(() => {
      if (snackbarStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (snackbarStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })
    const title = computed(() => {
      return `${snackbarStore.title}:`
    })
    const message = computed(() => snackbarStore.message)

    return {
      showComponent,
      isFaded,
      title,
      message
    }
  }
})
</script>

<template>
  <v-sheet :class="isFaded" class="snackbar" v-show="showComponent">
    <div class="snackbar-content">
      <div class="snackbar-title">{{ title }}&nbsp</div>
      <div class="snackbar-message">{{ message }}</div>
    </div>
  </v-sheet>
</template>

<style scoped>
.snackbar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 108px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  background-color: #424242;
  color: white;
  z-index: 100;
  border-radius: 20px;
  box-shadow:
    0px 4px 5px rgba(0, 0, 0, 0.14),
    0px 1px 10px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 328px;
  width: auto;
  height: 40px;
  box-sizing: border-box;
  overflow: hidden;
}

.snackbar-content {
  display: flex;
  align-items: center;
  flex-wrap: nowrap; /* Prevent content wrapping */
}

.snackbar-title {
  font-size: 0.75rem;
  font-weight: bold;
  white-space: nowrap; /* Prevent title wrapping */
}

.snackbar-message {
  font-size: 0.75rem;
  font-weight: normal;
  white-space: nowrap; /* Prevent message wrapping */
}
</style>
