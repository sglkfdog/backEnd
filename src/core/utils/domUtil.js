const rootEle = document.documentElement

export const toggleClass = (flag, clsName, target) => {
    const targetEl = target || document.body
  
    let { className } = targetEl
    className = className.replace(clsName, '')
  
    targetEl.className = flag ? `${className} ${clsName}`.trim() : className
}
export const setCssVar = (prop, val, dom = rootEle) => {
    dom.style.setProperty(prop, val)
}