<script lang="ts">
import { defineComponent, ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useFrontSheetStore, type SheetState } from '@/stores/useFrontSheetStore'
import { fadeDuration, slideDuration } from '@/utils/animationUtils'
import Onboarding from '@/components/Onboarding.vue'
import SignInForm from '@/components/SignInForm.vue'
import HoldingsList from '@/components/HoldingsList.vue'
// Lazy load all components
const HistoryListItem = () => import('@/components/HistoryListItem.vue')
const SendPreviewForm = () => import('@/components/SendPreviewForm.vue')
const Receive = () => import('@/components/Receive.vue')
const TransactionHistory = () => import('./TransactionHistory.vue')
const QrCodeScanner = () => import('@/components/QrCodeScanner.vue')
const SendQr = () => import('./SendQr.vue')
const Swap = () => import('./Swap.vue')
const Mint = () => import('./Mint.vue')

export default defineComponent({
  name: 'FrontSheet',
  components: {
    HistoryListItem,
    Onboarding,
    SignInForm,
    SendPreviewForm,
    Swap,
    Mint,
    SendQr,
    HoldingsList,
    Receive,
    TransactionHistory,
    QrCodeScanner
  },
  setup() {
    onMounted(() => {
      // set the CSS variable
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
      window.addEventListener('wheel', onScroll, { passive: true })
    })
    onUnmounted(() => {
      window.removeEventListener('wheel', onScroll)
      if (scrollTimeout !== undefined) {
        clearTimeout(scrollTimeout)
      }
    })

    const frontSheetStore = useFrontSheetStore()
    const translateY = ref(100) // Initial position for the 'full' state
    const borderRadius = computed(() => frontSheetStore.radius)
    const backgroundColor = computed(() => frontSheetStore.color)

    const snapPoints = {
      low: 90.67,
      mid: 39.66,
      high: 9.33,
      full: 0
    }

    // Watch store state to reactively update translateY to snap position
    watch(
      () => frontSheetStore.heightState,
      (newState) => {
        translateY.value = snapPoints[newState]
        console.log('State changed to:', newState, 'Snapping translateY to:', translateY.value)
      },
      { immediate: true }
    )

    let scrollTimeout: number | undefined

    const onScroll = (e: WheelEvent) => {
      clearTimeout(scrollTimeout)
      const scrollAmount = e.deltaY * -0.2 // Invert the scroll direction
      translateY.value = Math.min(
        Math.max(translateY.value + scrollAmount, snapPoints.full),
        snapPoints.low
      )
      console.log('Scrolling - Current translateY:', translateY.value)

      scrollTimeout = window.setTimeout(() => {
        snapToClosestState()
      }, 400) // Short delay to decide on state post-scroll
    }

    const snapToClosestState = () => {
      const closestState = Object.entries(snapPoints).reduce((closest, [state, y]) => {
        return Math.abs(y - translateY.value) <
          Math.abs(snapPoints[closest as SheetState] - translateY.value)
          ? (state as SheetState)
          : closest
      }, 'low' as SheetState)

      console.log(
        'Determined closest state:',
        closestState,
        'based on translateY:',
        translateY.value
      )

      if (frontSheetStore.heightState !== closestState) {
        frontSheetStore.setHeight(closestState)
        console.log('State updated to:', closestState)
      } else {
        // Manually trigger the update if state is the same to handle edge cases
        translateY.value = snapPoints[closestState]
        console.log('State is the same, manually snapping translateY to:', translateY.value)
      }
    }

    return { translateY, borderRadius, backgroundColor }
  }
})
</script>

<template>
  <v-sheet
    class="front-sheet"
    :style="{
      transform: `translateY(${translateY}%)`,
      borderRadius: borderRadius,
      backgroundColor: backgroundColor
    }"
  >
    <Onboarding />
    <SignInForm />
    <SendPreviewForm />
    <SendQr />
    <QrCodeScanner />
    <Receive />
    <TransactionHistory />
    <Swap />
    <Mint />

    <HoldingsList />

    <HistoryListItem inOrOut="in" date="Today" amount="21,000" />
    <HistoryListItem inOrOut="out" date="Yesterday" amount="1,253.11" />
    <HistoryListItem inOrOut="in" date="Yesterday" amount="165.72" />
    <HistoryListItem inOrOut="out" date="Yesterday" amount="30,245.54" />
  </v-sheet>
</template>

<style scoped>
.front-sheet {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 600px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  transform: translateY(100%);
  transition:
    transform var(--slide-duration) ease-in-out,
    border-radius var(--slide-duration) ease-in-out,
    background-color var(--slide-duration) ease-in-out;
}
</style>
