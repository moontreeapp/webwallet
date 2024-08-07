<script lang="ts">
import { defineComponent, computed } from 'vue'
import { MaestroService } from '@/services/MaestroService'
import { useMaestroPlaceStore } from '../stores/useMaestroPlaceStore'
import { useAppBarButtonStore } from '../stores/useAppBarButtonStore'
import { useAppBarTitleStore } from '../stores/useAppBarTitleStore'
import { useReceiveStore } from '@/stores/useReceiveStore'
import { useHoldingStore } from '../stores/useHoldingStore'

export default defineComponent({
  name: 'AppBar',
  setup() {
    const maestroPlaceStore = useMaestroPlaceStore()
    const currentPlace = computed(() => maestroPlaceStore.place)
    const appBarButtonStore = useAppBarButtonStore()
    const appBarTitleStore = useAppBarTitleStore()
    const holdingStore = useHoldingStore()

    const goToAppBarButton = async () => {
      if (currentPlace.value === 'history' || currentPlace.value === 'menu') {
        console.log('Go to holdings')
        MaestroService.goToHoldings()
      } else if (currentPlace.value === 'send-preview') {
        // use the sendFormStore to determine which holding history to go back to.
        MaestroService.goToHistory(holdingStore.holding)
      } else if (currentPlace.value === 'send-qr') {
        console.log('Go to send preview')
        MaestroService.goToSendPreview()
      } else if (currentPlace.value === 'receive') {
        // use the receiveStore to determine which holding history to go back to.
        MaestroService.goToHistory(holdingStore.holding)
      } else if (currentPlace.value === 'transaction') {
        console.log('Go to history')
        MaestroService.goToHistory()
      } else if (currentPlace.value === 'qr-code-scanner') {
        console.log('Go to send preview')
        MaestroService.goToSendPreview()
      } else if (currentPlace.value === 'swap' || currentPlace.value === 'mint') {
        console.log('Go to history')
        MaestroService.goToHistory()
      } else {
        console.log('Go to menu')
        await MaestroService.goToMenu()
      }
    }

    const currentIcon = computed(() => appBarButtonStore.icon)
    const showButton = computed(() => appBarButtonStore.showComponent)
    const currentTitle = computed(() => appBarTitleStore.title)

    return {
      goToAppBarButton,
      currentIcon,
      currentTitle,
      showButton
    }
  }
})
</script>

<template>
  <v-sheet class="app-bar" color="transparent" dense flat>
    <div class="content">
      <v-btn
        icon
        class="menu-button"
        v-show="showButton"
        color="transparent"
        elevation="0"
        @click="goToAppBarButton"
      >
        <transition name="icon-fade" mode="out-in">
          <v-icon :key="currentIcon" size="24" color="white">{{
            currentIcon === 'menu' ? 'mdi-menu' : 'mdi-chevron-left'
          }}</v-icon>
        </transition>
      </v-btn>
      <transition name="title-fade" mode="out-in">
        <div :key="currentTitle">
          <img
            v-if="currentTitle === 'Magic'"
            src="@/assets/magic_logos/text_logo_white.svg"
            alt="Magic"
            class="magic-logo"
          />
          <span v-else :class="['title', currentTitle]">{{ currentTitle }}</span>
        </div>
      </transition>
    </div>
    <!-- Future expand button for full screen version -->
    <!-- <v-btn icon class="expand-button" color="transparent" elevation="0">
      <v-icon size="24" color="white">mdi-arrow-expand-all</v-icon>
    </v-btn> -->
  </v-sheet>
</template>

<style scoped>
.app-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 328px;
  height: 56px;
  background-color: #673ab7;
  color: white;
  padding: 0 0.8rem;
  box-sizing: border-box;
  z-index: 2;
}

.content {
  display: flex;
  align-items: center;
}

.menu-button,
.expand-button {
  width: 40px;
  height: 40px;
}

.title {
  font-size: 1rem;
  margin-left: 0.2rem;
  font-weight: 600;
  color: white;
}

.Magic {
  font-family: 'Pacifico', cursive;
  font-weight: 400;
}

.icon-fade-enter-active,
.icon-fade-leave-active,
.title-fade-enter-active,
.title-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.icon-fade-enter,
.icon-fade-leave-to,
.title-fade-enter,
.title-fade-leave-to {
  opacity: 0;
}

.magic-logo {
  height: 24px;
  margin-left: 0.2rem;
  margin-top: 0.825rem;
}
</style>
