<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import type { Ref } from 'vue'
import type { VTextField } from 'vuetify/components'

type InputRef = InstanceType<typeof VTextField> | null

export default defineComponent({
  name: 'SixDigitCodeInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Enter Code'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const codeArray = reactive(Array(6).fill(''))
    const inputRefs: Ref<InputRef[]> = ref([])

    const setInputRef = (el: any, index: number) => {
      inputRefs.value[index] = el as InputRef
    }

    watch(
      codeArray,
      (newValue) => {
        emit('update:modelValue', newValue.join(''))
      },
      { deep: true }
    )

    watch(
      () => props.modelValue,
      (newValue) => {
        const newArray = newValue.split('').slice(0, 6)
        for (let i = 0; i < 6; i++) {
          codeArray[i] = newArray[i] || ''
        }
      },
      { immediate: true }
    )

    const focusInput = (index: number) => {
      const input = inputRefs.value[index]
      if (input && input.$el) {
        const inputElement = input.$el.querySelector('input')
        if (inputElement instanceof HTMLInputElement) {
          inputElement.focus()
        }
      }
    }

    const onInput = (index: number) => {
      if (codeArray[index].length > 0 && index < 5) {
        focusInput(index + 1)
      }
      codeArray[index] = codeArray[index].replace(/[^0-9]/g, '')
    }

    const onKeyDown = (event: KeyboardEvent, index: number) => {
      if (event.key === 'Backspace' && !codeArray[index] && index > 0) {
        focusInput(index - 1)
      }
    }

    const onPaste = (event: ClipboardEvent) => {
      event.preventDefault()
      const pastedData = event.clipboardData?.getData('text')
      if (pastedData) {
        const digits = pastedData.replace(/[^0-9]/g, '').slice(0, 6)
        digits.split('').forEach((digit, index) => {
          if (index < 6) {
            codeArray[index] = digit
          }
        })
        if (digits.length > 0) {
          focusInput(Math.min(digits.length, 5))
        }
      }
    }

    return {
      codeArray,
      setInputRef,
      onInput,
      onKeyDown,
      onPaste
    }
  }
})
</script>

<template>
  <div class="six-digit-code-input">
    <div class="input-container">
      <v-text-field
        v-for="(digit, index) in codeArray"
        :key="index"
        v-model="codeArray[index]"
        @input="onInput(index)"
        @keydown="onKeyDown($event, index)"
        @paste="onPaste"
        type="text"
        inputmode="numeric"
        maxlength="1"
        :ref="(el) => setInputRef(el, index)"
        flat
        hide-details="auto"
        rounded="pill"
        variant="solo"
        class="digit-input"
        bg-color="#3A3A3A"
      ></v-text-field>
    </div>
    <label v-if="label" class="input-label">{{ label }}</label>
  </div>
</template>

<style scoped>
.six-digit-code-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.38);
  text-align: center;
  width: 100%;
}

.input-container {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-bottom: 12px;
}

.digit-input {
  flex: 1;
  max-width: calc((100% - 40px) / 6);
}

.digit-input :deep(input) {
  text-align: center;
  font-size: 1.25rem;
  padding: 0;
}

/* Hide spin buttons for number input */
.digit-input :deep(input[type='number'])::-webkit-inner-spin-button,
.digit-input :deep(input[type='number'])::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
