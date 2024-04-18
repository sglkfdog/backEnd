import {
  computed,
  unref,
  inject,
  provide,
  reactive,
  readonly as defineReadonly,
} from "vue";

let appGlobalConfig = null;
const key = Symbol()

export function createContext(context, key, options = {}) {
  // console.log("createContext=", context.isMobile.value, context.prefixCls.value, key, options)
  let { readonly = true, createProvider = false, native = false } = options;

  // console.log("createContext-readonly=", readonly)
  let state = reactive(context);
  // console.log("createContext-state=", state.isMobile, state.prefixCls)
  let provideData = readonly ? defineReadonly(state) : state;
  // console.log("createContext-provideData=", provideData.isMobile, provideData.prefixCls)
  !createProvider && provide(key, native ? state : provideData);

  return {
    state: provideData,
  };
}
export function useContext(key, defaultValue) {
  // return inject(key, defaultValue || {});
  let val = inject(key, defaultValue || {});
  // console.log("useContext-val=", val.isMobile, defaultValue.isMobile)
  return val
}
export const createAppProviderContext = (context) => {
  // console.log("createAppProviderContext-context=", context)
  let { state } = createContext(context, key);
  // global init
  appGlobalConfig = state;
  // console.log("createAppProviderContext-appGlobalConfig=", appGlobalConfig.isMobile, appGlobalConfig.prefixCls)
};
export const useAppProviderContext = () => {
  // console.log("useAppProviderContext-appGlobalConfig=", appGlobalConfig.isMobile, appGlobalConfig.prefixCls)

  return useContext(key, appGlobalConfig);
};

export const useAppSetting = () => {
  let ctx = useAppProviderContext();
  // console.log("useAppSetting-ctx=", ctx.isMobile, ctx.prefixCls)

  let getIsMobile = computed(() => unref(ctx.isMobile));

  return {
    getIsMobile,
  };
};
