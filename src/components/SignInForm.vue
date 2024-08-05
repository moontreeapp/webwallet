<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import TextField from '@/components/TextField.vue'
import ButtonComponent from '@/components/Button.vue'
import { useSignInFormStore } from '@/stores/useSignInFormStore'
import { fadeDuration, slideDuration } from '@/utils/animationUtils'
import { MaestroService } from '@/services/MaestroService'

export default defineComponent({
  name: 'SignInForm',
  components: {
    TextField,
    ButtonComponent
  },

  setup() {
    onMounted(() => {
      // set the CSS variable
      document.documentElement.style.setProperty('--slide-duration', `${slideDuration}ms`)
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })

    const message = 'Welcome Back'
    const signInFormStore = useSignInFormStore()
    const showComponent = computed(() => signInFormStore.showComponent)
    const isFaded = computed(() => {
      console.log('Setting Faded')
      if (signInFormStore.isFaded === true) {
        return 'faded-opacity-0'
      } else if (signInFormStore.isFaded === false) {
        return 'full-opacity'
      } else {
        return 'full-opacity'
      }
    })

    const handleClick = () => {
      console.log('Button clicked')
      MaestroService.goToConnectYourPhone()
      // MaestroService.goToHoldings()
    }

    return {
      message,
      showComponent,
      isFaded,
      handleClick
    }
  }
})
</script>

<template>
  <v-sheet :class="isFaded" class="sign-in-sheet" v-show="showComponent">
    <div class="top-container">
      <div class="message-container">
        <div class="title">Magic</div>
        <div class="message">{{ message }}</div>
      </div>
    </div>
    <div class="bottom-container">
      <ButtonComponent
        @click="handleClick"
        class="sign-in-button"
        text="Let's Go"
        size="large"
        :priority="false"
      />
    </div>
  </v-sheet>
</template>

<style scoped>
.sign-in-sheet {
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
}

.top-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #121212;
}

.message-container {
  text-align: center;
}

.title {
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  font-weight: 400;
  color: white;
  margin-bottom: 12px;
}

.message {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
}

.bottom-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
  padding-left: 16px;
  background-color: #121212;
}

.sign-in-button {
  width: 100%;
  max-width: 328px;
  background-color: #8bc34a;
  font-size: 1rem;
  border-radius: 24px;
}
</style>
