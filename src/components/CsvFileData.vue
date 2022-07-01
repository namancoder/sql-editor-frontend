<template>
  <div>
    <v-dialog v-model="dialogOpen">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col>
              <v-btn @click="closeDialog()" large color="primary">Close</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-data-table :items="items" :headers="headers"> </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CSvFileData",
  props: ["viewTable"],
  data() {
    return {
      headerArray: [],
    };
  },
  created() {
    this.parseCSV();
  },

  computed: {
    dialogOpen: {
      get() {
        return this.viewTable;
      },
    },
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
  },
  methods: {
    closeDialog() {
      console.log("close dialog");
      this.$emit("close-dialog");
    },

    parseCSV() {
      this.$papa.parse(
        "https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/territories.csv",
        {
          //header: ["territoryID", "territoryDescription", "regionID"],
          header: true,
          download: true,
          skipEmptyLines: true,
          complete: async function (results) {
            // this.headerArray = results.meta.fields;
            // //this.createHeaders();
            // this.headers = [
            //   {
            //     text: this.headerArray[0].toUpperCase(),
            //     value: this.headerArray[0],
            //     align: "start",
            //   },
            // ];
            // for (let i = 1; i < this.headerArray.length; i++) {
            //   //   let temp = {
            //   //     text: this.headerArray[i].toUpperCase(),
            //   //     value: this.headerArray[i],
            //   //     align: "start",
            //   //   };
            //   //console.log(i + 1, temp);
            //   this.headers.push({
            //     text: this.headerArray[i].toUpperCase(),
            //     value: this.headerArray[i],
            //     align: "start",
            //   });
            // }
            // this.items = results.data;
            // console.log(this.headers);
            console.log(results);
          },
          // error: function (err) {
          //   console.log(err);
          // },
        }
      );
    },
  },
};
</script>

<style></style>
