<template>
  <div @click="handleClick">
    <span class="i-icon-park-outline:setting-two"></span>
    <BaseDrawer
      direction="rtl"
      :title="$t('all.layout.setting.title')"
      :size="320"
      append-to-body
      destroy-on-close
      :show-cancel-btn="false"
      :show-confirm-btn="false"
      @register="register"
    >
      <div class="w-full overflow-hidden text-black flex flex-col">
          <!-- <el-divider>{{ t('layout.setting.darkMode') }}</el-divider> -->
          <!-- <AppDarkModeToggle class="text-2xl" /> -->

          <el-divider>{{ t('all.layout.setting.navMode') }}</el-divider>
          <MenuModePicker :def="getMenuMode" @change="handleMenuModeChange" />

          <el-divider>{{ t('all.layout.setting.sysTheme') }}</el-divider>
          <ThemeColorPicker
              :color-list="THEME_PRESET_COLOR_LIST"
              :cursor="getThemeColor"
              @change="handleSystemThemeChange"
          />

          <el-divider>{{ t('all.layout.setting.headerTheme') }}</el-divider>
          <ThemeColorPicker
              :color-list="HEADER_PRESET_BG_COLOR_LIST"
              :cursor="getHeaderBgColor"
              @change="handleHeaderBgChange"
          />

          <el-divider>{{ t('all.layout.setting.sidebarTheme') }}</el-divider>
          <ThemeColorPicker
              :color-list="SIDE_BAR_BG_COLOR_LIST"
              :cursor="getSideMenuBgColor"
              @change="handleSideMenuBgChange"
          />

          <el-divider>{{ t('all.layout.setting.interfaceFunction') }}</el-divider>
          <SwitchItem
              :title="t('all.layout.setting.menuCollapse')"
              :def="getCollapsed"
              @change="handleMenuCollapsedChange"
              :disabled="disableSidebarRelSetting && !getIsMobile"
          />
          <SwitchItem
              :title="t('all.layout.setting.menuAccordion')"
              :def="getUniqueOpened"
              @change="handleMenuUniqueOpenChange"
              :disabled="disableSidebarRelSetting && !getIsMobile"
          />
          <SwitchItem
              :title="t('all.layout.setting.fixedHeader')"
              :def="getFixed"
              @change="handleHeaderFixedChange"
          />
          <SelectItem
              :title="t('all.layout.setting.menuCollapseButton')"
              :cursor="getMenuTrigger"
              :options="menuCollapseButtonOptions"
              @change="handleMenuCollapsedButtonChange"
          />
          <SelectItem
              :title="t('all.layout.setting.topMenuLayout')"
              :options="topMenuAlignOptions"
              :cursor="getTopMenuAlign"
              :disabled="!disableSidebarRelSetting"
              @change="handleTopMenuAlignModeChange"
          />
          <!-- <SelectItem
              :title="t('layout.setting.contentAreaWidth')"
              :options="contentModeOptions"
              :cursor="getContentMode"
              @change="handleContentModeChange"
          /> -->

          <el-divider>{{ t('all.layout.setting.interfaceDisplay') }}</el-divider>
          <SwitchItem
              :title="t('all.layout.setting.logo')"
              :def="getShowLogo"
              @change="handleLogoChange"
          />
          <SwitchItem
              :title="t('all.layout.setting.footer')"
              :def="getShowFooter"
              @change="handleFooterChange"
          />
          <SwitchItem
              :title="t('all.layout.setting.fullContent')"
              :def="getFullContent"
              @change="handleFullContentChange"
          />
          <SwitchItem
              :title="t('all.layout.setting.grayMode')"
              :def="getGrayMode"
              @change="handleGrayModeChange"
          />
          <SwitchItem
              :title="t('all.layout.setting.colorWeakMode')"
              :def="getColorWeak"
              @change="handleColorWeakChange"
          />

          <el-divider>{{ t('all.layout.setting.animation') }}</el-divider>
          <SwitchItem
              :title="t('all.layout.setting.progress')"
              :def="getEnableNProgress"
              @change="handleEnableNProgressChange"
          />
          <SwitchItem
              :title="t('all.layout.setting.switchAnimation')"
              :def="getEnableTransition"
              @change="handleEnableTransitionChange"
          />
          <SelectItem
              :title="t('all.layout.setting.switchAnimationType')"
              :disabled="!getEnableTransition"
              :options="routerTransitionOptions"
              :cursor="getRouterTransition"
              @change="handleRouterTransitionChange"
          />
      </div>
      <SettingFooter v-if="isDevMode" />
    </BaseDrawer>
  </div>
</template>

<script setup>
// import { AppDarkModeToggle } from '@/components/Application'
import MenuModePicker from './menuModePicker.vue'
import ThemeColorPicker from './themeColorPicker.vue'
import SwitchItem from './switchItem.vue'
import SettingFooter from './settingFooter.vue'
import SelectItem from './selectItem.vue'
import { useDrawer, updateHeaderBgColor, updateSidebarBgColor, getEnv, updateTheme, updateGrayMode, updateColorWeak } from "core/utils"
import { lang as t } from "core/locales/comLocale"
import { 
    useAppSetting, 
    useRootSetting, 
    useMenuSetting, 
    useHeaderSetting,
    useTransitionSetting,
    ContentEnum, 
    MenuModeEnum, 
    MenuTriggerEnum,
    RouterTransitionEnum,
    THEME_PRESET_COLOR_LIST,
    HEADER_PRESET_BG_COLOR_LIST,
    SIDE_BAR_BG_COLOR_LIST,
} from "core/settings"
/**
 * Variables area
 */
const isDevMode = getEnv('DEV')
const { getIsMobile } = useAppSetting()
const [register, { openDrawer, closeDrawer }] = useDrawer()
const {
  getThemeColor,
  getGrayMode,
  getColorWeak,
  getShowLogo,
  getShowFooter,
  getContentMode,
  getFullContent,
  setRootSetting,
} = useRootSetting()
const contentModeOptions = [
  { label: t('all.layout.setting.contentModeFull'), value: ContentEnum.FULL },
  { label: t('all.layout.setting.contentModeFixed'), value: ContentEnum.FIXED },
]
const {
  getCollapsed,
  getUniqueOpened,
  getBgColor: getSideMenuBgColor,
  getMenuMode,
  getTopMenuAlign,
  getMenuTrigger,
  setMenuSetting,
} = useMenuSetting()
const disableSidebarRelSetting = computed(() => getMenuMode.value === MenuModeEnum.TOP_MENU)
const topMenuAlignOptions = [
  { label: t('all.layout.setting.topMenuTypeLeft'), value: 'flex-start' },
  { label: t('all.layout.setting.topMenuTypeCenter'), value: 'center' },
  { label: t('all.layout.setting.topMenuTypeRight'), value: 'flex-end' },
]
const menuCollapseButtonOptions = [
  { label: t('all.layout.setting.menuTriggerNone'), value: MenuTriggerEnum.NONE },
  { label: t('all.layout.setting.menuTriggerBottom'), value: MenuTriggerEnum.BOTTOM },
  { label: t('all.layout.setting.menuTriggerTop'), value: MenuTriggerEnum.TOP },
]
const { getFixed, getBgColor: getHeaderBgColor, setHeaderSetting } = useHeaderSetting()
const routerTransitionOptions = Object.values(RouterTransitionEnum).map((e) => {
  return { label: e, value: e }
})
const { getEnableNProgress, getRouterTransition, getEnableTransition, setTransitionSetting } =
  useTransitionSetting()
/**
 * Method Area
 */
const handleClick = () => {
  openDrawer()
}
function handleSystemThemeChange(themeColor) {
  updateTheme(themeColor)
  setRootSetting({ themeColor })
}
function handleGrayModeChange(grayMode) {
  updateGrayMode(grayMode)
  setRootSetting({ grayMode })
}
function handleColorWeakChange(colorWeak) {
  updateColorWeak(colorWeak)
  setRootSetting({ colorWeak })
}
function handleLogoChange(showLogo) {
  setRootSetting({ showLogo })
}
function handleFooterChange(showFooter) {
  setRootSetting({ showFooter })
}
function handleContentModeChange(contentMode) {
  setRootSetting({ contentMode })
}
function handleFullContentChange(fullContent) {
  closeDrawer()

  // wait for apply
  nextTick(() => {
    setRootSetting({ fullContent })
  })
}
function handleMenuCollapsedChange(collapsed) {
  setMenuSetting({ collapsed })
}
function handleMenuUniqueOpenChange(uniqueOpened) {
  setMenuSetting({ uniqueOpened })
}
function handleSideMenuBgChange(bgColor) {
  updateSidebarBgColor(bgColor)
  setMenuSetting({ bgColor })
}
function handleMenuModeChange(menuMode) {
  setMenuSetting({ menuMode })
}
function handleTopMenuAlignModeChange(topMenuAlign) {
  setMenuSetting({ topMenuAlign })
}
function handleMenuCollapsedButtonChange(trigger) {
  setMenuSetting({ trigger })
}
function handleHeaderFixedChange(fixed) {
  setHeaderSetting({ fixed })
}
function handleHeaderBgChange(bgColor) {
  updateHeaderBgColor(bgColor)
  setHeaderSetting({ bgColor })
}
function handleEnableNProgressChange(enableNProgress) {
  setTransitionSetting({ enableNProgress })
}
function handleRouterTransitionChange(routerTransition) {
  setTransitionSetting({ routerTransition })
}
function handleEnableTransitionChange(enable) {
  setTransitionSetting({ enable })
}
/**
 * Life cycle Area
 */
</script>