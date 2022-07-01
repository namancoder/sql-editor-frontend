import Vue from "vue";
import Vuex from "vuex";
import Papa from "papaparse";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    screenWidth: 0,
    headers: [],
    items: [],
    filteredItems: [],
    writtenQuery: "",
    queries: [
      "SELECT  * FROM  territories",
      "SELECT  * FROM  territories WHERE regionId=3",
      "SELECT  * FROM  territories WHERE regionId=4",
    ],
  },
  getters: {
    counter(state) {
      return state.count;
    },
  },
  mutations: {
    addHeaders(state, val) {
      console.log("addHeaders", val);
      state.headers = val;
    },
    addItems(state, val) {
      console.log("addItems", val);
      state.items = val;
    },
    getScreenWidth(state, val) {
      state.screenWidth = val;
    },
    addQuery(state, val) {
      if (val == 1)
        state.filteredItems = state.items.filter(function (item) {
          return item.regionID == 3;
        });
      else if (val == 0) {
        state.filteredItems = state.items;
      } else if (val == 2) {
        state.filteredItems = state.items.filter(function (item) {
          return item.regionID == 4;
        });
      } else state.filteredItems = state.items;
    },
    writtenQuery(state, val) {
      state.writtenQuery = val;
    },
  },
  actions: {
    parseCSV(context) {
      //console.log("val", val);
      Papa.parse(
        "https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/territories.csv",
        {
          //header: ["territoryID", "territoryDescription", "regionID"],
          header: true,
          download: true,
          skipEmptyLines: true,
          complete: async function (results) {
            console.log(results);
            let headerArray = results.meta.fields;
            let heads = [];
            heads = [
              {
                text: headerArray[0],
                value: headerArray[0],
                align: "start",
                sortable: true,
              },
            ];
            for (let i = 1; i < headerArray.length; i++) {
              heads.push({
                text: headerArray[i],
                value: headerArray[i],
                align: "start",
                sortable: true,
              });
            }
            let items = results.data;
            console.log("this.headers", heads, context);
            console.log("this.items", items);
            context.commit("addHeaders", heads);
            context.commit("addItems", items);
          },
        }
      );
    },
  },
});
