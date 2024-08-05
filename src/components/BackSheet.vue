<script lang="ts">
import { defineComponent } from 'vue'
import AppBar from '@/components/AppBar.vue'
import BackSheetTopContainer from '@/components/BackSheetTopContainer.vue'
import { menuItems } from './MenuItem.vue'
import MenuItem from './MenuItem.vue'
import About from './About.vue'
import SettingItem, { settingItems } from './SettingsItem.vue'
import Help from './Help.vue'

export default defineComponent({
  name: 'BackSheet',
  components: {
    AppBar,
    BackSheetTopContainer,
    MenuItem,
    SettingItem,
    About,
    Help
  },
  setup() {
    const backMenuItems = menuItems
    const settingMenuItems = settingItems
    return {
      backMenuItems,
      settingMenuItems
    }
  }
})
</script>

<template>
  <v-sheet class="back-sheet">
    <AppBar />
    <BackSheetTopContainer />
    <SettingItem
      v-for="item in settingMenuItems"
      :key="item.id"
      :id="item.id"
      :icon="item.icon"
      :text="item.text"
    />
    <MenuItem
      v-for="item in backMenuItems"
      :key="item.id"
      :id="item.id"
      :icon="item.icon"
      :text="item.text"
    />
    <About />
    <Help />
  </v-sheet>
</template>

<style scoped>
.back-sheet {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 18, 18);
  z-index: 1;
}

.menu-button {
  position: absolute;
  z-index: 2;
  padding: 8px;
  min-width: 48px;
  min-height: 48px;
}
</style>
