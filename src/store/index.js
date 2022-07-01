import Vue from "vue";
import Vuex from "vuex";
import Papa from "papaparse";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 0,
    headers: [],
    items: [],
    queries: ["select * from territories", "Hello", "Hey There!"],
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
                text: headerArray[0].toUpperCase(),
                value: headerArray[0],
                align: "start",
                sortable: true,
              },
            ];
            for (let i = 1; i < headerArray.length; i++) {
              heads.push({
                text: headerArray[i].toUpperCase(),
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
// export default new Vuex.Store({
//     state: {
//         n: 0
//     },
//     mutations: {
//         change_n(state) {
//             state.n++
//         },
//     },
//     actions: {
//         change_n(context) {
//             context.commit('change_n')
//         }
//     }
// })
