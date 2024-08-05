<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useSwapStore } from '../stores/useSwapStore'
import ButtonComponent from '@/components/Button.vue'

export default defineComponent({
  name: 'Swap',
  components: {
    ButtonComponent
  },
  setup() {
    const swapStore = useSwapStore()
    const showComponent = computed(() => swapStore.showComponent)
    const isFaded = computed(() => {
      if (swapStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (swapStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const handleClick = () => {
      console.log('Button clicked')
      // You can add logic here to prevent action if the button should be "disabled"
    }

    return {
      showComponent,
      isFaded,
      handleClick
    }
  }
})
</script>

<template>
  <v-sheet :class="isFaded" class="swap-sheet" v-show="showComponent">
    <div class="top-container">
      <div class="asset-row">
        <div class="circle">
          <v-icon icon="mdi-square-outline" class="circle-icon"></v-icon>
        </div>
        <v-icon icon="mdi-swap-horizontal" class="swap-icon"></v-icon>
        <div class="circle">
          <v-icon icon="mdi-triangle-outline" class="circle-icon"></v-icon>
        </div>
      </div>
    </div>
    <div class="button-container">
      <ButtonComponent
        @click="handleClick"
        class="sign-in-button custom-swap-button"
        text="Swap"
        size="large"
        :priority="false"
      />
    </div>
  </v-sheet>
</template>

<style scoped>
.swap-sheet {
  color: white;
  background-color: transparent;
  padding: 20px;
  height: 362px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.top-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
  width: 100%;
}

.asset-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #3a3a3a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-icon {
  font-size: 32px;
  color: rgba(255, 255, 255, 0.03);
}

.swap-icon {
  font-size: 36px;
  color: #3a3a3a;
}

.custom-swap-button {
  background-color: #3a3a3a !important;
  color: rgba(255, 255, 255, 0.12) !important;
  cursor: default !important;
  pointer-events: none !important;
}

.custom-swap-button:hover,
.custom-swap-button:focus,
.custom-swap-button:active {
  background-color: #3a3a3a !important;
  color: rgba(255, 255, 255, 0.12) !important;
  opacity: 1 !important;
  box-shadow: none !important;
}
</style>
