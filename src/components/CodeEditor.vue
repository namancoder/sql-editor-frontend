<template>
  <div id="app">
    <editor
      api-key="qg5ambzh5ftcnsgbbgsh4n8p2ofgm7okas68ohoxz3jfgn4n"
      :init="tinyMceConfig"
      v-model="codeContent"
      outputFormat="html"
      v-on:onEditorChange="this.update"
      v-on:onKeyUp="this.update"
      v-on:onRedo="this.update"
      v-on:onUndo="this.update"
    />
  </div>
</template>

<script>
//import { codemirror } from "vue-codemirror";
//import { javascript } from "@codemirror/lang-javascript";
//import { oneDark } from "@codemirror/theme-one-dark";
import Editor from "@tinymce/tinymce-vue";
//import atlan_test from "../assets/atlan_test.csv";

export default {
  name: "CodeEditor",
  props: ["query"],
  components: {
    editor: Editor,
  },
  created() {
    this.init();
  },
  data() {
    return {
      code: "select * from table",
    };
  },
  watch: {
    // code(val) {
    // },
  },
  computed: {
    codeContent: {
      get() {
        return this.query;
      },
      set(val) {
        this.$store.commit("writtenQuery",val);
        console.log("codeConten", val);
      },
    },
  },
  methods: {
    init() {
      this.tinyMceConfig = {
        menubar: false,
        statusbar: false,
        placeholder: "Write your Query here...",
        toolbar: "undo redo",
        width: 1350,
        plugins: "lists link image table code help wordcount ",
        initialValue: this.codeContent,
      };
    },
    getEditorWidth() {
      let w = parseInt(this.$store.state.screenWidth);
      let v = w.toString();
      console.log("v", v);
      return v;
    },
    update: function (event, editor) {
      console.log("content, ");

      // pass updated content back to the parent
      let content = editor.getContent();
      //let content = editor.getContent().replace(/<\/?p[^>]*>/g, "");
      let content1 = content.replace("select", "dog");
      this.codeContent = content1;
      // .replace(/&nbsp;/g, "")
      // .replace(/<br\s*\/?>/g, "");
      //this.content = content1;
      //editor.setContent(content1);
      //editor.setContent(content1);
      console.log("content, ", content1);
    },
  },
  // setup() {
  //   const code = this.$ref(`console.log('Hello, world!')`);
  //   const extensions = [javascript(), oneDark];

  //   return {
  //     code,
  //     extensions,
  //     log: console.log,
  //   };
  // },
};
</script>
<style lang="scss" scoped>
.example {
  display: flex;
  height: 50%;
  border-style: dotted;
  .codemirror,
  .pre {
    width: 50%;
    height: 100%;
    margin: 0;
    overflow: auto;
  }

  .pre {
    display: block;
    padding: 1rem;
    line-height: 1.6;
    word-break: break-all;
    word-wrap: break-word;
  }
}
</style>
'
