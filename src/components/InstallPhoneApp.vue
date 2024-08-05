<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import ButtonComponent from '@/components/Button.vue'
import { fadeDuration, slideDuration } from '@/utils/animationUtils'
import QRCode from 'qrcode'
import { useOnboardingStore } from '../stores/useOnboardingStore'

export default defineComponent({
  name: 'InstallPhoneApp',
  components: {
    ButtonComponent
  },

  setup() {
    const onboardingStore = useOnboardingStore()
    const qrCodeContainer = ref<HTMLDivElement | null>(null)

    onMounted(() => {
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
      generateQrCode(onboardingStore.installAppQrCode)
    })

    const title = 'Install Magic App'
    const subtitle = 'Scan with your phone'
    const showComponent = computed(() => onboardingStore.showInstallPhoneAppComponent)
    const isFaded = computed(() => {
      return onboardingStore.isInstallPhoneAppFaded ? 'faded-opacity-0' : 'full-opacity'
    })
    const position = computed(() => {
      if (onboardingStore.installPhoneAppPosition === 'center') {
        return 'slide-center'
      } else if (onboardingStore.installPhoneAppPosition === 'right') {
        return 'slide-right'
      } else if (onboardingStore.installPhoneAppPosition === 'left') {
        return 'slide-left'
      } else {
        return ''
      }
    })

    const generateQrCode = (qrCodeData: string) => {
      if (qrCodeContainer.value) {
        qrCodeContainer.value.innerHTML = ''
        const canvas = document.createElement('canvas')
        qrCodeContainer.value.appendChild(canvas)
        QRCode.toCanvas(
          canvas,
          JSON.stringify(qrCodeData),
          {
            width: 200,
            margin: 0,
            color: {
              dark: '#FFFFFFDE', // approximately white with 87% opacity
              light: '#121212'
            }
          },
          (error: Error | null | undefined) => {
            if (error) console.error(error)
          }
        )
      }
    }

    watch(
      () => onboardingStore.installAppQrCode,
      (qrCodeData) => {
        generateQrCode(qrCodeData)
      }
    )

    const handleBack = () => {
      console.log('Back button clicked')
      // MaestroService.goBack()
    }

    const handleAppInstalled = () => {
      console.log('App Installed button clicked')
      // MaestroService.goToPairScreen()
    }

    return {
      title,
      subtitle,
      showComponent,
      isFaded,
      qrCodeContainer,
      handleBack,
      handleAppInstalled,
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
        <div ref="qrCodeContainer" class="qr-code"></div>
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
  padding: 16px;
  background-color: #121212;
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

.qr-code {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e2e2e;
}

.bottom-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 16px;
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
