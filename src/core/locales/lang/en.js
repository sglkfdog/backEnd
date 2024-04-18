// import eleLocale from 'element-plus/lib/locale/lang/en'
import eleLocale from 'element-plus/dist/locale/en'
import dayjsLocale from 'dayjs/locale/en'
import { genMessage } from "core/utils"
// import enJson from "./en.json"
// import enText from "./enText.js"
// import enText from "./en/index"

// const modules = import.meta.glob('./en/**/*.ts', { eager: true })
const modules = import.meta.glob('./en/**/*.js', { eager: true })

const message = {
	...genMessage(modules, 'en'),
	eleLocale,
  	dayjsLocale,
	// ...enText
}
export default message
