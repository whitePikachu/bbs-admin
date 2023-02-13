import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./plugins/router";
import { pinia } from "./plugins/pinia";
import "element-plus/dist/index.css";
import { setupEditor } from "./plugins/postmd";
function bootstrap() {
  const app = createApp(App);
  setupRouter(app);
  setupEditor(app);
  app.use(pinia);
  app.mount("#app");
}
bootstrap();
