import dayjs from 'dayjs'
import { isDate } from 'lodash-es'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export const formatToDateTime = (date, format = DATE_TIME_FORMAT) => {
    return dayjs(date).format(format)
}
export const formatToDate = (date, format = DATE_FORMAT) => {
    return dayjs(date).format(format)
}
export const isDateObject = (obj) => {
    return isDate(obj) || dayjs.isDayjs(obj)
}

export const dateUtil = dayjs