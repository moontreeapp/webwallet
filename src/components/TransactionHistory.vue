<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { fadeDuration } from '@/utils/animationUtils'
import { useTransactionHistoryStore } from '@/stores/useTransactionHistoryStore'
import TextButton from '@/components/TextButton.vue'

export default defineComponent({
  name: 'TransactionHistory',
  components: {
    TextButton
  },
  setup() {
    onMounted(() => {
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })

    const transactionHistoryStore = useTransactionHistoryStore()
    const showComponent = computed(() => transactionHistoryStore.showComponent)
    const isFaded = computed(() => {
      if (transactionHistoryStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (transactionHistoryStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const amountPreceding = computed(() => transactionHistoryStore.amountPreceding)
    const amountTrailing = computed(() => transactionHistoryStore.amountTrailing)
    const inOrOut = computed(() => transactionHistoryStore.inOrOut)
    const to = computed(() => transactionHistoryStore.to)

    const date = computed(() => {
      const rawDate = transactionHistoryStore.date
      const [month, day, year] = rawDate.split('/').map(Number)
      const dateObject = new Date(year, month - 1, day)
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(dateObject)
    })

    const time = computed(() => `${transactionHistoryStore.time.slice(0, 5)} GMT`)

    const firstLastSix = computed(() => to.value.slice(0, 6) + '...' + to.value.slice(-6))
    const amountSign = computed(() => (inOrOut.value === 'in' ? '+' : '-'))
    const amountColor = computed(() => (inOrOut.value === 'in' ? 'green' : ''))
    const amountWeight = computed(() => (inOrOut.value === 'in' ? '700' : '600'))

    const viewMore = () => {
      console.log('View More')
    }

    return {
      isFaded,
      showComponent,
      firstLastSix,
      amountSign,
      amountColor,
      amountWeight,
      amountPreceding,
      amountTrailing,
      to,
      date,
      time,
      viewMore
    }
  }
})
</script>

<template>
  <div v-show="showComponent" class="wrapper">
    <v-sheet :class="isFaded" class="transaction-list-item">
      <div class="content-container">
        <div class="text-container">
          <div class="title">Id:</div>
        </div>
      </div>
      <div>
        <span class="to">{{ firstLastSix }}</span>
      </div>
    </v-sheet>
    <v-sheet :class="isFaded" class="transaction-list-item">
      <div class="content-container">
        <div class="text-container">
          <div class="title">Amount:</div>
        </div>
      </div>
      <div class="amount" :style="{ fontWeight: amountWeight }">
        <span :class="{ green: amountColor }">{{ amountSign }}</span>
        <span :class="{ green: amountColor }">{{ amountPreceding }}</span>
        <span class="trailing" :class="{ green: amountColor }">.{{ amountTrailing }}</span>
      </div>
    </v-sheet>
    <v-sheet :class="isFaded" class="transaction-list-item">
      <div class="content-container">
        <div class="text-container">
          <div class="title">Date:</div>
        </div>
      </div>
      <span class="time-date">{{ date }}</span>
    </v-sheet>
    <v-sheet :class="isFaded" class="transaction-list-item">
      <div class="content-container">
        <div class="text-container">
          <div class="title">Time:</div>
        </div>
      </div>
      <span class="time-date">{{ time }}</span>
    </v-sheet>

    <span class="spacer"></span>

    <TextButton text="View Details" size="large" @click="viewMore" />
  </div>
</template>

<style scoped>
.wrapper {
  display: contents;
}

.transaction-list-item {
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

.time-date {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.6;
  color: white;
}

.spacer {
  height: 150px;
}

.content-container {
  display: flex;
  align-items: center;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  opacity: 0.87;
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
  opacity: 0.6;
}

.trailing {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.67;
  color: white;
}

.to {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.6;
  color: white;
}

.green {
  color: #34c759;
}
</style>
