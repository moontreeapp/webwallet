<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue'
import { usePortfolioValueStore } from '../stores/usePortfolioValueStore'
import { slideDuration, fadeDuration } from '@/utils/animationUtils'

export default defineComponent({
  name: 'PortfolioValue',
  setup() {
    onMounted(() => {
      // set the CSS variable
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })

    const portfolioValueStore = usePortfolioValueStore()
    const isFaded = computed(() => {
      console.log('Setting Faded')
      if (portfolioValueStore.isFaded === true) {
        return 'faded-opacity-2'
      } else if (portfolioValueStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const hasPosition = computed(() => {
      console.log('Setting Position')
      if (portfolioValueStore.hasPosition === 'left') {
        return 'slide-left'
      } else if (portfolioValueStore.hasPosition === 'center') {
        return 'slide-center'
      } else {
        return 'slide-center'
      }
    })

    const portfolioValuePreceding = computed(() => {
      // split preceding
      const preceding = portfolioValueStore.portfolioValue.split('.')[0]
      // format with commas every 3 digits
      return preceding.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    })

    const portfolioValueTrailing = computed(() => {
      return portfolioValueStore.portfolioValue.split('.')[1]
    })

    return {
      hasPosition,
      isFaded,
      portfolioValuePreceding,
      portfolioValueTrailing
    }
  }
})
</script>

<template>
  <div :class="hasPosition">
    <div :class="isFaded">
      <v-sheet class="portfolio-value" color="transparent">
        <div class="value">
          ${{ portfolioValuePreceding }}<span class="trailing">.{{ portfolioValueTrailing }}</span>
        </div>
        <div class="label">Portfolio</div>
      </v-sheet>
    </div>
  </div>
</template>

<style scoped>
.portfolio-value {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 328px;
  height: 182px;
  color: white;
  z-index: 3;
}

.slide-center {
  transition: transform var(--slide-duration) ease-in-out;
  transform: translateX(0%);
}

.slide-left {
  transition: transform var(--slide-duration) ease-in-out;
  transform: translateX(-100%);
}

.value {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  height: 65px;
}

.value .trailing {
  font-size: 1.5rem;
  opacity: 0.6;
  font-weight: bold;
}

.label {
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.67;
  color: white;
  height: 24px;
  margin-bottom: 10px;
}
</style>
