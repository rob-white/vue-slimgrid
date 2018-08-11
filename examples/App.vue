<template>
  <div id="app">
    <slim-grid :data="data" :height="500"></slim-grid>
  </div>
</template>

<script>
import SlimGrid from "../src/components/SlimGrid.vue";

export default {
  components: { SlimGrid },
  data: () => ({
    data: []
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
  }
};
</script>
