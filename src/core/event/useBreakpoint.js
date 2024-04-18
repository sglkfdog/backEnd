import { ref, computed, unref } from 'vue'
import { ScreenEnum, SizeEnum, GetScreenMap } from 'core/settings'
import { useEventListener } from './useEventListener'

let globalScreenRef
let globalWidthRef
let globalRealWidthRef
const screenMap = GetScreenMap()

export function useBreakpoint() {
  return {
    screenRef: globalScreenRef,
    widthRef: globalWidthRef,
    realWidthRef: globalRealWidthRef,
    screenEnum: ScreenEnum,
    sizeEnum: SizeEnum,
    screenMap,
  }
}
export function createBreakpointListen(fn) {
  let screenRef = ref(SizeEnum.XL)
  let realWidthRef = ref(window.innerWidth)

  function getWindowWidth() {
    // 元素的内部宽度，以像素计。该属性包括内边距 padding，但不包括边框 border、外边距 margin 和垂直滚动条
    let width = document.body.clientWidth
    let xs = screenMap.get(SizeEnum.XS)
    let sm = screenMap.get(SizeEnum.SM)
    let md = screenMap.get(SizeEnum.MD)
    let lg = screenMap.get(SizeEnum.LG)

    if (width < xs) {
      screenRef.value = SizeEnum.XS
    } else if (width < sm) {
      screenRef.value = SizeEnum.SM
    } else if (width < md) {
      screenRef.value = SizeEnum.MD
    } else if (width < lg) {
      screenRef.value = SizeEnum.LG
    } else {
      screenRef.value = SizeEnum.XL
    }

    realWidthRef.value = width
  }

  useEventListener({
    el: window,
    name: 'resize',
    listener: () => {
      console.log("window-listener")
      getWindowWidth()
      resizeFn()
    },
  })

  getWindowWidth()
  globalScreenRef = computed(() => unref(screenRef.value))
  globalWidthRef = computed(() => screenMap.get(unref(screenRef)))
  globalRealWidthRef = computed(() => unref(realWidthRef))

  function resizeFn() {
    fn?.({
      screenRef: globalScreenRef,
      widthRef: globalWidthRef,
      realWidthRef: globalRealWidthRef,
      screenEnum: ScreenEnum,
      sizeEnum: SizeEnum,
      screenMap,
    })
  }

  resizeFn()

  return {
    screenRef: globalScreenRef,
    widthRef: globalWidthRef,
    realWidthRef: globalRealWidthRef,
  }
}