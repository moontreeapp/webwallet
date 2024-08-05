<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useMintStore } from '../stores/useMintStore'
import ButtonComponent from '@/components/Button.vue'

export default defineComponent({
  name: 'Mint',
  components: {
    ButtonComponent
  },
  setup() {
    const mintStore = useMintStore()
    const showComponent = computed(() => mintStore.showComponent)
    const isFaded = computed(() => {
      if (mintStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (mintStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const handleClick = () => {
      console.log('Button clicked')
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
  <v-sheet :class="isFaded" class="mint-sheet" v-show="showComponent">
    <div class="top-container">
      <div class="circle-container">
        <div class="circle">
          <v-icon icon="mdi-plus" class="plus-icon"></v-icon>
        </div>
      </div>
    </div>
    <div class="button-container">
      <ButtonComponent
        @click="handleClick"
        class="sign-in-button custom-mint-button"
        text="Mint"
        size="large"
        :priority="false"
      />
    </div>
  </v-sheet>
</template>

<style scoped>
.mint-sheet {
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
  overflow: hidden;
  width: 100%;
}

.circle-container {
  position: relative;
  width: 64px;
  height: 64px;
}

.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #3a3a3a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plus-icon {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.06);
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-mint-button {
  background-color: #3a3a3a !important;
  color: rgba(255, 255, 255, 0.12) !important;
  cursor: default !important;
  pointer-events: none !important;
}

.custom-mint-button:hover,
.custom-mint-button:focus,
.custom-mint-button:active {
  background-color: #3a3a3a !important;
  color: rgba(255, 255, 255, 0.12) !important;
  opacity: 1 !important;
  box-shadow: none !important;
}
</style>
