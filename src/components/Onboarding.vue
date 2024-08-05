<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import ButtonComponent from '@/components/Button.vue'
import { fadeDuration, slideDuration } from '@/utils/animationUtils'
import InstallPhoneApp from './InstallPhoneApp.vue'
import WelcomeToMagic from './WelcomeToMagic.vue'
import PairToPhone from './PairToPhone.vue'
import { useOnboardingStore } from '../stores/useOnboardingStore'
import { MaestroService } from '../services/MaestroService'
import ConnectYourPhone from './ConnectYourPhone.vue'

export default defineComponent({
  name: 'Onboarding',
  components: {
    WelcomeToMagic,
    ConnectYourPhone,
    InstallPhoneApp,
    PairToPhone,
    ButtonComponent
  },

  setup() {
    onMounted(() => {
      // set the CSS variable
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })

    const onboardingStore = useOnboardingStore()
    const showComponent = computed(() => onboardingStore.showComponent)
    const isFaded = computed(() => {
      console.log('Setting Faded')
      if (onboardingStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (onboardingStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })
    const dotActive = computed(() => onboardingStore.dotActive)
    const buttonText = computed(() => {
      switch (dotActive.value) {
        case 0:
          return 'Get Started'
        case 1:
          return "Let's Go"
        case 2:
          return 'App Installed'
        case 3:
          return 'Pair'
        default:
          return ''
      }
    })

    const handleClick = () => {
      console.log('Button clicked')
      if (dotActive.value === 0) {
        MaestroService.goToConnectYourPhone()
      } else if (dotActive.value === 1) {
        MaestroService.goToInstallPhoneApp()
      } else if (dotActive.value === 2) {
        MaestroService.goToPairToPhone()
      } else if (dotActive.value === 3) {
        MaestroService.goToHoldings()
      }
    }

    const handleDotClick = (index: number) => {
      console.log('Dot clicked')
      if (index === 0) {
        MaestroService.goToWelcomeToMagic()
      } else if (index === 1) {
        MaestroService.goToConnectYourPhone()
      } else if (index === 2) {
        MaestroService.goToInstallPhoneApp()
      } else if (index === 3) {
        MaestroService.goToPairToPhone()
      }
    }

    return {
      showComponent,
      isFaded,
      dotActive,
      buttonText,
      handleClick,
      handleDotClick
    }
  }
})
</script>

<template>
  <v-sheet :class="isFaded" class="onboarding-sheet" v-show="showComponent">
    <div class="top-container">
      <div class="component-wrapper">
        <WelcomeToMagic />
        <ConnectYourPhone />
        <InstallPhoneApp />
        <PairToPhone />
      </div>
    </div>

    <div class="bottom-container">
      <div class="dots">
        <span
          class="dot"
          :class="{ 'active-0': dotActive === 0 }"
          @click="handleDotClick(0)"
        ></span>
        <span
          class="dot"
          :class="{ 'active-1': dotActive === 1 }"
          @click="handleDotClick(1)"
        ></span>
        <span
          class="dot"
          :class="{ 'active-2': dotActive === 2 }"
          @click="handleDotClick(2)"
        ></span>
        <span
          class="dot"
          :class="{ 'active-3': dotActive === 3 }"
          @click="handleDotClick(3)"
        ></span>
      </div>
      <ButtonComponent
        @click="handleClick"
        class="action-button"
        :text="buttonText"
        size="large"
        :priority="false"
      />
    </div>
  </v-sheet>
</template>

<style scoped>
.onboarding-sheet {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.top-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #121212;
  overflow: hidden;
}

.component-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-container {
  text-align: center;
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

.bottom-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
  padding-left: 16px;
  background-color: #121212;
}

.dots {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #3a3a3a;
  margin: 0 8px;
  cursor: pointer;
  transition: all var(--fade-duration) ease;
}

.dot.active-0,
.dot.active-1,
.dot.active-2,
.dot.active-3 {
  background-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}
</style>
