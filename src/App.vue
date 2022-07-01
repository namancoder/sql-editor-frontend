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
        <v-btn class="ml-2" @click="viewTable = true" rounded color="primary"
          >View Original Table</v-btn
        >
      </v-row>
      <v-row class="pl-2">
        <v-col cols="9">
          <CodeEditor :query="query" />
          <v-row class="ml-4 mt-2">
            <v-btn class="mr-2" color="red" @click="clearQuery()"> clear</v-btn>
            <v-btn color="success" @click="runQuery()"> run</v-btn>
          </v-row>
        </v-col>
        <v-col>
          <v-list rounded>
            <div class="font-weight-bold">Select Query</div>
            <v-list-item-group
              v-model="selectedItem"
              light
              color="primary"
              value="selectedItem"
            >
              <v-list-item
                class="listItem mb-1"
                
                v-for="(item, i) in queries"
                :key="i"
                @click="getSelectedItemData(item, i)"
              >
                <v-list-item-title v-text="item"></v-list-item-title
              ></v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>

      <v-row class="ml-2" justify="center" align="center" v-if="query != ''">
        <v-col>
          <v-data-table
            :headers="headers"
            :items="filteredItems"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import CodeEditor from "./components/CodeEditor";
import CsvFileData from "./components/CsvFileData";
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
    selectedQuery: "",
    options: {
      lineNumbers: true,
    },
    width: null,
    height: null,
  }),
  created() {
    this.$store.dispatch("parseCSV");
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
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
    filteredItems: {
      get() {
        return this.$store.state.filteredItems;
      },
    },
  },
  methods: {
    onResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      console.log("height", this.height);
      this.$store.commit("getScreenWidth", window.innerWidth);
      console.log("width", this.width);
    },
    closeTableDialog() {
      this.viewTable = false;
    },
    getSelectedItemData(item, index) {
      console.log("item", item, index);
      this.query = "<b>" + item + "</b>";
      this.$store.commit("addQuery", index);
    },
    clearQuery() {
      this.query = "";
      this.selectedItem = -1;
    },
    runQuery() {
      if (
        this.$store.state.writtenQuery != null &&
        this.$store.state.writtenQuery != ""
      ) {
        this.query = "<b>" + this.$store.state.writtenQuery + "</b>";
        this.$store.commit("addQuery", -1);
      }
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
.listItem{
  border: 1px solid grey;
  border-radius: 20px;
}
</style>
