<script lang="ts">
import { defineComponent, ref, onMounted, type PropType } from 'vue'
import { halfFadeDuration } from '@/utils/animationUtils'

type ValidationRule = (value: any) => string | boolean

export default defineComponent({
  name: 'TextField',
  props: {
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'text' | 'password' | 'email' | 'number' | 'to' | 'amount' | 'code'>,
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array as PropType<ValidationRule[]>,
      default: () => []
    }
  },
  emits: ['icon-click'],
  setup(_, { emit }) {
    onMounted(() => {
      // set the CSS variable
      document.documentElement.style.setProperty('--half-fade-duration', `${halfFadeDuration}ms`)
    })

    const animationClass = ref('')

    const handleIconClick = async (event: Event) => {
      event.stopPropagation()
      event.preventDefault()
      animationClass.value = 'fade-out'
      await new Promise((resolve) => setTimeout(resolve, halfFadeDuration))
      emit('icon-click')
      animationClass.value = 'fade-in'
      await new Promise((resolve) => setTimeout(resolve, halfFadeDuration))
      animationClass.value = ''
    }

    return {
      animationClass,
      handleIconClick
    }
  }
})
</script>

<template>
  <v-text-field
    flat
    hide-details="auto"
    rounded="pill"
    variant="solo"
    class="text-field"
    autocomplete="off"
    spellcheck="false"
    :rules="rules"
    :type="type"
    :label="label"
    :placeholder="placeholder"
    :clearable="clearable"
    bg-color="#3A3A3A"
  >
    <template v-slot:append-inner>
      <v-icon
        v-if="icon"
        @mousedown.stop
        @click="handleIconClick"
        :color="iconColor"
        :style="{ opacity: '0.38', fontSize: '22px' }"
        :class="animationClass"
      >
        {{ icon }}
      </v-icon>
    </template>
  </v-text-field>
</template>

<style scoped>
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
