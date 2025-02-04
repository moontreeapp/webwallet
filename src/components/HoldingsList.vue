<script lang="ts">
import { defineComponent, onMounted, onUnmounted, computed, watch, ref } from 'vue'
import {
  fadeDuration,
  offsetDuration,
  slideDuration,
  snackbarDuration
} from '@/utils/animationUtils'
import { useHoldingsListStore } from '@/stores/useHoldingsListStore'
import type { Holding } from '../models/Holding'
import { MaestroService } from '../services/MaestroService'
import { useWebSocketStore } from '@/stores/useWebSocketStore'
import { useSnackbarStore } from '@/stores/useSnackbarStore'

export default defineComponent({
  name: 'HoldingsList',
  setup() {
    const holdingsListStore = useHoldingsListStore()
    const webSocketStore = useWebSocketStore()
    const snackbarStore = useSnackbarStore()

    const highlightedHolding = ref<string | null>(null)

    const fetchHoldingsIfConnected = () => {
      // Fetch holdings if connected on initialization
      if (webSocketStore.connected) {
        holdingsListStore.fetchHoldings()
      }
    }

    onMounted(() => {
      // Set the CSS variables
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
      document.documentElement.style.setProperty('--snackbar-duration', `${snackbarDuration}ms`)
      document.documentElement.style.setProperty('--offset-duration', `${offsetDuration}ms`)

      // Initialize WebSocket and set up listeners
      webSocketStore.initializeWebSocket()
      webSocketStore.on('open', fetchHoldingsIfConnected)

      // Fetch holdings if already connected
      fetchHoldingsIfConnected()

      holdingsListStore.setupHoldingsListener()
    })

    onUnmounted(() => {
      holdingsListStore.removeHoldingsListener()
      webSocketStore.off('open', fetchHoldingsIfConnected)
    })

    const holdings = computed(() => holdingsListStore.holdings)

    // Watch for changes in holdings
    watch(holdings, async (newHoldings, oldHoldings) => {
      console.log('Holdings updated in component:', newHoldings)
      if (!snackbarStore.showComponent) {
        const increasedHolding = newHoldings.find((newHolding) => {
          const oldHolding = oldHoldings.find((old) => old.name === newHolding.name)
          return (
            oldHolding && parseFloat(newHolding.amountTotal) > parseFloat(oldHolding.amountTotal)
          )
        })

        if (increasedHolding) {
          snackbarStore.setTitle('Received')
          snackbarStore.setMessage(`${increasedHolding.name}`)
          snackbarStore.toggleShow()
          await new Promise((resolve) => setTimeout(resolve, offsetDuration))
          snackbarStore.toggleOpacity()

          // Set the highlighted holding here
          highlightedHolding.value = increasedHolding.name

          await new Promise((resolve) => setTimeout(resolve, snackbarDuration))
          snackbarStore.toggleOpacity()
          highlightedHolding.value = null

          await new Promise((resolve) => setTimeout(resolve, fadeDuration))
          snackbarStore.reset()
        }
      }
    })

    const sortedHoldings = computed(() => {
      return [...holdings.value].sort((a, b) => {
        if (a.name === 'Evrmore') return -1
        if (b.name === 'Evrmore') return 1
        if (a.name === 'Ravencoin') return -1
        if (b.name === 'Ravencoin') return 1
        return a.name.localeCompare(b.name)
      })
    })

    const showComponent = computed(() => holdingsListStore.showComponent)
    const isFaded = computed(() => {
      if (holdingsListStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (holdingsListStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const getIcon = (holding: string) => {
      const iconUrl = new URL(
        `../assets/coin_logos/${holding.toLowerCase()}_logo.png`,
        import.meta.url
      ).href
      return iconUrl.includes('undefined') ? '' : iconUrl
    }

    const handleHoldingClick = (holding: Holding) => {
      console.log('Holding clicked')
      MaestroService.goToHistory(holding)
    }

    return {
      sortedHoldings,
      getIcon,
      showComponent,
      isFaded,
      handleHoldingClick,
      highlightedHolding
    }
  }
})
</script>

<template>
  <div v-show="showComponent" :class="isFaded" class="holdings-list">
    <div
      v-for="holding in sortedHoldings"
      :key="holding.name"
      class="holdings-list-item clickable"
      :class="{ highlighted: holding.name === highlightedHolding }"
      @click="handleHoldingClick(holding)"
    >
      <div class="content-container">
        <div class="icon-container" :style="{ backgroundColor: holding.iconColor }">
          <img
            v-if="getIcon(holding.name)"
            :src="getIcon(holding.name)"
            alt="Icon"
            class="icon-image"
          />
          <span v-else class="icon-letter">{{ holding.name.charAt(0).toUpperCase() }}</span>
        </div>
        <div class="text-container">
          <div class="holding">{{ holding.name }}</div>
          <div class="quant">{{ holding.amountTotalRounded }}</div>
        </div>
      </div>
      <div class="value">
        {{ holding.fiatValue === '0' ? '$-' : `$${holding.fiatValue}` }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.holdings-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.holdings-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  width: 100%;
  height: 72px;
  transition: background-color var(--fade-duration) ease-in-out;
}

.content-container {
  display: flex;
  align-items: center;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
}

.icon-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.icon-letter {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.87);
  position: absolute;
}

.text-container {
  display: flex;
  flex-direction: column;
}

.holding {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.quant {
  font-size: 0.875rem;
  font-weight: 700;
  opacity: 0.6;
  color: white;
}

.value {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.6;
  color: white;
}

.highlighted {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
