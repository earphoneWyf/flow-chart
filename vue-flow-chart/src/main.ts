import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 全局样式
import "@/styles/index.scss";

// 获取app实例对象
const app = createApp(App);

const pinia = createPinia();

app.use(ElementPlus).use(pinia).use(router).mount("#app");
