import AppProviderComp from './AppProvider.vue'
import AppLogoComp from './AppLogo.vue'
import AppDarkModeToggleComp from './AppDarkModeToggle.vue'
import AppLocalePickerComp from './AppLocalePicker.vue'

import { withInstall } from 'core/utils'

export const AppProvider = withInstall(AppProviderComp)
export const AppLogo = withInstall(AppLogoComp)
export const AppDarkModeToggle = withInstall(AppDarkModeToggleComp)
export const AppLocalePicker = withInstall(AppLocalePickerComp)