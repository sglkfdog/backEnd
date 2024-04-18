import { computed } from "vue";
import { useRouter } from "vue-router";
import {store} from "core/store";


export const useRootSetting = () => {

  const router = useRouter();
  
  const getGrayMode = computed(
    () => store.getters["baseStore/get_projectConfig"].grayMode
  );

  const getShowBreadCrumb = computed(
    () => store.getters["baseStore/get_projectConfig"].showBreadCrumb
  );

  const getShowFooter = computed(
    () => store.getters["baseStore/get_projectConfig"].showFooter
  );

  const getThemeColor = computed(
    () => store.getters["baseStore/get_projectConfig"].themeColor
  );

  const getColorWeak = computed(
    () => store.getters["baseStore/get_projectConfig"].colorWeak
  );

  const getShowLogo = computed(
    () => store.getters["baseStore/get_projectConfig"].showLogo
  );

  const getContentMode = computed(
    () => store.getters["baseStore/get_projectConfig"].contentMode
  );

  const getShowSettingButton = computed(
    () => store.getters["baseStore/get_projectConfig"].showSettingButton
  );

  const getFullContent = computed(
    () => store.getters["baseStore/get_projectConfig"].fullContent
  );

  const getRemoveAllHttpPending = computed(
    () => store.getters["baseStore/get_projectConfig"].removeAllHttpPending
  );

  const getTheme = computed(() => store.getters["baseStore/get_themeMode"]);

  const getUseOpenBackTop = computed(
    () => store.getters["baseStore/get_projectConfig"].useOpenBackTop
  );

  const getOpenKeepAlive = computed(
    () => store.getters["baseStore/get_projectConfig"].openKeepAlive
  );

  const getFullContentCurrent = computed(() => {
    const { currentRoute } = router;
    // Query parameters, the full screen is displayed when the address bar has a full parameter
    const route = unref(currentRoute);
    const query = route.query;
    console.log("getFullContentCurrent-query=", route, query, Reflect.has(query, "__full__"))
    if (query && Reflect.has(query, "__full__")) {
      return true;
    }
    console.log('store.getters["baseStore/get_projectConfig"].fullContent=', store.getters["baseStore/get_projectConfig"].fullContent)
    // Return to the configuration in the configuration file
    return store.getters["baseStore/get_projectConfig"].fullContent;
  });

  function setRootSetting(setting) {
    store.commit("baseStore/set_projectConfig", setting);
  }

  function setDarkMode(headerSetting) {
    // store.commit("baseStore/set_darkMode", mode);
    store.commit("baseStore/set_projectConfig", {headerSetting});
  }

  return {
    setRootSetting,
    setDarkMode,

    getFullContent,
    getShowSettingButton,
    getContentMode,
    getRemoveAllHttpPending,
    getShowLogo,
    getColorWeak,
    getThemeColor,
    getGrayMode,
    getShowBreadCrumb,
    getShowFooter,
    getTheme,
    getUseOpenBackTop,
    getOpenKeepAlive,
    getFullContentCurrent,
  };
};
