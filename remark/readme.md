## vue3 + vite 构建的 初始前端项目 - demo

### 初始构建
[参考资料](https://juejin.cn/post/7001857870035681316)

1. npm构建vite项目(npm init vite@latest/vite@4.1),依次需要配置项目名 、框架选择、原生和ts版本的选择
   ```shell
   $npm init vite@latest
   - 输入项目名(vite-vue3)
   - 选择一个框架（vue）
   - 选择JavaScript
   - 启动项目(cd vite-vue3 && npm install && npm run dev), 即可在 scr 目录下进行开发啦 ~
   ```
### 安装相关依赖包
1. 安装一般必备依赖包：
  ```sh
  $npm install -S vue-router@4.0 axios vue-i18n vuex vuex-persistedstate
  $npm install sass --save-dev 或 npm install -D sass
  ```
1. 安装VueRouter
   ```
   - npm install vue-router@4.0 
   - 创建src/core/router/index.js文件，配置路由如下：
    import { createRouter, createWebHashHistory } from 'vue-router'
    export default createRouter({
      // 指定路由模式
      history: createWebHashHistory(),
      // 路由地址
      routes: []
    })
   ```
2. 安装vuex
   ```
   - npm install vuex@4.0 或 yarn add vuex@4.0
   - 创建src/core/store/index.js，配置vuex如下：
    import { createStore } from 'vuex'
    export default createStore({
      state: {
        name: 'vueX'
      }
    })
    - vuex持久化插件(npm install vuex-persistedstate --save)
   ```
3. 在main.js中配置router和store
  ```
    import { createApp } from 'vue'
    import App from './App.vue'
    // 导入router和store
    import router from './router/index'
    import store from './store/index'

    const app = createApp(App)
    app.use(router)
    app.use(store)
    app.mount('#app')

  ```
5. 安装axios
   ```
   npm install axios
   ```
6. 安装多语言:
   `npm i vue-i18n`
7. 报错信息：[plugin:vite:css] Preprocessor dependency “sass” not found. Did you install it?
   ```js
    解决办法：
    安装node-sass 或 sass 就可以解决 不安装的话就去除style中的lang属性
    方法一：npm install node-sass
    方法二：npm install sass --save-dev
    方法三：去除style中的lang属性

    我这里用的是方法二，安装“npm install sass --save-dev”，安装成功后再启动项目，就成功了
   ```
8. dd

### 打包配置 vite.config.js
```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let prefix = loadEnv(mode, process.cwd()).VITE_API_URL
  let reg = "/^\/"+prefix+"/"
  let isBuild = command === 'build'
  console.log("command=", command)
  return {
    base: loadEnv(mode, process.cwd()).VITE_PUBLIC_PATH,
    resolve: {
      // alias: {
      //   '@': resolve(__dirname, 'src'),
      // },
      alias: [
        { find: '@', replacement: resolve('src') },
        { find: 'core', replacement: resolve('src/core') },
        // { find: 'vue-i18n',  replacement: 'vue-i18n/dist/vue-i18n.cjs.js'}
      ],
    },
    plugins: [vue()],
    build: {
      outDir: loadEnv(mode, process.cwd()).VITE_OUT_PUT_DIR,
      assetsDir: 'static',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: mode === 'production',
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    server: {
      open: true,
      host: "0.0.0.0",
      port: "3338",
      proxy: {
        [prefix]: {
          target: loadEnv(mode, process.cwd()).VITE_API_TAG,
          changeOrigin: true,
          secure: true,
          // rewrite: (path) => path.replace(/^\/demo_api/, ''),
          rewrite: (path) => path.replace(reg, ''),
        },
      },
    }
  }
})
```

### 注意事项
1. VS Code 使用@所导致的跳转失败问题
  [参考资料](https://www.cnblogs.com/zhian/p/16890788.html)
  VS Code 无法像WebStorm一样使用@，然后Ctrl+鼠标左键跳转到具体的文件中, 解决办法，在package.json的同级目录创建jsconfig.json。文件内容是:
  ```json
  {
    "compilerOptions": {
      "target": "ES6",
      "module": "commonjs",
      "allowSyntheticDefaultImports": true,
      "baseUrl": "./",
      "paths": {
        "@/*": ["src/*"],
        "core/*": ["src/core/*"]
      }
    },
    "exclude": [
      "node_modules"
    ]
  }
  ```
1. ddd


