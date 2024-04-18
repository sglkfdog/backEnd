import {store} from "core/store"
export const useTransitionSetting = () => {
  
    const getEnableNProgress = computed(() => store.getters["baseStore/get_transitionSetting"].enableNProgress)
  
    const getRouterTransition = computed(() => store.getters["baseStore/get_transitionSetting"].routerTransition)
  
    const getEnableTransition = computed(() => store.getters["baseStore/get_transitionSetting"].enable)
  
    function setTransitionSetting(transitionSetting) {
      store.commit("baseStore/set_projectConfig", { transitionSetting })
    }
  
    return {
      setTransitionSetting,
      getEnableTransition,
      getRouterTransition,
      getEnableNProgress,
    }
  }