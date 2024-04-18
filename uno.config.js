// // 引入unocss相关
import { defineConfig, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import { iconDefault } from "./build/icons"
// import epIcons from '@iconify-json/ep'
let prefix = 'i-'
// 白名单列表，用于动态设置菜单Icon防止未使用的icon导致不被打包
const createSafeListByIcon = () => {
    return iconDefault.map((i) => `${prefix}${i}`)
}
/**
 * 配置
 * https://alfred-skyblue.github.io/unocss-docs-cn/guide/config-file
 * https://alfred-skyblue.github.io/unocss-docs-cn/config/
 */
let options = {
    // 快速把整个图标库载入: 添加以下配置, safelist 是预生成 i-carbon:dashboard 的样式不管代码有没有使用这个图标
    safelist: [
        ...createSafeListByIcon(),
        // ...Object.keys(epIcons.icons.icons).map(name => `i-${epIcons.icons.prefix}-${name}`),
    ],
    // 快捷方式
    shortcuts: {
        'bg-comp': 'bg-white dark:bg-overlay',
    },
    theme: {
        colors: {
            // 用法:class="bg-primary" 或 class="text-primary"
            primary: 'var(--el-color-primary)',
            success: 'var(--el-color-success)',
            warning: 'var(--el-color-warning)',
            danger: 'var(--el-color-danger)',
            error: 'var(--el-color-error)',
            info: 'var(--el-color-info)',
            overlay: 'var(--el-bg-color-overlay)',
            page: 'var(--el-bg-color-page)',
            bd: 'var(--el-border-color)',
            disabled: 'var(--el-text-color-disabled)',
            regular: 'var(--el-text-color-regular)',
            placeholder: 'var(--el-text-color-placeholder)',
            primarytext: 'var(--el-text-color-primary)',
        }
    },
    presets: [
        // icon:https://alfred-skyblue.github.io/unocss-docs-cn/presets/icons#prefix
        presetIcons({
            prefix,
            extraProperties: {
                display: 'inline-block',
                overflow: 'hidden',
                width: '1em',
                height: '1em',
                'vertical-align': '-0.15em',
            },
        }),
        // 本身不提供样式，需要通过加载不同的预设来使用的，本项目中使用的是默认预设，该预设尝试提供流行的功能优先框架（包括Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等）的共同超集, 这样可以在代码中使用Tailwind CSS、Windi CSS、Bootstrap、Tachyons等插件的快捷类
        presetUno()
    ],
    content: {
        pipeline: {
            // 给模版字符串进行排除编译, 排除一些目录
            exclude: [
                'node_modules',
                '.git',
                '.vscode',
                'dist',
                'public',
                'build',
                'mock',
                '.github',
                'remark',
            ]
        }
    },
}

export default defineConfig(options)