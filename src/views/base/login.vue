<template>
  <!-- <div class="container">{{ $t('test') }}</div> -->
  <!-- rounded-lg rounded-[10px]-->
  <div :class="prefixCls" class="overflow-y-auto h-full w-full bg-cover flex-1">
    <div class="pt-20">
      <div class="max-w-[750px] min-w-[345px] mx-auto p-[15px]">
        <el-card class="shadow rounded-[10px]">
          <div class="flex justify-between items-center">
            <AppDarkModeToggle />
            <div class="text-2xl">{{ $t('all.common.login.signin') }}</div>
            <AppLocalePicker class="text-2xl" v-if="getShowPicker" />
          </div>
          <el-form 
            ref="formRef"
            label-width="0px">
            <el-input 
              size="large" 
              class="mt-10"
              v-model="formData.name" 
              placeholder="Please input" 
            />
            <el-input
              size="large"
              class="mt-10"
              v-model="formData.password"
              type="password"
              placeholder="Please input password"
              show-password
            />
            <div class="w-full relative flex mt-10">
              <el-input 
                size="large" 
                class="flex-1"
                v-model="formData.verifyCode" 
                placeholder="Please input verifyCode" 
              />
              <div class="h-10 w-50 ml-10 cursor-pointer select-none" @click="handleGetImageCaptcha">验证码</div>
            </div>
  
            <el-button 
              size="large" 
              type="primary" 
              :loading="loading" 
              class="w-full mt-10" 
              @click="handleLogin"
            >
            Primary
            </el-button>
          </el-form>
  
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AppDarkModeToggle, AppLocalePicker } from '@/components/Application'
import { useDesignClass } from "core/utils"
import { useGoRouter } from "core/router"
import { PageEnum } from "core/settings"
import { userLoginApi } from "core/api"
import { isEmpty, debounce } from 'lodash-es'
import {store} from 'core/store'
/**
 * Variables area
 */
// $route.query.redirect
const $route = useRoute() 
const go = useGoRouter()
const  { prefixCls } = useDesignClass('login')
const formData = reactive({
  name: '',
  password: '',
  verifyCode: 'verifyCode',
  captchaId: 'captchaId',
})
const loading = ref(false)
const getShowPicker = computed(() => store.getters["baseStore/get_showPicker"])
/**
 * Method Area
 */
// debounce防抖动函数, 该函数会从上一次被调用后延迟wait毫秒后调用func方法(要防抖动的函数)参数.返回新的debounced(防抖动)函数。
// const handleLogin = debounce(async () => {
const handleLogin = async () => {
  try {
    if (!formData.name || !formData.password) {
      console.log("请输入账号和密码")
      return
    }
    let data = await userLoginApi(formData)
    console.log("handleLogin-data=", data)
    if (data && !isEmpty(data.accessToken)) {
      console.log("data.accessToken=", data.accessToken)
      store.commit("userStore/set_token", data.accessToken)
      if ($route.query.redirect) {
        go($route.query.redirect, true)
      } else {
        go(PageEnum.Root, true)
      }
    }
  } catch (error) {
    // nothing to do
  } finally {
    // isLogging.value = false
  }
}
// }, 500)
const handleGetImageCaptcha = () => {

}
/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
@use '@/styles/var.scss';
$prefixCls: #{var.$namespace}-login;
.#{$prefixCls} {
  background-image: url('@/assets/svg/login-bg.svg');
  // background-image: url('@/assets/img/login_bg.webp');
  // background-repeat: no-repeat;
  // background-position: center 110px;
  // background-size: 100%;
  // background-color: #f0f2f5;
}
html.dark {
  .#{$prefixCls} {
    background-color: #{var.$app-dark-bg-color};
  }
}
</style>