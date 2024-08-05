<script lang="ts">
import { useMenuItemStore } from '@/stores/useMenuItemStore'
import { computed, defineComponent, onMounted, onBeforeUnmount, watch } from 'vue'
import { useModeStore } from '@/stores/useModeStore'
import { MaestroService } from '@/services/MaestroService'
import { fadeDuration, halfFadeDuration, slideDuration } from '@/utils/animationUtils'
import type { Place } from '@/stores/useMaestroPlaceStore'

export type MenuItem = {
  id: Place
  icon: string
  text: string
}

export const menuItems: MenuItem[] = [
  { id: 'help', icon: 'mdi-help-circle', text: 'Help? Chat Now' },
  { id: 'settings', icon: 'mdi-cog', text: 'Settings' },
  { id: 'about', icon: 'mdi-information', text: 'About' }
]

export default defineComponent({
  name: 'MenuItem',
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
    const menuItemStore = useMenuItemStore(props.id)()
    const modeStore = useModeStore()

    onMounted(() => {
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
      document.documentElement.style.setProperty('--half-fade-duration', `${halfFadeDuration}ms`)

      // Reapply state and classes when component is mounted
      reapplyStateAndClasses()
    })

    onBeforeUnmount(() => {
      // Optional: Save any state that needs to persist before the component is unmounted
    })

    const showComponent = computed(() => menuItemStore.showComponent)
    const hasPosition = computed(() => menuItemStore.hasPosition)
    const pivotComponent = computed(() => menuItemStore.pivotComponent)
    const uniqueId = `#menu-item-${props.id}`
    let pivotUpAmount: number = 0

    const currentModeText = computed(() => {
      if (props.id === 'mode') {
        return modeStore.text
      }
      return props.text
    })

    const currentModeIcon = computed(() => {
      if (props.id === 'mode') {
        return modeStore.icon
      }
      return props.icon
    })

    const goTo = () => {
      if (props.id === 'help') {
        MaestroService.goToHelp()
      } else if (props.id === 'settings') {
        MaestroService.goToSettings()
      } else if (props.id === 'about') {
        MaestroService.goToAbout()
      }
    }

    watch(hasPosition, (newValue) => {
      if (newValue === 'left') {
        console.log(`New value: ${newValue}`)
        animateSlideLeft()
      } else {
        animateSlideCenter()
      }
    })

    watch(pivotComponent, (newValue) => {
      if (props.id === 'help') {
        pivotUpAmount = -466
      } else if (props.id === 'settings') {
        pivotUpAmount = -566
      } else if (props.id === 'about') {
        pivotUpAmount = -566
      }
      if (newValue) {
        animatePivotUp()
      } else {
        animatePivotDown()
      }
    })

    const reapplyStateAndClasses = () => {
      if (menuItemStore.hasPosition === 'left') {
        console.log('Reapplying slide left')
        animateSlideLeft()
      } else {
        animateSlideCenter()
      }

      if (menuItemStore.pivotComponent) {
        animatePivotUp()
      } else {
        animatePivotDown()
      }
    }

    const animateSlideLeft = () => {
      const menuItem = document.querySelector(uniqueId)
      if (menuItem) {
        menuItem.classList.remove('slide-center', 'pivot-up', 'pivot-down')
        console.log('Removed slide-center, pivot-up, pivot-down')
        menuItem.classList.add('slide-left')
        console.log('Added slide-left')
      }
    }

    const animateSlideCenter = () => {
      console.log('Animating slide center')
      const menuItem = document.querySelector(uniqueId)
      if (menuItem) {
        menuItem.classList.remove('slide-left', 'pivot-up', 'pivot-down')
        console.log('Removed slide-left, pivot-up, pivot-down')
        menuItem.classList.add('slide-center')
        console.log('Added slide-center')
      }
    }

    const animatePivotUp = () => {
      const menuItem = document.querySelector(uniqueId)
      if (menuItem) {
        menuItem.setAttribute('style', `--pivot-amount: ${pivotUpAmount}%`)
        menuItem.classList.remove('pivot-down', 'slide-center', 'slide-left')
        console.log('Removed pivot-down, slide-center, slide-left')
        menuItem.classList.add('pivot-up')
        console.log('Added pivot-up')
      }
    }

    const animatePivotDown = () => {
      const menuItem = document.querySelector(uniqueId)
      if (menuItem) {
        menuItem.classList.remove('pivot-up', 'slide-center', 'slide-left')
        console.log('Removed pivot-up, slide-center, slide-left')
        menuItem.classList.add('pivot-down')
        console.log('Added pivot-down')
      }
    }

    return {
      goTo,
      uniqueId,
      pivotComponent,
      currentModeText,
      currentModeIcon,
      showComponent
    }
  }
})
</script>

<template>
  <v-sheet
    v-if="showComponent"
    :id="uniqueId.slice(1)"
    class="menu-item start-left"
    color="transparent"
    @click="goTo"
    dense
    flat
    tile
  >
    <div class="content">
      <v-icon :class="['icon', 'animated-icon']" color="white" size="24">{{
        currentModeIcon
      }}</v-icon>
      <span :class="['text', 'animated-text']">{{ currentModeText }}</span>
    </div>
  </v-sheet>
</template>

<style scoped>
.menu-item {
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

.start-left {
  transform: translateX(-100%);
}

.slide-left {
  transition: transform var(--slide-duration) ease-in-out;
  transform: translateX(-100%);
}

.slide-center {
  transition: transform var(--slide-duration) ease-in-out;
  transform: translateX(0%);
}

.pivot-up {
  transition:
    transform var(--slide-duration) ease-in-out,
    opacity var(--slide-duration) ease-in-out,
    visibility var(--slide-duration);
  transform: translateY(var(--pivot-amount, -737%));
  opacity: 0;
  visibility: hidden;
}

.pivot-down {
  transition:
    transform var(--slide-duration) ease-in-out,
    opacity var(--slide-duration) ease-in-out,
    visibility var(--slide-duration);
  transform: translateY(0%);
  opacity: 100%;
  visibility: visible;
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
  margin-right: 16px; /* Space between the icon and text */
}

.text {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}
</style>
