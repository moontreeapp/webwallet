<script lang="ts">
import BackSheet from '@/components/BackSheet.vue'
import FrontSheet from '@/components/FrontSheet.vue'
import NavBar from '@/components/NavBar.vue'
import { defineComponent, onMounted } from 'vue'
import { MaestroService } from '@/services/MaestroService'
import Snackbar from '@/components/Snackbar.vue'

export default defineComponent({
  name: 'MainView',
  components: {
    BackSheet,
    FrontSheet,
    NavBar,
    Snackbar
  },
  setup() {
    onMounted(() => {
      console.log('MainView mounted')
      MaestroService.goToWelcomeToMagic()
    })
  }
})
</script>

<template>
  <div class="sheet-container">
    <BackSheet />
    <FrontSheet />
    <Snackbar />
    <NavBar />
  </div>
</template>

<style scoped>
.sheet-container {
  position: relative;
  width: 328px;
  height: 600px;
  overflow: hidden;
}
</style>
