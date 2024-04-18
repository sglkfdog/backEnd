import { useRouter } from 'vue-router'
import { useTitle as usePageTitle } from '@vueuse/core'
import { useTransl } from 'core/locales/comLocale'
export function useTitleSetting() {
    let { currentRoute } = useRouter()
    let pageTitle = usePageTitle()
    let { t } = useTransl()
    console.log("useTitleSetting-pageTitle=", pageTitle.value)
    watch(
      () => currentRoute.value.path,
      () => {
        let route = unref(currentRoute)
        let key = route?.meta?.title || ''
        let name = t(key)
        pageTitle.value = name ? `${name} - ${t('all.common.appName')}` : t('all.common.appName')
        console.log("useTitleSetting-key=", key, name, pageTitle.value)
      },
      {
        immediate: true,
      }
    )
}