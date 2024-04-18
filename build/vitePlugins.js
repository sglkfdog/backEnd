import vue from '@vitejs/plugin-vue'
/**
 *自动导入vue3的hooks，借助unplugin-auto-import/vite这个插件
 * 支持vue, vue-router, vue-i18n, @vueuse/head, @vueuse/core等自动引入
 * hook reactive ref等自动引入
 */
import AutoImport from 'unplugin-auto-import/vite'
// 自动导入ui库,该插件内置了大多数流行库解析器(npm install unplugin-vue-components -D)
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

export const createVitePlugins = () => {
    let vitePlugins = [
        vue(), 
        // 先执行这个，然后在执行unocss.config.js
        UnoCSS(),
        AutoImport({
            // 安装两行后你会发现在组件中不用再导入ref,reactive等
            imports: ['vue', 'vue-router'],
            // resolvers: [ElementPlusResolver()],
        }),
        Components({
            // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
            dirs: ['src/components'],
            // resolvers: [ElementPlusResolver()],
        }),
    ]
    // vitePlugins.push(unoPlugin())
    return vitePlugins
}