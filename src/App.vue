<script lang="ts">
import { RouterView } from 'vue-router'
import { VMain } from 'vuetify/components'
import { defineComponent, onMounted } from 'vue'
// import { HoldingsListService } from './services/HoldingsListService'

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
    VMain
  },
  setup() {
    // Init the holding service
    // const holdingsListService = new HoldingsListService()
    // onMounted(async () => {
    //   await holdingsListService.fetchHoldings();
    // })
  }
})
</script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  background-color: black;
}
</style>
