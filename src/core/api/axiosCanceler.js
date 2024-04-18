import axios from 'axios'

/**
 * 参考
 */
// const controller = new AbortController()
// axios
//   .get('/foo/bar', {
//     signal: controller.signal,
//   })
//   .then(function (response) {
//     //...
//   })
// // cancel the request
// controller.abort()
// cancelToken 和 signal 传到 axios 之后，都会以某种机制调用 XMLHttpRequest.abort()。

// let pendingMap = []
let pendingMap = new Map()

export const getPendingUrl = (config) => {
    return [config.method, config.url].join('&')
}
export class AxiosCanceler {
    addPending(config){
        this.removePending(config)
        let url = getPendingUrl(config)
        let abort = new AbortController()
        pendingMap.set(url, abort)
        config.signal = abort.signal
    }
    removePending(config){
        let url = getPendingUrl(config)
        if (pendingMap.has(url)) {
            // 如果挂起中有当前请求标识符
            // 取消并删除当前请求
            let abort = pendingMap.get(url)
            // 请求中断
            abort &&  abort.abort()
            pendingMap.delete(url)
        }
    }
    removeAllPending(){
        pendingMap.forEach((abort, url) => {
            abort && abort.abort()
        })
    }
}