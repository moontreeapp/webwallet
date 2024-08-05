<script lang="ts">
import { computed, defineComponent, onMounted, type PropType } from 'vue'
import { MaestroService } from '@/services/MaestroService'
import { useHistoryListItemStore } from '@/stores/useHistoryListItemStore'
import { fadeDuration, slideDuration } from '@/utils/animationUtils'

export default defineComponent({
  name: 'HistoryListItem',
  props: {
    inOrOut: { type: String as PropType<'in' | 'out'>, required: true },
    date: { type: String, required: true },
    amount: { type: String, required: true }
  },
  setup(props) {
    onMounted(() => {
      // set the CSS variable
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })

    const inOrOut = props.inOrOut
    const historyListItemStore = useHistoryListItemStore()
    const showComponent = computed(() => historyListItemStore.showComponent)
    const amountSign = computed(() => {
      const sign: string = props.inOrOut === 'in' ? '+' : '-'
      return `${sign}`
    })
    const amountPreceding: string = props.amount.split('.')[0]
    const amountTrailing: string | undefined = props.amount.split('.')[1]
    const amountWeight = computed(() => {
      return props.inOrOut === 'in' ? '700' : '600'
    })
    const amountColor = computed(() => {
      return props.inOrOut === 'in' ? 'green' : ''
    })
    const isFaded = computed(() => {
      if (historyListItemStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (historyListItemStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const icon = computed(() => {
      const iconUrl = new URL(
        `../assets/${props.inOrOut === 'in' ? 'in_arrow' : 'out_arrow'}.svg`,
        import.meta.url
      ).href
      return iconUrl.includes('undefined') ? undefined : iconUrl
    })

    const goToTransaction = () => {
      console.log('Go to transaction')
      MaestroService.goToTransaction()
    }

    return {
      goToTransaction,
      isFaded,
      showComponent,
      amountSign,
      amountPreceding,
      amountTrailing,
      amountWeight,
      amountColor,
      icon,
      inOrOut
    }
  }
})
</script>

<template>
  <v-sheet
    :class="isFaded"
    class="history-list-item clickable"
    @click="goToTransaction"
    v-show="showComponent"
  >
    <div class="content-container">
      <div class="icon-container">
        <img class="in-out-icon" :src="icon" alt="Transaction Icon" />
      </div>
      <div class="text-container">
        <div class="date">{{ date }}</div>
      </div>
    </div>
    <div class="amount" :style="{ fontWeight: amountWeight }">
      <span :class="{ green: amountColor }">{{ amountSign }}</span>
      <span :class="{ green: amountColor }">{{ amountPreceding }}</span>
      <span v-if="amountTrailing" class="trailing" :class="{ green: amountColor }"
        >.{{ amountTrailing }}</span
      >
    </div>
  </v-sheet>
</template>

<style scoped>
.history-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: relative;
  width: 100%;
  height: 64px;
  background: transparent;
  z-index: 4;
  border-radius: 16px;
}

.content-container {
  display: flex;
  align-items: center;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #3a3a3a;
  border-radius: 50%;
  margin-right: 12px;
  position: relative; /* Added */
}

.in-out-icon {
  width: 24px;
  height: 24px;
  position: absolute; /* Added */
}

.text-container {
  display: flex;
  flex-direction: column;
}

.date {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.6;
  color: white;
}

.amount {
  font-size: 1rem;
  color: white;
  opacity: 0.87;
}

.trailing {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.67;
  color: white;
}

.green {
  color: #34c759;
}
</style>
