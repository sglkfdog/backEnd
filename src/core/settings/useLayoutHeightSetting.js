import { ref } from 'vue'

const appHeaderHeightRef = ref(0)
const appFooterHeightRef = ref(0)

export function useLayoutHeightSetting() {
  function setAppHeaderHeight(val) {
    appHeaderHeightRef.value = val
  }

  function setAppFooterHeight(val) {
    appFooterHeightRef.value = val
  }

  return { setAppHeaderHeight, setAppFooterHeight, appFooterHeightRef, appHeaderHeightRef }
}