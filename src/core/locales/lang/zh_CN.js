// import eleLocale from 'element-plus/lib/locale/lang/zh-cn'
import eleLocale from 'element-plus/dist/locale/zh-cn.mjs'
import dayjsLocale from 'dayjs/locale/zh-cn'
import { genMessage } from "core/utils"
// import zhCNJson from "./zh_CN.json"
// import zhCNText from "./zhCNText.js"
// import zhCNText from "./zh_CN/index"

// const modules = import.meta.glob('./zh_CN/**/*.ts', { eager: true })
const modules = import.meta.glob('./zh_CN/**/*.js', { eager: true })

const message = {
  ...genMessage(modules, 'zh_CN'),
  eleLocale,
  dayjsLocale,
  // ...zhCNText
}
export default message