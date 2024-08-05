<script lang="ts">
import { computed, defineComponent } from 'vue'
import PortfolioValue from '@/components/PortfolioValue.vue'
import HoldingAmount from './HoldingHeader.vue'
import { useBacksheetTopContainerStore } from '../stores/useBacksheetTopContainerStore'

export default defineComponent({
  name: 'BackSheetTopContainer',
  components: {
    PortfolioValue,
    HoldingAmount
  },
  setup() {
    const backsheetTopContainerStore = useBacksheetTopContainerStore()
    const showComponent = computed(() => backsheetTopContainerStore.showComponent)

    return {
      showComponent
    }
  }
})
</script>

<template>
  <v-sheet v-show="showComponent" class="back-sheet-top-container" color="transparent" dense flat>
    <div class="component-container">
      <PortfolioValue class="component" />
      <HoldingAmount class="component" />
    </div>
  </v-sheet>
</template>

<style scoped>
.back-sheet-top-container {
  width: 328px;
  height: 182px;
  color: white;
  z-index: 2;
  position: relative;
}

.component-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
