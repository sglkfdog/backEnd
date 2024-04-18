<template>
  <div>
    <slot name="prepend"></slot>
    <el-button @click="handleCancel" v-bind="cancelBtnProps" v-if="showCancelBtn">
      {{ cancelText || $t('all.common.basic.cancel') }}
    </el-button>
    <slot name="center"></slot>
    <el-button type="primary" v-bind="confirmBtnProps" @click="handleConfirm" v-if="showConfirmBtn">
      {{ confirmText || $t('all.common.basic.confirm') }}
    </el-button>
    <slot name="append"></slot>
  </div>
</template>

<script setup>

/**
 * Variables area
 */
const props = defineProps({
  confirmText: {
    type: String,
  },
  cancelText: {
    type: String,
  },
  confirmBtnProps: {
    type: Object,
  },
  cancelBtnProps: {
    type: Object,
  },
  showConfirmBtn: {
    type: Boolean,
  },
  showCancelBtn: {
    type: Boolean,
  },
})

const emit = defineEmits(['cancel', 'confirm'])
/**
 * Method Area
 */
function handleCancel() {
  emit('cancel')
}

function handleConfirm() {
  emit('confirm')
}
/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
</style>