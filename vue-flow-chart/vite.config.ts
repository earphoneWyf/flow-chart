import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createStyleImportPlugin({
      //script导入一些组件的样式
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name: string) => {
            name = name.substring(3, name.length);
            return `element-plus/es/components/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"), // path记得引入
      vue: "vue/dist/vue.esm-bundler.js", // 定义vue的别名，如果使用其他的插件，可能会用到别名
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
});
