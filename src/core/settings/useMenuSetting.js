import {store} from "core/store"
import { unref, computed } from "vue"
import { MenuModeEnum, MenuTriggerEnum, SIDE_BAR_COLLAPSED_WIDTH } from "./constantSetting"
import { useRootSetting } from "./useRootSetting"

export const useMenuSetting = () => {
  const { getFullContentCurrent:getFullContent } = useRootSetting()
  const getCollapsed = computed(() => store.getters["baseStore/get_menuSetting"].collapsed);

  const getUniqueOpened = computed(() => store.getters["baseStore/get_menuSetting"].uniqueOpened);

  const getBgColor = computed(() => store.getters["baseStore/get_menuSetting"].bgColor);

  const getMenuMode = computed(() => store.getters["baseStore/get_menuSetting"].menuMode);

  const getTopMenuAlign = computed(() => store.getters["baseStore/get_menuSetting"].topMenuAlign);

  const getMenuTheme = computed(() => store.getters["baseStore/get_menuSetting"].theme);

  const getMenuWidth = computed(() => store.getters["baseStore/get_menuSetting"].menuWidth);

  const getShowSideBar = computed(
    () => unref(getMenuMode) !== MenuModeEnum.TOP_MENU && !unref(getFullContent)
  );

  const getShowTopMenu = computed(
    () => unref(getMenuMode) === MenuModeEnum.TOP_MENU
  );

  const getRealWidth = computed(() =>
    unref(getCollapsed) ? SIDE_BAR_COLLAPSED_WIDTH : unref(getMenuWidth)
  );

  const getCalcHeaderWidth = computed(() => {
    const width = unref(getShowTopMenu) ? 0 : unref(getRealWidth);
    return `calc(100vw - ${width}px)`;
  });

  const getMenuTrigger = computed(
    () => store.getters["baseStore/get_menuSetting"].trigger || MenuTriggerEnum.TOP
  );

  const getShowHeaderTrigger = computed(() => {
    return (
      unref(getMenuMode) !== MenuModeEnum.TOP_MENU &&
      unref(getMenuTrigger) === MenuTriggerEnum.TOP
    );
  });

  const getShowSidebarTrigger = computed(
    () => unref(getMenuTrigger) === MenuTriggerEnum.BOTTOM
  );

  function setMenuSetting(menuSetting) {
    store.commit("baseStore/set_projectConfig", { menuSetting })
  }

  function toggleCollapse() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }

  return {
    setMenuSetting,
    toggleCollapse,

    getTopMenuAlign,
    getMenuMode,
    getBgColor,
    getCollapsed,
    getUniqueOpened,
    getMenuTheme,
    getMenuWidth,
    getRealWidth,
    getCalcHeaderWidth,
    getShowSideBar,
    getShowTopMenu,
    getMenuTrigger,
    getShowSidebarTrigger,
    getShowHeaderTrigger,
  };
}
