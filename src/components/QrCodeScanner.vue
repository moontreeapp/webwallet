<script lang="ts">
import { MaestroService } from '@/services/MaestroService'
import { useQrCodeScannerStore } from '@/stores/useQrCodeScannerStore'
import { useSendPreviewFormStore } from '@/stores/useSendPreviewFormStore'
import { computed, defineComponent, ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

export default defineComponent({
  name: 'QrCodeScanner',
  components: {
    QrcodeStream
  },
  setup() {
    const scanner = ref(null)
    const cameraError = ref<string | null>(null)
    const isCameraReady = ref(false)
    const onCameraReady = () => {
      isCameraReady.value = true
    }
    const qRCodeScannerStore = useQrCodeScannerStore()
    const showComponent = computed(() => qRCodeScannerStore.showComponent)
    const isFaded = computed(() => {
      if (qRCodeScannerStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (qRCodeScannerStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const onDetect = (result: any) => {
      console.log('QR Code value:', result[0].rawValue)
      // Set pinia store value 'to'
      const sendPreviewFormStore = useSendPreviewFormStore()
      sendPreviewFormStore.setTo(result[0].rawValue)
      MaestroService.goToSendPreview()
    }

    const onInit = async (promise: any) => {
      try {
        await promise
      } catch (error) {
        handleError(error)
      }
    }

    const cameraConstraints = {
      audio: false,
      video: {
        facingMode: 'user',
        width: { ideal: 288 },
        height: { ideal: 288 }
        // transform: 'scaleX(-1)'
      }
    }

    const trackQRCode = (detectedCodes: any, ctx: any) => {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = '#4A90E2'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    }

    const handleError = (error: any) => {
      let errorMessage = `[${error.name}]: `

      if (error.name === 'NotAllowedError') {
        errorMessage += 'you need to grant camera access permission'
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'no camera on this device'
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'secure context required (HTTPS, localhost)'
      } else if (error.name === 'NotReadableError') {
        errorMessage += 'is the camera already in use?'
      } else if (error.name === 'OverconstrainedError') {
        errorMessage += 'installed cameras are not suitable'
      } else if (error.name === 'StreamApiNotSupportedError') {
        errorMessage += 'Stream API is not supported in this browser'
      } else if (error.name === 'InsecureContextError') {
        errorMessage +=
          'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
      } else {
        errorMessage += error.message
      }

      cameraError.value = errorMessage
      // qRCodeScannerStore.setError(errorMessage)
      console.error(errorMessage)
    }

    return {
      onDetect,
      onInit,
      showComponent,
      isFaded,
      cameraError,
      scanner,
      trackQRCode,
      cameraConstraints,
      isCameraReady,
      onCameraReady
    }
  }
})
</script>

<template>
  <div v-if="showComponent" :class="isFaded" class="qr-scanner-container">
    <qrcode-stream
      v-show="showComponent"
      :class="{ 'qr-scanner': true, shimmer: !isCameraReady }"
      @detect="onDetect"
      @init="onInit"
      @camera-on="onCameraReady"
      :track="trackQRCode"
      :camera="cameraConstraints"
      ref="scanner"
    >
      <div v-if="cameraError">
        <p>{{ cameraError }}</p>
      </div>
    </qrcode-stream>
  </div>
</template>

<style scoped>
.qr-scanner-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 288px;
  height: 288px;
  background-color: #3a3a3a;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 36px;
  border-radius: 16px;
}

.qr-scanner {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
}

.qr-scanner video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
