import { ref, watch, unref } from 'vue'
import { throttle, debounce } from 'lodash-es'


export function useEventListener({
    el = window,
    name,
    listener,
    options,
    autoRemove = true,
    isDebounce = true,
    wait = 100,
  }) {
    let remove = () => {}
    const isAddRef = ref(false)
  
    if (el) {
      const element = ref(el)
  
      const handler = isDebounce ? debounce(listener, wait) : throttle(listener, wait)
      const realHandler = wait ? handler : listener
  
      const removeEventListener = (ele) => {
        isAddRef.value = true
        ele.removeEventListener(name, realHandler, options)
      }
      const addEventListener = (ele) => ele.addEventListener(name, realHandler, options)
  
      const removeWatch = watch(
        element,
        (v, _ov, cleanUp) => {
          // console.log("removeWatch-v=", v, _ov, cleanUp)
          if (v) {
            !unref(isAddRef) && addEventListener(v)
            cleanUp(() => {
              autoRemove && removeEventListener(v)
            })
          }
        },
        { immediate: true }
      )
  
      // update
      remove = () => {
        removeEventListener(element.value)
        removeWatch()
      }
    }
  
    return remove
  }