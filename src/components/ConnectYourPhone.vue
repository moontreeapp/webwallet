<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useOnboardingStore } from '../stores/useOnboardingStore'

export default defineComponent({
  name: 'ConnectYourPhone',
  setup() {
    const onboardingStore = useOnboardingStore()
    const showComponent = computed(() => onboardingStore.showConnectYourPhoneComponent)
    const isFaded = computed(() => {
      return onboardingStore.isConnectYourPhoneFaded ? 'faded-opacity-0' : 'full-opacity'
    })
    const position = computed(() => {
      if (onboardingStore.connectYourPhonePosition === 'center') {
        return 'slide-center'
      } else if (onboardingStore.connectYourPhonePosition === 'right') {
        return 'slide-right'
      } else if (onboardingStore.connectYourPhonePosition === 'left') {
        return 'slide-left'
      } else {
        return ''
      }
    })

    return {
      showComponent,
      isFaded,
      position
    }
  }
})
</script>

<template>
  <div :class="position">
    <v-sheet :class="isFaded" v-show="showComponent">
      <div class="message-container">
        <div class="message">Connect Your Phone</div>
        <div class="sub-message">Magic uses your phone to keep you safe</div>
        <v-icon class="phone-icon" icon="mdi-cellphone-key" size="72"></v-icon>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.message-container {
  text-align: center;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.message {
  font-size: 24px;
  color: white;
  margin-bottom: 12px;
}

.sub-message {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
}

.phone-icon {
  color: rgba(255, 255, 255, 0.38);
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
