<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import TextField from '@/components/TextField.vue'
import SixDigitTextField from '@/components/SixDigitTextField.vue'
import { fadeDuration, slideDuration } from '@/utils/animationUtils'
import { useOnboardingStore } from '../stores/useOnboardingStore'

export default defineComponent({
  name: 'PairToPhone',
  components: {
    TextField,
    SixDigitTextField
  },

  setup() {
    onMounted(() => {
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })

    const title = 'Pair to Phone'
    const subtitle = 'Open app menu & pair to phone'
    const onboardingStore = useOnboardingStore()
    const showComponent = computed(() => onboardingStore.showPairToPhoneComponent)
    const isFaded = computed(() => {
      return onboardingStore.isPairToPhoneFaded ? 'faded-opacity-0' : 'full-opacity'
    })

    const position = computed(() => {
      if (onboardingStore.pairToPhonePosition === 'center') {
        return 'slide-center'
      } else if (onboardingStore.pairToPhonePosition === 'right') {
        return 'slide-right'
      } else if (onboardingStore.pairToPhonePosition === 'left') {
        return 'slide-left'
      } else {
        return ''
      }
    })

    const pairCode = ref('')

    const handleBack = () => {
      console.log('Back button clicked')
      // MaestroService.goBack()
    }

    const handlePair = () => {
      console.log('Pair button clicked')
      // MaestroService.pairPhone(pairCode.value)
    }

    return {
      title,
      subtitle,
      showComponent,
      isFaded,
      pairCode,
      handleBack,
      handlePair,
      position
    }
  }
})
</script>

<template>
  <div :class="position">
    <v-sheet :class="isFaded" v-show="showComponent">
      <div class="content-container">
        <h1 class="title">{{ title }}</h1>
        <p class="subtitle">{{ subtitle }}</p>
        <div class="input-wrapper">
          <SixDigitTextField v-model="pairCode" label="Enter code" />
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #121212;
  width: 100%;
}

.title {
  font-size: 24px;
  color: white;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
}

.input-wrapper {
  width: 145%;
  padding: 0 16px;
  box-sizing: border-box;
}

.pair-code-input {
  width: 100%;
}

.slide-right {
  transition: transform var(--slide-duration) ease;
  transform: translateX(100%);
}

.slide-left {
  transition: transform var(--slide-duration) ease;
  transform: translateX(-100%);
}

.slide-center {
  transition: transform var(--slide-duration) ease;
  transform: translateX(0%);
}
</style>
