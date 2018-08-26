<template>
  <div id="app">
    <slim-grid :data="data" 
               :height="500"
               :column-options="columnOptions"
               :grouping="groupByDuration"
    ></slim-grid>
  </div>
</template>

<script>
import { Data } from 'slickgrid-es6';
import SlimGrid from "../src/components/SlimGrid.vue";

export default {
  components: { SlimGrid },
  data: () => ({
    data: [],
    groupByDuration: {
      getter: "duration",
      formatter(g) {
        return "Duration:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
      },
      aggregators: [
        new Data.Aggregators.Avg("percentComplete"),
        new Data.Aggregators.Sum("cost")
      ],
      aggregateCollapsed: false,
      lazyTotalsCalculation: true
    },
    columnOptions: {
      percentComplete: {
        groupTotalsFormatter(totals, columnDef) {
          let val = totals.avg && totals.avg[columnDef.field];
          if (val != null) {
            return "Avg: " + Math.round(val) + "%";
          }
          return "";
        }
      },
      cost: {
        groupTotalsFormatter(totals, columnDef) {
          let val = totals.sum && totals.sum[columnDef.field];
          if (val != null) {
            return "Total: " + ((Math.round(parseFloat(val)*100)/100));
          }
          return "";
        }
      }
    }
  }),
  mounted() {
    let someDates = ["01/01/2009", "02/02/2009", "03/03/2009"];
    let data = [];
    for (let i = 0; i < 20; i++) {
      let d = (data[i] = {});
      d["id"] = i;
      d["title"] = "Task " + i;
      d["duration"] = Math.round(Math.random() * 30);
      d["percentComplete"] = Math.round(Math.random() * 100);
      d["start"] = someDates[ Math.floor((Math.random()*2)) ];
      d["finish"] = someDates[ Math.floor((Math.random()*2)) ];
      d["cost"] = Math.round(Math.random() * 10000) / 100;
      d["effortDriven"] = (i % 5 == 0);
    }
    this.data = data;
  }
};
</script>
