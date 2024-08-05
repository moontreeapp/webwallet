<script lang="ts">
import { computed, defineComponent } from 'vue'
import SocialTwitter from './SocialTwitter.vue'
import { useHelpStore } from '../stores/useHelpStore'

export default defineComponent({
  name: 'Help',
  components: {
    SocialTwitter
  },
  setup() {
    const helpStore = useHelpStore()
    const showComponent = computed(() => helpStore.showComponent)
    const isFaded = computed(() => {
      if (helpStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (helpStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const hasPosition = computed(() => {
      if (helpStore.hasPosition === 'left') {
        return 'slide-left'
      } else if (helpStore.hasPosition === 'center') {
        return 'slide-center'
      } else if (helpStore.hasPosition === 'right') {
        return 'slide-right'
      } else {
        return 'slide-right'
      }
    })

    return {
      showComponent,
      isFaded,
      hasPosition
    }
  }
})
</script>

<template>
  <div :class="hasPosition">
    <div v-show="showComponent" :class="isFaded" class="help-page">
      <SocialTwitter twitter-handle="br0ck_w00d" />
      <SocialTwitter twitter-handle="jordan_miller" />
    </div>
  </div>
</template>

<style scoped>
.help-page {
  color: white;
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 120px;
}

.help-page > * {
  margin-bottom: 16px;
}

.slide-right {
  transition: transform var(--slide-duration) ease-in-out;
  transform: translateX(100%);
}

.slide-left {
  transition: transform var(--slide-duration) ease-in-out;
  transform: translateX(-100%);
}

.slide-center {
  transition: transform var(--slide-duration) ease-in-out;
  transform: translateX(0%);
}
</style>
