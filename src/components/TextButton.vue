<script lang="ts">
import { defineComponent, computed } from 'vue'

export type ButtonSize = 'small' | 'large'

export default defineComponent({
  name: 'TextButton',
  props: {
    text: {
      type: String,
      required: true
    },
    size: {
      type: String as () => ButtonSize,
      required: true
    }
  },
  setup(props) {
    const buttonWidth = computed(() => {
      return props.size === 'large' ? '328px' : '156px'
    })

    const buttonClasses = computed(() => {
      return {
        'text-button': true
      }
    })

    return {
      buttonWidth,
      buttonClasses
    }
  }
})
</script>

<template>
  <v-btn
    class="text-button-container"
    color="#4A90E2"
    height="56px"
    rounded="pill"
    :style="{ width: buttonWidth, height: '56px', lineHeight: '56px' }"
    :class="buttonClasses"
    variant="text"
  >
    {{ text }}
  </v-btn>
</template>

<style scoped>
.text-button-container {
  font-weight: 700;
}
</style>
