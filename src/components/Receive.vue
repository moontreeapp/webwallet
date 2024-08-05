<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useReceiveStore } from '@/stores/useReceiveStore'
import { useHoldingStore } from '@/stores/useHoldingStore'
import { useSnackbarStore } from '@/stores/useSnackbarStore'
import QRCode from 'qrcode'
import ButtonComponent from '@/components/Button.vue'
import {
  fadeDuration,
  offsetDuration,
  slideDuration,
  snackbarDuration
} from '@/utils/animationUtils'

const qrCodeContainer = ref<HTMLDivElement | null>(null)
const receiveStore = useReceiveStore()
const holdingStore = useHoldingStore()
const snackbarStore = useSnackbarStore()

const showComponent = computed(() => receiveStore.showComponent)
// const firstSix = computed(() => holdingStore.holding.pubKey.slice(0, 6))
// const lastSix = computed(() => holdingStore.holding.pubKey.slice(-6))
const isFaded = computed(() => (receiveStore.isFaded ? 'faded-opacity-0' : 'full-opacity'))
const blockchainIcon = computed(() => holdingStore.holding.blockchain.iconUrl)
const blockchainName = computed(() => holdingStore.holding.blockchain.name)

onMounted(() => {
  generateQrCode(receiveStore.qrCode)
  document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
  document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
})

const generateQrCode = (text: string) => {
  if (qrCodeContainer.value) {
    qrCodeContainer.value.innerHTML = ''
    const canvas = document.createElement('canvas')
    qrCodeContainer.value.appendChild(canvas)
    QRCode.toCanvas(
      canvas,
      text,
      {
        width: 200,
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

watch(() => receiveStore.qrCode, generateQrCode)

const handleCopyClick = async () => {
  await navigator.clipboard.writeText(receiveStore.qrCode)
  snackbarStore.setTitle('Success')
  snackbarStore.setMessage('copied to clipboard')
  snackbarStore.toggleShow()
  await new Promise((resolve) => setTimeout(resolve, offsetDuration))
  snackbarStore.toggleOpacity()
  await new Promise((resolve) => setTimeout(resolve, snackbarDuration))
  snackbarStore.toggleOpacity()
  await new Promise((resolve) => setTimeout(resolve, fadeDuration))
  snackbarStore.reset()
}
</script>

<template>
  <div v-show="showComponent" :class="isFaded" class="container">
    <div ref="qrCodeContainer" class="qr-code" @click="handleCopyClick"></div>
    <div class="qr-string" @click="handleCopyClick">
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <img :src="blockchainIcon" alt="Icon" class="icon" v-bind="props" />
        </template>
        {{ blockchainName }}
      </v-tooltip>
      <!-- <span class="qr-char-first">{{ firstSix }}</span> -->
      <span class="qr-char-middle">...</span>
      <!-- <span class="qr-char-last">{{ lastSix }}</span> -->
    </div>
    <div class="spacer"></div>
    <div class="button-row">
      <ButtonComponent @click="handleCopyClick" text="Copy" size="small" :priority="false" />
      <ButtonComponent text="Share" size="small" :priority="false" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  height: 100vh;
  justify-content: center;
}

.qr-code {
  margin-top: 12px;
  margin-bottom: 12px;
  cursor: pointer;
}

.qr-string {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: white;
  cursor: pointer;
  max-width: 296px;
}

.qr-char-first,
.qr-char-last {
  opacity: 0.42;
  font-weight: 700;
}

.qr-char-middle {
  opacity: 0.38;
  font-weight: normal;
}

.spacer {
  flex-grow: 1;
}

.icon {
  height: 20px;
  margin-right: 8px;
  cursor: pointer;
}

.button-row {
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 244px;
}
</style>
