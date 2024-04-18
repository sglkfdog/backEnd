import ElementPlus from 'element-plus'

export let globalAppContext
export function registerGlobalComp(app) {
    // element-plus
    app.use(ElementPlus)
  
    // global app context
    globalAppContext = app._context
}