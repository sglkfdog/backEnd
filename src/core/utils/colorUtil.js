import { Color_White, Color_Black } from "core/settings"

export const pad2 = (num) => {
    let t = num.toString(16)
    if (t.length === 1) t = '0' + t
    return t
}
export const dropPrefix = (colorStr) => {
    return colorStr.replace('#', '')
}
export const toRGB = (colorStr) => {
    colorStr = dropPrefix(colorStr)
    if (colorStr.length === 3) {
        colorStr = colorStr[0] + colorStr[0] + colorStr[1] + colorStr[1] + colorStr[2] + colorStr[2]
    }
    const r = parseInt(colorStr.slice(0, 2), 16)
    const g = parseInt(colorStr.slice(2, 4), 16)
    const b = parseInt(colorStr.slice(4, 6), 16)
    return [r, g, b]
}
export const mix = (color1, color2, weight, alpha1, alpha2) => {
    color1 = dropPrefix(color1)
    color2 = dropPrefix(color2)
    if (weight === undefined) weight = 0.5
    if (alpha1 === undefined) alpha1 = 1
    if (alpha2 === undefined) alpha2 = 1

    const w = 2 * weight - 1
    const alphaDelta = alpha1 - alpha2
    const w1 = ((w * alphaDelta === -1 ? w : (w + alphaDelta) / (1 + w * alphaDelta)) + 1) / 2
    const w2 = 1 - w1

    const rgb1 = toRGB(color1)
    const rgb2 = toRGB(color2)
    const r = Math.round(w1 * rgb1[0] + w2 * rgb2[0])
    const g = Math.round(w1 * rgb1[1] + w2 * rgb2[1])
    const b = Math.round(w1 * rgb1[2] + w2 * rgb2[2])
    return '#' + pad2(r) + pad2(g) + pad2(b)
}
export const mixLighten = (colorStr, weight) => {
    return mix(Color_White, colorStr, weight)
}
export const mixDarken = (colorStr, weight) => {
    return mix(Color_Black, colorStr, weight)
}

export const colorIsLight = (colorStr) => {
    const [r, g, b] = toRGB(colorStr)
    const brightness = r * 0.299 + g * 0.578 + b * 0.114
    return brightness > 192
}

/**
 * RGB 颜色值转换为 十六进制颜色值.
 * r, g, 和 b 需要在 [0, 255] 范围内
 *
 * @return  String 类似#ff00ff
 * @param r
 * @param g
 * @param b
 */
export function rgbToHex(r, g, b) {
    // tslint:disable-next-line:no-bitwise
    const hex = ((r << 16) | (g << 8) | b).toString(16)
    return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}
