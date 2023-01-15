import { createPinia, defineStore } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
export const pinia = createPinia();
pinia.use(piniaPluginPersist);
export const token = defineStore({
  id: "token",
  state: () => {
    return {
      token: "",
    };
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
