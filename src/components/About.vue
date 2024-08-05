<script lang="ts">
import { computed, defineComponent } from 'vue'
import SocialTwitter from './SocialTwitter.vue'
import { useAboutStore } from '../stores/useAboutStore'

export default defineComponent({
  name: 'About',
  components: {
    SocialTwitter
  },
  setup() {
    const aboutStore = useAboutStore()
    const showComponent = computed(() => aboutStore.showComponent)
    const isFaded = computed(() => {
      if (aboutStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (aboutStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const hasPosition = computed(() => {
      if (aboutStore.hasPosition === 'left') {
        return 'slide-left'
      } else if (aboutStore.hasPosition === 'center') {
        return 'slide-center'
      } else if (aboutStore.hasPosition === 'right') {
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
    <div v-show="showComponent" :class="isFaded" class="about-page">
      <SocialTwitter twitter-handle="MagicWalletApp" />
    </div>
  </div>
</template>

<style scoped>
.about-page {
  color: white;
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 160px;
}

.about-page > * {
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
