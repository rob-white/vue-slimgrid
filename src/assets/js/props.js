import { Plugins } from "slickgrid-es6";

export default {
  // SlimGrid Props
  pk: {
    type: String,
    default: "id"
  },
  data: {
    type: Array,
    default() {
      return [];
    }
  },
  columnOptions: {
    type: Object,
    default() {
      return {};
    }
  },
  explicitColumns: {
    type: Array,
    default() {
      return [];
    }
  },
  height: {
    type: Number,
    default: 600
  },
  selectionModel: {
    type: Object,
    default() {
      return new Plugins.CellSelectionModel();
    }
  },
  customPlugins: {
    type: Object,
    default() {
      return {};
    }
  },
  rowFormatter: {
    type: Function,
    default: function(row) {
      return row;
    }
  },
  sort: {
    type: Function,
    default: function(e, args) {
      args.grid.getData().sort(function(row1, row2) {
        for (let i = 0, l = args.sortCols.length; i < l; i++) {
          const sortAsc = args.hasOwnProperty("command")
            ? args.command === "sort-asc"
            : args.sortCols[i].sortAsc;
          const field = args.sortCols[i].hasOwnProperty("field")
            ? args.sortCols[i].field
            : args.sortCols[i].sortCol.field;
          const sign = sortAsc ? 1 : -1;
          const x = row1[field],
            y = row2[field];
          const result = (x < y ? -1 : x > y ? 1 : 0) * sign;
          if (result != 0) return result;
        }

        return 0;
      }, true);
    }
  },
  grouping: {
    default() {
      return [];
    }
  },
  contextMenuOptions: {
    type: Array,
    default() {
      return [];
    }
  },
  downloadable: {
    type: Boolean,
    default: true
  },
  showPager: {
    type: Boolean,
    default: true
  },
  showPagerStats: {
    type: Boolean,
    default: true
  },
  pasteExactOnly: {
      type: Boolean,
      default: false
  },

  //showCheckboxes: {
  //    type: Boolean,
  //    default: false
  //},
  //copyable: {
  //    type: Boolean,
  //    default: false
  //},

  // SlickGrid Props
  asyncEditorLoading: {
    type: Boolean,
    default: false
  },
  asyncEditorLoadDelay: {
    type: Number,
    default: 100
  },
  asyncPostRenderDelay: {
    type: Number,
    default: 50
  },
  autoEdit: {
    type: Boolean,
    default: true
  },
  autoHeight: {
    type: Boolean,
    default: false
  },
  cellFlashingCssClass: {
    type: String,
    default: "flashing"
  },
  cellHighlightCssClass: {
    type: String,
    default: "selected"
  },
  dataItemColumnValueExtractor: {
    default: null
  },
  defaultColumnWidth: {
    type: Number,
    default: 150
  },
  editable: {
    type: Boolean,
    default: false
  },
  editorFactory: {
    default: null
  },
  enableAddRow: {
    type: Boolean,
    default: false
  },
  enableAsyncPostRender: {
    type: Boolean,
    default: false
  },
  enableCellNavigation: {
    type: Boolean,
    default: true
  },
  enableTextSelectionOnCells: {
    type: Boolean,
    default: false
  },
  forceFitColumns: {
    type: Boolean,
    default: false
  },
  forceSyncScrolling: {
    type: Boolean,
    default: false
  },
  formatterFactory: {
    default: null
  },
  fullWidthRows: {
    type: Boolean,
    default: false
  },
  headerRowHeight: {
    type: Number,
    default: 30
  },
  leaveSpaceForNewRows: {
    type: Boolean,
    default: false
  },
  multiColumnSort: {
    type: Boolean,
    default: true
  },
  multiSelect: {
    type: Boolean,
    default: false
  },
  rowHeight: {
    type: Number,
    default: 25
  },
  selectedCellCssClass: {
    type: String,
    default: "selected"
  },
  showHeaderRow: {
    type: Boolean,
    default: true
  },
  syncColumnCellResize: {
    type: Boolean,
    default: false
  },
  topPanelHeight: {
    type: Number,
    default: 25
  }
};
