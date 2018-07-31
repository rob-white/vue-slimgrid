export default {
  data(data) {
    this.setData();
  },
  grouping(grouping) {
    this.setDataViewGrouping();
  },
  filters: {
    handler(value) {
      this.setFilters();
    },
    deep: true
  },
  columnOptions: {
    handler(value) {
      this.generateColumns();
    },
    deep: true
  },
  slickGridOptions: {
    handler(value) {
      this.setOptions();
    },
    deep: true
  },
  explicitColumns(columns) {
    this.generateColumns();
  },
  columns(columns) {
    this.setColumns();
  },
  selectionModel(selectionModel) {
    this.setSelectionModel();
  }
};
