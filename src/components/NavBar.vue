<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useFrontSheetStore } from '@/stores/useFrontSheetStore'
import { useNavBarStore } from '@/stores/useNavBarStore'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const frontSheetStore = useFrontSheetStore()
    const translateY = computed(() => {
      return frontSheetStore.heightState === 'low' ? '100%' : '0'
    })

    const navBarStore = useNavBarStore()
    const showComponent = computed(() => navBarStore.showComponent)

    return { translateY, showComponent }
  }
})
</script>

<template>
  <v-sheet
    class="nav-bar"
    v-show="showComponent"
    :style="{ transform: `translateY(${translateY})` }"
    dense
    flat
    tile
  >
    <v-row class="ma-0 pa-0" justify="space-around" align="center" no-gutters>
      <v-col class="nav-item ma-0 pa-0" cols="4" text-center>
        <v-icon size="24">mdi-wallet</v-icon>
        <div class="nav-label">Wallet</div>
      </v-col>
      <v-col class="nav-item ma-0 pa-0" cols="4" text-center>
        <v-icon size="24">mdi-star-circle</v-icon>
        <div class="nav-label">Mint</div>
      </v-col>
      <v-col class="nav-item ma-0 pa-0" cols="4" text-center>
        <v-icon size="24">mdi-swap-horizontal</v-icon>
        <div class="nav-label">Swap</div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>
.nav-bar {
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 328px;
  height: 56px;
  z-index: 5;
  box-sizing: border-box;
  display: flex; /* Use flexbox to align children */
  align-items: center; /* Center children vertically */
  transition: transform 0.3s ease-in-out; /* Adjust duration as desired */
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center the flex items vertically */
  height: 100%; /* Set the height to fill the parent */
}

.nav-label {
  font-size: 0.75rem;
  font-weight: bold;
}
</style>
