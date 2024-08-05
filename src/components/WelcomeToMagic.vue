<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import TextField from '@/components/TextField.vue'
import ButtonComponent from '@/components/Button.vue'
import { fadeDuration, slideDuration } from '@/utils/animationUtils'
import { useOnboardingStore } from '../stores/useOnboardingStore'
import { on } from 'events'

export default defineComponent({
  name: 'WelcomeToMagic',
  components: {
    TextField,
    ButtonComponent
  },

  setup() {
    onMounted(() => {
      // set the CSS variable
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })

    const onboardingStore = useOnboardingStore()
    const showWelcomeToMagicComponent = computed(() => onboardingStore.showWelcomeToMagicComponent)
    const isWelcomeToMagicFaded = computed(() => {
      console.log('Setting Faded')
      if (onboardingStore.isWelcomeToMagicFaded === true) {
        return 'faded-opacity-0'
      } else if (onboardingStore.isWelcomeToMagicFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })
    const position = computed(() => {
      if (onboardingStore.welcomeToMagicPosition === 'center') {
        return 'slide-center'
      } else if (onboardingStore.welcomeToMagicPosition === 'right') {
        return 'slide-right'
      } else if (onboardingStore.welcomeToMagicPosition === 'left') {
        return 'slide-left'
      } else {
        return ''
      }
    })

    return {
      showWelcomeToMagicComponent,
      isWelcomeToMagicFaded,
      position
    }
  }
})
</script>

<template>
  <div :class="position">
    <v-sheet :class="isWelcomeToMagicFaded" v-show="showWelcomeToMagicComponent">
      <div class="message-container">
        <div class="title">Magic</div>
        <div class="message">Welcome To Magic</div>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.message-container {
  text-align: center;
  background-color: #121212;
}

.title {
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  font-weight: 400;
  color: white;
  margin-bottom: 12px;
}

.message {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
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
