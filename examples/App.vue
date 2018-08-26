<template>
  <div id="app">
    <slim-grid :context-menu-options="contextMenuOptions" 
               :column-options="columnOptions"
               :row-formatter="rowFormatter"
               :data="data" 
               :height="500"
    ></slim-grid>
  </div>
</template>

<script>
import SlimGrid from "../src/components/SlimGrid.vue";

export default {
  components: { SlimGrid },
  data: () => ({
    data: [],
    contextMenuOptions: [
      { label: 'Option-1' },
      { label: 'Option-2' },
      { label: 'Option-3' }
    ],
    columnOptions: {
      'column-0': {
        headerInput: false,
        headerFilter: false,
        sortable: false
      }
    }
  }),
  mounted() {
    var data = [];
    for (var i = 0; i < 1000; i++) {
      var row = { id: i };
      for (var j = 0; j < 6; j++) {
        row["column-" + j] = i * j;
      }
      data.push(row);
    }
    this.data = data;
  },
  methods: {
    rowFormatter(row) {
        console.log(row);
        return {
          "columns": {
            0: {
              "colspan": "2"
            }
          }
        };
    }
  }
};
</script>
