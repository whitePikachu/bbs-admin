import "@kangc/v-md-editor/lib/style/base-editor.css";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import VueMarkdownEditor from "@kangc/v-md-editor";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import Prism from "prismjs";

VueMarkdownEditor.use(vuepressTheme, { Prism });
VueMarkdownEditor.use(createEmojiPlugin());
export function setupEditor(app: any) {
  app.use(VueMarkdownEditor);
}
