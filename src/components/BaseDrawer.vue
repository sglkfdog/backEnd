<template>
  <el-drawer v-bind="getBindValue" :before-close="handleCancel">
    <!-- header -->
    <template #header="{ titleId, titleClass }">
      <div :id="titleId" :class="titleClass">
        <BaseHead
          v-if="!$slots.title"
          :title="getMergeProps.title"
          :help-message="getMergeProps.helpMessage"
        />
        <slot v-else name="title"></slot>
      </div>
    </template>
    <!-- footer -->
    <template v-if="getShowFooter" #footer>
      <div :class="`${prefixCls}-footer`">
        <DrawerFooter
          v-if="!$slots.footer"
          :confirm-text="getMergeProps.confirmText"
          :confirm-btn-props="getMergeProps.confirmBtnProps"
          :cancel-text="getMergeProps.cancelText"
          :cancel-btn-props="getMergeProps.cancelBtnProps"
          :show-confirm-btn="getMergeProps.showConfirmBtn"
          :show-cancel-btn="getMergeProps.showCancelBtn"
          @cancel="handleCancel"
          @confirm="handleConfirm"
        >
          <template #prepend><slot name="prependFooter"></slot></template>
          <template #center><slot name="centerFooter"></slot></template>
          <template #append><slot name="appendFooter"></slot></template>
        </DrawerFooter>
        <slot v-else name="footer"></slot>
      </div>
    </template>

    <!-- content -->
    <div
      :class="`${prefixCls}-wrapper`"
      v-loading="getMergeProps.loading"
      :element-loading-text="getMergeProps.loadingTip"
    >
      <slot></slot>
    </div>
  </el-drawer>
</template>
<script>
// 声明额外的选项: 参考https://www.yuucn.com/a/129175.html
export default {
  inheritAttrs: false, // 不让属性直接渲染在根节点上
  customOptions: {}
}
</script>
<script setup>
import { drawerProps } from 'element-plus'
import { isFunction, merge, omit } from 'lodash-es'
import { useDesignClass } from "core/utils"
/**
 * Variables area
 */
const props = defineProps({
  // el-drawer原有属性
  // ...omit(drawerProps, ['modelValue', 'customClass', 'beforeClose']),
  ...omit(drawerProps, ['modelValue', 'beforeClose']),
  // 扩展属性
  visible: { type: Boolean },
  helpMessage: { type: String },
  loading: { type: Boolean },
  loadingTip: { type: String },
  showConfirmBtn: { type: Boolean, default: true },
  showCancelBtn: { type: Boolean, default: true },
  confirmText: { type: String },
  cancelText: { type: String },
  confirmBtnProps: { type: Object },
  cancelBtnProps: { type: Object },
  closeFunc: { type: Function },
})
// 主要接收no-props属性
const attrs = useAttrs()
// 插槽
const slots = useSlots()
// 自定义事件触发
const emit = defineEmits(['register', 'confirm', 'cancel', 'update:visible', 'visible-change']);

const instance = getCurrentInstance()

const visibleRef = ref(false)
const innerPropsRef = ref(false)
const { prefixCls } = useDesignClass('base-drawer')
const getMergeProps = computed(() => {
  return {
    ...props,
    ...unref(innerPropsRef),
  }
})
const getBindValue = computed(() => {
  let opt = {
    ...attrs,
    ...unref(getMergeProps),
    // basic setting
    modelValue: unref(visibleRef),
    // customClass: prefixCls,
  }
  let result = omit(opt, [
    'visible',
    'helpMessage',
    'loading',
    'loadingTip',
    'showConfirmBtn',
    'showCancelBtn',
    'confirmText',
    'cancelText',
    'confirmBtnProps',
    'cancelBtnProps',
    'closeFunc',
  ])
  // console.log("result-opt=", opt)
  // console.log("result=", result)
  return result
})
const getShowFooter = computed(() => {
  let mergeProps = unref(getMergeProps)
  return (
    mergeProps.showCancelBtn ||
    mergeProps.showCancelBtn ||
    !!slots.footer ||
    !!slots.prependFooter ||
    !!slots.centerFooter ||
    !!slots.appendFooter
  )
})

/**
 * Method Area
 */
const handleCancel = async() => {
  if (props.closeFunc && isFunction(props.closeFunc)) {
    let isClose = await props.closeFunc()
    visibleRef.value = !isClose
    return
  }

  visibleRef.value = false
  emit('cancel')
}

const handleConfirm = () => {
  emit('confirm')
}
const setProps = (modProps) => {
  innerPropsRef.value = merge(unref(innerPropsRef), modProps)
  // console.log("setProps-modProps=", modProps)
  // console.log("props=", props)
  // console.log("props.visible=", props.visible, visibleRef.value)

  if (Reflect.has(modProps, 'visible')) {
    visibleRef.value = !!modProps.visible
    // console.log("modProps.visible=", modProps.visible, visibleRef.value)
  }
}
const drawerAction = {
  setProps,
}
if (instance) {
  emit('register', drawerAction, instance.uid)
}
/**
 * Life cycle Area
 */
// watchEffect(() => {
//   console.log("watchEffect-0props.visible=", props.visible)
//   console.log("watchEffect-0=", visibleRef.value, props.visible, !!props.visible)
//   visibleRef.value = !!props.visible
//   console.log("watchEffect-1=", visibleRef.value, props.visible, !!props.visible)
// })

watch(
  // () => unref(visibleRef),
  () => unref(visibleRef),
  (v, old_v) => {
    console.log("watch=", v, old_v)
    emit('update:visible', v)
    emit('visible-change', v)
  }
)
</script>
<style lang="scss" scoped>
</style>