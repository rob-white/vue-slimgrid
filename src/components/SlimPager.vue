<template>
    <div class="slim-pager">
        <div class="slim-pager-container" ref="pager"></div>
        <span class="slim-pager-download">
            <a class="slim-pager-download-link"
               v-show="downloadable"
               @click="downloadRawCsv"
               :href="rawDownload.url"
               :download="rawDownload.filename"
               target="_blank">{{ rawDownload.label }}</a>

            <a class="slim-pager-download-link"
               v-show="downloadable"
               @click="downloadFilteredCsv"
               :href="filteredDownload.url"
               :download="filteredDownload.filename"
               target="_blank">{{ filteredDownload.label }}</a>
        </span>
        <span v-show="showStats" class="slim-pager-statistics">
            <span class="slim-pager-statistic">Average: {{ stats.avg }}</span>
            <span class="slim-pager-statistic">Count: {{ stats.count }}</span>
            <span class="slim-pager-statistic">Min: {{ stats.min }}</span>
            <span class="slim-pager-statistic">Max: {{ stats.max }}</span>
            <span class="slim-pager-statistic">Sum: {{ stats.sum }}</span>
        </span>
    </div>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
import json2csv from "json2csv";
import SlickGridPager from "../assets/js/plugins/slick.pager";

export default {
  props: {
    gridRendered: {
      type: Boolean,
      required: true,
      default: false
    },
    slickGrid: {
      required: true
    },
    dataView: {
      required: true
    },
    stats: {
      type: Object,
      required: true
    },
    downloadable: {
      type: Boolean,
      required: true
    },
    showStats: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      rawDownload: {
        url: "data:application/csv;charset=utf-8,",
        filename: "Data.csv",
        label: "Data"
      },
      filteredDownload: {
        url: "data:application/csv;charset=utf-8,",
        filename: "Filtered.csv",
        label: "Filtered"
      }
    };
  },
  watch: {
    gridRendered(gridRendered) {
      if (gridRendered) this.bindPager();
    }
  },
  methods: {
    /**
     * Instantiates a new SlickGridPager and binds it to the proper element in the template.
     */
    bindPager() {
      new SlickGridPager(this.dataView, this.slickGrid, $(this.$refs.pager));
    },

    /**
     * Performs the download of the raw (untouched) data from the grid.
     */
    downloadRawCsv(e) {
      const fields = _.map(this.slickGrid.getColumns(), column => column.id);

      if (!fields.length) return;

      let csv = json2csv({
        excelStrings: true,
        data: this.dataView.getItems(),
        fields
      });

      this.handleIEDownload(e, csv, this.rawDownload.filename);
      this.rawDownload.url = this.formatDownloadUrl(csv);
    },

    /**
     * Performs the download of the filtered data from the grid.
     */
    downloadFilteredCsv(e) {
      const fields = _.map(this.slickGrid.getColumns(), column => column.id);

      if (!fields.length) return;

      let csv = json2csv({
        excelStrings: true,
        data: this.getFilteredJson(),
        fields
      });

      this.handleIEDownload(e, csv, this.filteredDownload.filename);
      this.filteredDownload.url = this.formatDownloadUrl(csv);
    },

    /**
     * If the browser is IE10+, then baby it with its own download style...
     */
    handleIEDownload(e, csv, filename) {
      if (!window.navigator.msSaveBlob) return;

      e.preventDefault();
      window.navigator.msSaveOrOpenBlob(
        new Blob([csv], { type: "text/plain;charset=utf-8;" }),
        filename
      );
    },

    /**
     * Generates the download URL used for modern browsers (not IE).
     */
    formatDownloadUrl(csv) {
      return "data:application/csv;charset=utf-8," + encodeURIComponent(csv);
    },

    /**
     * Gets the data that's been filtered by the grid.
     */
    getFilteredJson() {
      if (!this.dataView) return [];

      return _.map(_.range(this.dataView.getLength()), idx => {
        return this.dataView.getItem(idx);
      });
    }
  }
};
</script>
