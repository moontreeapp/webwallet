<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useHoldingHeaderStore } from '@/stores/useHoldingHeaderStore'
import { fadeDuration, halfFadeDuration, slideDuration } from '@/utils/animationUtils'
import HoldingButtons from './HoldingButtons.vue'
import { useHoldingButtonsStore } from '@/stores/useHoldingButtonsStore'
import { useHoldingStore } from '../stores/useHoldingStore'

const holdingHeaderStore = useHoldingHeaderStore()
const holdingStore = useHoldingStore()
const holdingButtonsStore = useHoldingButtonsStore()

const showFiatValue = ref(false)

onMounted(() => {
  document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
  document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
  document.documentElement.style.setProperty('--half-fade-duration', `${halfFadeDuration}ms`)
})

const holdingFiatValue = computed(() => holdingStore.holding.fiatValue)
const iconColor = computed(() => holdingStore.holding?.iconColor)
const showComponent = computed(() => holdingHeaderStore.showComponent)
const isFaded = computed(() => (holdingHeaderStore.isFaded ? 'faded-opacity-2' : 'full-opacity'))
const isTitleFaded = computed(() =>
  holdingHeaderStore.isTitleFaded ? 'faded-opacity-0' : 'full-opacity'
)
const isSubTitleFaded = computed(() =>
  holdingHeaderStore.isSubTitleFaded ? 'faded-opacity-0' : 'full-opacity'
)
const hasPosition = computed(() => {
  switch (holdingHeaderStore.hasPosition) {
    case 'left':
      return 'slide-left'
    case 'right':
      return 'slide-right'
    default:
      return 'slide-center'
  }
})

const formatNumberWithCommas = (value: string): string => {
  return /^\d+$/.test(value) ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value
}

const holding = computed(() => holdingHeaderStore.holding)
const rawTitle = computed(() => holdingHeaderStore.title)
const titleTrailing = computed(() =>
  holdingHeaderStore.titleTrailing ? `.${holdingHeaderStore.titleTrailing}` : ''
)

const fiatValuePreceding = computed(() => {
  if (!holdingFiatValue.value) return ''
  return holdingFiatValue.value.split('.')[0]
})

const fiatValueTrailing = computed(() => {
  if (!holdingFiatValue.value) return ''
  const parts = holdingFiatValue.value.split('.')
  return parts.length > 1 ? parts[1] : ''
})

const toggledTitle = computed(() => {
  if (showFiatValue.value && holdingFiatValue.value) {
    return `$${fiatValuePreceding.value}`
  } else {
    return formatNumberWithCommas(rawTitle.value)
  }
})

const toggledTitleTrailing = computed(() => {
  if (showFiatValue.value && holdingFiatValue.value) {
    return fiatValueTrailing.value ? `.${fiatValueTrailing.value}` : ''
  } else {
    return titleTrailing.value
  }
})

const subTitle = computed(() => holdingHeaderStore.subTitle)
const subTitleIcon = computed(() => holdingHeaderStore.subTitleIcon)
const subTitleType = computed(() => (/^\d+(\.\d+)?$/.test(subTitle.value) ? 'value' : 'message'))
const showSubTitle = computed(() => holdingHeaderStore.showSubTitle)
const holdingIcon = computed(() => {
  const iconUrl = new URL(
    `../assets/coin_logos/${holding.value.toLowerCase()}_logo.png`,
    import.meta.url
  ).href
  return iconUrl.includes('undefined') ? null : iconUrl
})
const showButtons = computed(() => (holdingButtonsStore.showComponent ? '' : 'center-content'))

const toggleTitle = async () => {
  if (holdingFiatValue.value) {
    const holdingHeaderStore = useHoldingHeaderStore()
    holdingHeaderStore.toggleTitleOpacity()
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    showFiatValue.value = !showFiatValue.value
    holdingHeaderStore.toggleTitleOpacity()
  }
}

const isTitleClickable = computed(() => !!holdingFiatValue.value)
</script>

<template>
  <div v-if="showComponent" :class="hasPosition">
    <div :class="isFaded">
      <v-sheet class="holding-amount slide-center" color="transparent" dense flat>
        <div class="inner-container">
          <div
            :class="[
              'content-wrapper',
              showButtons,
              {
                'center-content': showButtons,
                'center-content-no-subtitle': showButtons && !showSubTitle
              }
            ]"
          >
            <div class="image-container" :style="{ backgroundColor: holdingIcon ? '' : iconColor }">
              <img v-if="holdingIcon" :src="holdingIcon" alt="Icon" class="logo" />
              <span v-else class="icon-letter">{{ holding.charAt(0).toUpperCase() }}</span>
            </div>

            <div class="content">
              <div class="title-container" :class="isTitleFaded">
                <div class="title" :class="{ clickable: isTitleClickable }" @click="toggleTitle">
                  {{ toggledTitle }}<span class="title-trailing">{{ toggledTitleTrailing }}</span>
                </div>
              </div>
              <div class="subtitle-container" :class="{ 'subtitle-hidden': !showSubTitle }">
                <div :class="isSubTitleFaded">
                  <div class="sub-title">
                    <v-icon
                      v-show="subTitleIcon"
                      :icon="subTitleIcon"
                      size="16"
                      class="sub-title-icon"
                    ></v-icon>
                    <span class="sub-title-text">
                      {{ subTitleType === 'value' ? `$${subTitle}` : subTitle }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HoldingButtons />
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<style scoped>
.holding-amount {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 328px;
  height: 182px;
  color: white;
  z-index: 3;
  transition: opacity var(--fade-duration) ease-in-out;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

.inner-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  transition:
    transform var(--slide-duration) ease-in-out,
    opacity var(--fade-duration) ease-in-out;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 108px;
  transition: transform var(--slide-duration) ease-in-out;
  z-index: 4;
}

.center-content {
  transform: translateY(20%);
  transition: transform var(--slide-duration) ease-in-out;
}

.center-content-no-subtitle {
  transform: translateY(17%);
  transition: transform var(--slide-duration) ease-in-out;
}

.center-content:not(.center-content-no-subtitle) {
  transform: translateY(10%);
}

.slide-center {
  transition: transform var(--slide-duration) ease-in-out;
  transform: translateX(0%);
}

.slide-left {
  transition: transform var(--slide-duration) ease-in-out;
  transform: translateX(-100%);
}

.slide-right {
  transition: transform var(--slide-duration) ease-in-out;
  transform: translateX(100%);
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-bottom: 12px;
  position: relative;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.icon-letter {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.87);
  position: absolute;
}

.content {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 64px;
  position: relative;
}

.title-container {
  transition:
    transform var(--slide-duration) ease-in-out,
    opacity var(--fade-duration) ease-in-out;
}

.title-container.faded-opacity-0 {
  opacity: 0;
}

.subtitle-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  transition: opacity var(--fade-duration) ease-in-out;
}

.subtitle-container.subtitle-hidden {
  opacity: 0;
  pointer-events: none;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  line-height: 24px;
  margin-bottom: 16px;
  transition: opacity var(--fade-duration) ease-in-out;
}

.title.clickable {
  cursor: pointer;
}

.title .title-trailing {
  font-size: 1.5rem;
  opacity: 0.6;
  font-weight: bold;
}

.sub-title {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.6;
  color: white;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sub-title-icon {
  margin-right: 4px;
  font-size: 16px;
}

.sub-title-text {
  line-height: 16px;
}
</style>
