export default {
  data() {
    this.setData();
  },
  grouping() {
    this.setDataViewGrouping();
  },
  filters: {
    handler() {
      this.setFilters();
    },
    deep: true
  },
  columnOptions: {
    handler() {
      this.generateColumns();
    },
    deep: true
  },
  slickGridOptions: {
    handler() {
      this.setOptions();
    },
    deep: true
  },
  explicitColumns() {
    this.generateColumns();
  },
  columns() {
    this.setColumns();
  },
  selectionModel() {
    this.setSelectionModel();
  }
};
