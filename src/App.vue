<template>
  <div id="app">
    <slim-grid :data="data" :width="600" :height="300"/>
  </div>
</template>

<script>
import SlimGrid from "./components/SlimGrid.vue";

export default {
  components: { SlimGrid },
  data() {
    return {
      data: []
    };
  },
  mounted() {
    var data = [];
    for (var i = 0; i < 1000; i++) {
      var row = { id: i };
      for (var j = 0; j < 10; j++) {
        row["column-" + j] = i * j;
      }
      data.push(row);
    }
    this.data = data;
  }
};
</script>
