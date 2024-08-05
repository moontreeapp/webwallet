<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useHoldingButtonsStore } from '@/stores/useHoldingButtonsStore'
import { MaestroService } from '../services/MaestroService'
import { fadeDuration, slideDuration } from '@/utils/animationUtils'

export default defineComponent({
  name: 'HoldingButtons',
  setup() {
    onMounted(() => {
      // set the CSS variable
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })

    const holdingButtonsStore = useHoldingButtonsStore()
    const showComponent = computed(() => holdingButtonsStore.showComponent)
    const canMint = computed(() => holdingButtonsStore.canMint)
    const isFaded = computed(() => {
      if (holdingButtonsStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (holdingButtonsStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const goToSendPreview = () => {
      MaestroService.goToSendPreview()
    }

    const goToReceive = () => {
      MaestroService.goToReceive()
    }

    const goToSwap = () => {
      MaestroService.goToSwap()
    }

    const goToMint = () => {
      MaestroService.goToMint()
    }

    return {
      isFaded,
      showComponent,
      canMint,
      goToSendPreview,
      goToReceive,
      goToSwap,
      goToMint
    }
  }
})
</script>

<template>
  <div v-show="showComponent" :class="isFaded" class="button-row">
    <div class="button-container">
      <v-btn icon flat size="40" @click="goToSendPreview" color="#6AAFE6">
        <v-icon size="24">mdi-arrow-top-right</v-icon>
      </v-btn>
      <div class="button-text">Send</div>
    </div>
    <div class="button-container">
      <v-btn icon flat size="40" @click="goToReceive" color="#6AAFE6">
        <v-icon size="24">mdi-arrow-bottom-left</v-icon>
      </v-btn>
      <div class="button-text">Receive</div>
    </div>
    <div class="button-container">
      <v-btn icon flat size="40" @click="goToSwap" color="#6AAFE6">
        <v-icon size="24">mdi-swap-horizontal</v-icon>
      </v-btn>
      <div class="button-text">Swap</div>
    </div>
    <div v-if="canMint" class="button-container">
      <v-btn icon flat size="40" @click="goToMint" color="#6AAFE6">
        <v-icon size="24">mdi-star-circle-outline</v-icon>
      </v-btn>
      <div class="button-text">Mint</div>
    </div>
  </div>
</template>

<style scoped>
.button-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 3;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 16px;
  height: 58px;
}

.button-text {
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  margin-top: 2px;
  text-align: center;
}
</style>
