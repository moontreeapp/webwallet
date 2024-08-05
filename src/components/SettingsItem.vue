<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { fadeDuration, halfFadeDuration, slideDuration } from '@/utils/animationUtils'
import { useSettingItemStore } from '@/stores/useSettingItemStore'
import { useModeStore } from '@/stores/useModeStore'
import { useNotificationStore } from '@/stores/useNotificationsStore'

export type SettingItem = {
  id: 'mode' | 'notifications'
  icon: string
  text: string
}

export const settingItems: SettingItem[] = [
  { id: 'mode', icon: 'mdi-sledding', text: 'Mode' },
  { id: 'notifications', icon: 'mdi-volume-high', text: 'Notifications' }
]

export default defineComponent({
  name: 'SettingItem',
  props: {
    id: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const settingItemStore = useSettingItemStore(props.id)()
    const modeStore = useModeStore()
    const notificationStore = useNotificationStore()

    onMounted(() => {
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
      document.documentElement.style.setProperty('--half-fade-duration', `${halfFadeDuration}ms`)
    })

    const showComponent = computed(() => settingItemStore.showComponent)
    const hasPosition = computed(() => {
      if (settingItemStore.hasPosition === 'left') {
        return 'slide-left'
      } else if (settingItemStore.hasPosition === 'center') {
        return 'slide-center'
      } else if (settingItemStore.hasPosition === 'right') {
        return 'slide-right'
      } else {
        return 'slide-right'
      }
    })

    const isFaded = computed(() => {
      return settingItemStore.isFaded ? 'fade-out' : 'fade-in'
    })

    const currentModeText = computed(() => {
      if (props.id === 'mode') {
        return modeStore.text
      }
      return props.text
    })

    const currentIcon = computed(() => {
      if (props.id === 'mode') {
        return modeStore.icon
      } else if (props.id === 'notifications') {
        return notificationStore.icon
      }
      return props.icon
    })

    const goTo = async () => {
      settingItemStore.toggleOpacity()
      await new Promise((resolve) => setTimeout(resolve, halfFadeDuration))
      if (props.id === 'mode') {
        modeStore.toggleMode()
      } else if (props.id === 'notifications') {
        notificationStore.toggleNotification()
      }
      settingItemStore.toggleOpacity()
    }

    return {
      showComponent,
      hasPosition,
      isFaded,
      currentModeText,
      currentIcon,
      goTo
    }
  }
})
</script>

<template>
  <div :class="hasPosition">
    <v-sheet
      v-if="showComponent"
      :class="['setting-item', isFaded]"
      color="transparent"
      @click="goTo"
      dense
      flat
      tile
    >
      <div class="content">
        <v-icon :class="['icon', 'animated-icon']" color="white" size="24">{{
          currentIcon
        }}</v-icon>
        <span :class="['text', 'animated-text']">{{ currentModeText }}</span>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.setting-item {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 328px;
  height: 48px;
  box-sizing: border-box;
  z-index: 2;
  padding-left: 16px;
  cursor: pointer;
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

.fade-out {
  animation: fadeOut var(--half-fade-duration) forwards;
  transform-origin: left;
}

.fade-in {
  animation: fadeIn var(--half-fade-duration) forwards;
  transform-origin: left;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animated-icon,
.animated-text {
  transition:
    opacity var(--slide-duration),
    transform var(--slide-duration);
}

.content {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 16px;
}

.text {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}
</style>
