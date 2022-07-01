<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">SQL EDITOR</div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <CsvFileData
        :viewTable="viewTable"
        v-on:close-dialog="closeTableDialog"
      />
      <v-row class="ma-2">
        <span class="ml-2 mt-2 font-italic">territories.csv</span>
        <v-btn @click="viewTableFunction()" color="primary" text
          >View Table</v-btn
        >
      </v-row>
      <v-row>
        <v-col cols="10">
          <CodeEditor :query="query" />
        </v-col>
        <v-col class="mr-4">
          <v-list>
            <v-subheader>Select Query</v-subheader>
            <v-list-item-group
              v-model="selectedItem"
              light
              value="selectedItem"
            >
              <v-list-item
                v-for="(item, i) in queries"
                :key="i"
                @click="getSelectedItemData(item)"
              >
                <v-list-item-title v-text="item"></v-list-item-title
              ></v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="ml-2 mt-n2" text color="red" @click="query = ''"> clear</v-btn>
      </v-row>
      <!-- <v-textarea v-model="content" id="editor"></v-textarea> -->
    </v-main>
  </v-app>
</template>

<script>
import CodeEditor from "./components/CodeEditor";
import CsvFileData from "./components/CsvFileData";

//import 'codemirror/lib/codemirror.css';
export default {
  name: "App",

  components: {
    CodeEditor,
    CsvFileData,
  },
  data: () => ({
    viewTable: false,
    fileLoaded: false,
    content: "",
    query: "",
    headerArray: [],
    selectedItem: -1,
    options: {
      lineNumbers: true,
    },
  }),
  created() {
    this.$store.dispatch("parseCSV");
  },
  wacth: {
    selectedItem(val) {
      console.log("selectedItem", val);
    },
  },
  computed: {
    headers: {
      get() {
        return this.$store.state.headers;
      },
    },
    items: {
      get() {
        return this.$store.state.items;
      },
    },
    queries: {
      get() {
        return this.$store.state.queries;
      },
    },
  },
  methods: {
    closeTableDialog() {
      this.viewTable = false;
    },
    getSelectedItemData(item) {
      console.log("item", item);
      this.query = item;
    },
  },
};
</script>
<style lang="scss" scoped>
.editor {
  grid-row: 3;
  grid-column: 2;
  z-index: 5;
  overflow: auto;
}
</style>
