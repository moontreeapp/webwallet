<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue'
import QRCode from 'qrcode'
import { fadeDuration, slideDuration } from '@/utils/animationUtils'
import { useSendQrStore } from '../stores/useSendQrStore'
import type { SendQrCode } from '../models/SendQrCode'

export default defineComponent({
  name: 'SendQr',
  setup() {
    onMounted(() => {
      generateQrCode(sendQrStore.qrCode)
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })

    const sendQrStore = useSendQrStore()
    const showComponent = computed(() => sendQrStore.showComponent)
    const isFaded = computed(() => {
      if (sendQrStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (sendQrStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })
    const qrCodeContainer = ref<HTMLDivElement | null>(null)
    const generateQrCode = (sendQrCode: SendQrCode) => {
      if (qrCodeContainer.value) {
        qrCodeContainer.value.innerHTML = ''
        const canvas = document.createElement('canvas')
        qrCodeContainer.value.appendChild(canvas)
        QRCode.toCanvas(
          canvas,
          JSON.stringify(sendQrCode),
          {
            width: 250,
            margin: 0,
            color: {
              dark: '#FFFFFF',
              light: '#2E2E2E'
            }
          },
          (error: Error | null | undefined) => {
            if (error) console.error(error)
          }
        )
      }
    }

    watch(
      () => sendQrStore.qrCode,
      (sendQrCode) => {
        generateQrCode(sendQrCode)
      }
    )

    return {
      qrCodeContainer,
      showComponent,
      isFaded
    }
  }
})
</script>

<template>
  <div v-show="showComponent" :class="isFaded" class="container">
    <v-icon class="qr-icon" icon="mdi-qrcode-scan" size="24" color="white"></v-icon>
    <div ref="qrCodeContainer" class="qr-code"></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  height: 362px;
  justify-content: center;
}

.qr-icon {
  margin-bottom: 16px;
  opacity: 24%;
}

.qr-code {
  margin-top: 8px;
  margin-bottom: 16px;
}
</style>
