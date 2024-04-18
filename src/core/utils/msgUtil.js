import { ElNotification, ElMessageBox } from 'element-plus'

export function tipMsg(msg = "", type = "error", duration = 5 * 1000) {
    if (msg) {
        ElNotification({
            message: msg,
            type,
            duration
        })
    }
}