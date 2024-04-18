import {store} from "core/store"
import { unref, computed } from "vue"
import { useRootSetting } from "./useRootSetting"
import { useMenuSetting } from "./useMenuSetting"

export const useHeaderSetting = () => {
  const { getFullContentCurrent:getFullContent, getShowLogo } = useRootSetting()
  const { getShowTopMenu } = useMenuSetting()
  const getShowHeader = computed(() => !unref(getFullContent));

  const getFixed = computed(() => store.getters["baseStore/get_headerSetting"].fixed);

  const getBgColor = computed(() => store.getters["baseStore/get_headerSetting"].bgColor);

  const getShowFullScreen = computed(
    () => store.getters["baseStore/get_headerSetting"].showFullScreen
  );

  const getHeaderTheme = computed(() => store.getters["baseStore/get_headerSetting"].theme);

  const getShowHeaderLogo = computed(
    () => unref(getShowLogo) && unref(getShowTopMenu)
  );

  /* set header */
  function setHeaderSetting(headerSetting) {
    store.commit("baseStore/set_projectConfig", { headerSetting })
  }

  return {
    setHeaderSetting,

    getShowHeader,
    getShowFullScreen,
    getBgColor,
    getFixed,
    getHeaderTheme,
    getShowHeaderLogo,
  };
}
