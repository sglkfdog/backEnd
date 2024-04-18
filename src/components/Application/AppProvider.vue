<script>
import { prefixCls as PrefixClsValue, createAppProviderContext } from 'core/settings'
import { createBreakpointListen } from 'core/event'
const props = {
  prefixCls: {
    type: String,
    default: PrefixClsValue,
  },
}
export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    let isMobile = ref(false)
    let { prefixCls } = toRefs(props)

    createBreakpointListen(({ screenMap, sizeEnum, widthRef }) => {
      let smWidth = screenMap.get(sizeEnum.SM)
      if (smWidth) {
        isMobile.value = widthRef.value - 1 < smWidth
        // console.log("isMobile.value=", isMobile.value)
      }
    })

    // Inject variables into the global
    createAppProviderContext({ isMobile, prefixCls })

    return () => slots.default?.()
  },
})
</script>