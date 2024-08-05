<script lang="ts">
import { defineComponent, computed } from 'vue'

export type ButtonSize = 'small' | 'large'

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    text: {
      type: String,
      required: true
    },
    size: {
      type: String as () => ButtonSize,
      required: true
    },
    priority: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const buttonWidth = computed(() => {
      return props.size === 'large' ? '296px' : '140px'
    })

    const buttonClasses = computed(() => {
      return {
        'priority-border': props.priority
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
    color="#4A90E2"
    class="submit-btn text-white"
    flat
    height="56px"
    rounded="pill"
    :width="buttonWidth"
    :class="buttonClasses"
  >
    {{ text }}
  </v-btn>
</template>

<style scoped>
.submit-btn {
  font-weight: 700;
}

.priority-border {
  border: 4px solid rgba(255, 255, 255, 0.12);
}
</style>
