<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import TextField from '@/components/TextField.vue'
import ButtonComponent from '@/components/Button.vue'
import { fadeDuration, halfFadeDuration, slideDuration } from '@/utils/animationUtils'
import { useSendPreviewFormStore } from '@/stores/useSendPreviewFormStore'
import { MaestroService } from '../services/MaestroService'
import { useHoldingStore } from '../stores/useHoldingStore'
import { useSendQrStore } from '../stores/useSendQrStore'
import { SendQrCode } from '../models/SendQrCode'
import { isValidAddress } from '../services/AddressValidationService'

export default defineComponent({
  name: 'SendPreviewForm',
  components: {
    TextField,
    ButtonComponent
  },
  setup() {
    onMounted(() => {
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
      document.documentElement.style.setProperty('--half-fade-duration', `${halfFadeDuration}ms`)
    })

    const sendPreviewFormStore = useSendPreviewFormStore()
    const sendQrStore = useSendQrStore()
    const holdingStore = useHoldingStore()
    const showAmountIcon = computed(() => {
      if (holdingStore.holding.fiatValue === '0') {
        return false
      } else {
        return true
      }
    })
    const showComponent = computed(() => sendPreviewFormStore.showComponent)
    const to = computed({
      get: () => sendPreviewFormStore.to,
      set: (value) => sendPreviewFormStore.setTo(value)
    })
    const amount = ref('')
    const formattedAmount = ref('')
    const unitIsUsd = ref(false)
    const valid = computed(() => sendPreviewFormStore.valid)
    const isFaded = computed(() => {
      if (sendPreviewFormStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (sendPreviewFormStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const toAnimationClass = ref('')
    const handleToIconClick = async () => {
      toAnimationClass.value = 'fade-out'
      await new Promise((resolve) => setTimeout(resolve, halfFadeDuration))
      console.log('Show scanner')
      MaestroService.goToQrCodeScanner()
      toAnimationClass.value = 'fade-in'
      await new Promise((resolve) => setTimeout(resolve, halfFadeDuration))
      toAnimationClass.value = ''
    }

    const amountAnimationClass = ref('')
    const handleAmountIconClick = async () => {
      amountAnimationClass.value = 'fade-out'
      await new Promise((resolve) => setTimeout(resolve, halfFadeDuration))
      unitIsUsd.value = !unitIsUsd.value
      amountAnimationClass.value = 'fade-in'
      await new Promise((resolve) => setTimeout(resolve, halfFadeDuration))
      amountAnimationClass.value = ''
    }

    const handleFormSubmit = async () => {
      if (valid.value) {
        const sendQrCode = new SendQrCode({
          to: to.value,
          amount: amount.value
        })
        sendQrStore.setQrCode(sendQrCode)
        MaestroService.goToSendQr()
      } else {
        console.error('Form validation failed')
      }
    }

    const formatAmount = (value: string) => {
      const cleanValue = value.replace(/[^\d.]/g, '')
      const [integerPart, decimalPart] = cleanValue.split('.')
      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger
    }

    watch(
      () => amount.value,
      (value) => {
        formattedAmount.value = formatAmount(value)
        validateAmountField(value)
      }
    )

    watch(
      () => unitIsUsd.value,
      (isUsd) => {
        console.log('Unit is USD:', isUsd)
        if (amount.value) {
          const perUnitRate: number =
            parseFloat(holdingStore.holding.amountTotal) /
            parseFloat(holdingStore.holding.fiatValue)
          if (isUsd) {
            amount.value = (parseFloat(amount.value) / perUnitRate).toFixed(2)
          } else {
            const blockchainDecimalPlaces = holdingStore.holding.blockchain.decimalPlaces
            amount.value = (parseFloat(amount.value) * perUnitRate).toFixed(blockchainDecimalPlaces)
          }
        } else {
          amount.value = amount.value
        }
      }
    )
    const toErrors = ref('')
    /* create watcher that determines if the toIcon should be shown or not. This should be
       based on checking if the camera is available on the device (desktop or laptop)
    */
    const toIcon = ref('mdi-qrcode-scan')
    const validateToField = async (value: string) => {
      if (!value) {
        toErrors.value = 'Required'
      } else {
        const isValid = await isValidAddress(value, holdingStore.holding.blockchain)
        toErrors.value = isValid ? '' : 'Invalid address'
      }
    }
    const amountErrors = ref('')
    const validateAmountField = (value: string) => {
      if (!value) {
        amountErrors.value = 'Required'
      } else {
        const isNumber = /^\d+(\.\d+)?$/.test(value)
        if (!isNumber) {
          amountErrors.value = 'Invalid amount'
        } else {
          const decimalPlaces = value.split('.')[1]?.length || 0
          const maxDecimalPlaces = holdingStore.holding.blockchain.decimalPlaces
          if (decimalPlaces > maxDecimalPlaces) {
            amountErrors.value = `Maximum decimals allowed: ${maxDecimalPlaces}`
          } else if (parseFloat(value) === 0) {
            amountErrors.value = 'Amount must be greater than 0'
          } else {
            amountErrors.value = ''
          }
        }
      }
    }

    watch(
      () => to.value,
      async (value) => {
        await validateToField(value)
      }
    )

    // Watch the reset trigger
    watch(
      () => sendPreviewFormStore.resetTrigger,
      () => {
        to.value = ''
        toErrors.value = ''
        amount.value = ''
        amountErrors.value = ''
        console.log('Form has been reset')
      }
    )

    return {
      showComponent,
      isFaded,
      valid,
      to,
      amount,
      formattedAmount,
      handleToIconClick,
      handleAmountIconClick,
      handleFormSubmit,
      unitIsUsd,
      showAmountIcon,
      toErrors,
      amountErrors,
      toIcon,
      toAnimationClass,
      amountAnimationClass
    }
  }
})
</script>

<template>
  <v-sheet :class="isFaded" class="send-preview-sheet" v-show="showComponent">
    <v-form @submit.prevent="handleFormSubmit" class="form-style">
      <div class="fields-container">
        <v-text-field
          flat
          label="To"
          type="to"
          v-model="to"
          :error-messages="toErrors"
          :clearable="true"
          variant="solo"
          bg-color="#3A3A3A"
          rounded="pill"
          autocomplete="off"
          spellcheck="false"
        >
          <template v-slot:append-inner>
            <v-icon
              v-if="toIcon"
              @mousedown.stop
              @click="handleToIconClick"
              :class="toAnimationClass"
              :style="{ opacity: '0.38', fontSize: '22px' }"
            >
              {{ toIcon }}
            </v-icon>
          </template>
        </v-text-field>
        <v-text-field
          flat
          label="Amount"
          type="amount"
          v-model="formattedAmount"
          @input="amount = $event.target.value.replace(/,/g, '')"
          :error-messages="amountErrors"
          :clearable="true"
          variant="solo"
          bg-color="#3A3A3A"
          rounded="pill"
          autocomplete="off"
          spellcheck="false"
        >
          <template v-slot:append-inner>
            <v-icon
              v-if="showAmountIcon"
              @mousedown.stop
              @click="handleAmountIconClick"
              :class="amountAnimationClass"
              :style="{ opacity: '0.38', fontSize: '22px' }"
            >
              {{ unitIsUsd ? 'mdi-currency-usd' : 'mdi-circle-multiple-outline' }}
            </v-icon>
          </template>
        </v-text-field>
      </div>
      <div class="button-container">
        <ButtonComponent type="submit" class="send-button" text="Send" size="large" />
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped>
.send-preview-sheet {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  box-sizing: border-box;
  padding: 16px;
  background-color: transparent;
}

.form-style {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.fields-container {
  display: flex;
  flex-direction: column;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 243px;
  color: transparent;
}

.send-button {
  font-size: 1rem;
}

.fade-out {
  animation: fadeOut var(--half-fade-duration) forwards;
  transform-origin: right;
}

.fade-in {
  animation: fadeIn var(--half-fade-duration) forwards;
  transform-origin: right;
}

@keyframes fadeOut {
  0% {
    opacity: 0.38;
    transform: scale(1);
  }
  100% {
    opacity: 0.1;
    transform: scale(0.8);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0.1;
    transform: scale(0.8);
  }
  100% {
    opacity: 0.38;
    transform: scale(1);
  }
}
</style>
