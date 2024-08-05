<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { fadeDuration } from '../utils/animationUtils'

export default defineComponent({
  name: 'SocialTwitter',
  props: {
    twitterHandle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  setup() {
    onMounted(() => {
      document.documentElement.style.setProperty('--fade-duration', `${fadeDuration}ms`)
    })
  }
})
</script>

<template>
  <div
    class="twitter-link-container"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <a
      :href="`https://twitter.com/${twitterHandle}`"
      target="_blank"
      rel="noopener noreferrer"
      class="twitter-link"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="twitter-icon"
        viewBox="0 0 24 24"
        :class="{ 'icon-hovered': isHovered }"
      >
        <path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        />
      </svg>
      <span class="twitter-handle" :class="{ 'handle-hovered': isHovered }">
        {{ twitterHandle }}
      </span>
    </a>
  </div>
</template>

<style scoped>
.twitter-link-container {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3a3a3a;
  border-radius: 30px;
  transition: background-color var(--fade-duration) ease;
}

.twitter-link-container:hover {
  background-color: #3a3a3a;
}

.twitter-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
}

.twitter-icon {
  width: 24px;
  height: 24px;
  fill: #ffffff;
  margin-right: 10px;
  transition:
    fill 0.3s ease,
    transform 0.3s ease;
}

.icon-hovered {
  fill: #1da1f2;
  transform: scale(1.1);
}

.twitter-handle {
  font-size: 1rem;
  font-weight: bold;
  transition: color 0.3s ease;
}

.handle-hovered {
  color: #1da1f2;
}
</style>
