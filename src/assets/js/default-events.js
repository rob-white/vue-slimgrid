import $ from "jquery";
import _ from "lodash";

export default {
  slickGrid: {
    onHeaderContextMenu: {
      on(e, args) {
        this.$emit("header-context-menu", e, args);
      }
    },
    onHeaderClick: {
      on(e, args) {
        this.$emit("header-click", e, args);
      }
    },
    onScroll: {
      on(e, args) {
        this.$emit("scroll", e, args);
      }
    },
    onSort: {
      on(e, args) {
        this.$emit("sort", e, args);
      },
      after(e, args) {
        if (e.target.className === "slick-header-menubutton") return;

        this.sort(e, args);
      }
    },
    onMouseEnter: {
      on(e, args) {
        this.$emit("mouse-enter", e, args);
      }
    },
    onMouseLeave: {
      on(e, args) {
        this.$emit("mouse-leave", e, args);
      }
    },
    onClick: {
      before(e, args) {
        $("html").css({ cursor: "" });

        return {
          row: this.getSelectedRows()
        };
      },
      on(e, args) {
        this.$emit("grid-click", e, args);
      }
    },
    onDblClick: {
      before(e, args) {
        $("html").css({ cursor: "" });

        return {
          row: this.getSelectedRows()
        };
      },
      on(e, args) {
        this.$emit("grid-dbl-click", e, args);
      }
    },
    onKeyDown: {
      on(e, args) {
        this.$emit("grid-key-down", e, args);
      }
    },
    onValidationError: {
      on(e, args) {
        this.$emit("validation-error", e, args);
      }
    },
    onViewportChanged: {
      on(e, args) {
        this.$emit("viewport-changed", e, args);
      }
    },
    onColumnsReordered: {
      on(e, args) {
        this.$emit("columns-reordered", e, args);
      }
    },
    onColumnsResized: {
      on(e, args) {
        this.$emit("columns-resized", e, args);
      }
    },
    onBeforeEditCell: {
      on(e, args) {
        this.$emit("before-cell-edit", e, args);
      }
    },
    onBeforeCellEditorDestroy: {
      on(e, args) {
        this.$emit("before-cell-editor-destroy", e, args);
      }
    },
    onBeforeDestroy: {
      on(e, args) {
        this.$emit("before-destroy", e, args);
      }
    },
    onActiveCellChanged: {
      on(e, args) {
        this.$emit("active-cell-changed", e, args);
      }
    },
    onActiveCellPositionChanged: {
      on(e, args) {
        this.$emit("active-cell-position-changed", e, args);
      }
    },
    onDragInit: {
      on(e, args) {
        this.$emit("drag-init", e, args);
      }
    },
    onDragStart: {
      on(e, args) {
        this.$emit("drag-start", e, args);
      }
    },
    onDrag: {
      on(e, args) {
        this.$emit("drag", e, args);
      }
    },
    onDragEnd: {
      on(e, args) {
        this.$emit("drag-end", e, args);
      }
    },
    onCellCssStylesChanged: {
      on(e, args) {
        this.$emit("cell-css-styles-changed", e, args);
      }
    },
    onHeaderRowCellRendered: {
      before(e, args) {
        if (args.column.id === "_checkbox_selector") {
          $("<input style='display: none;' class='form-control' type='text'>")
            .data("columnId", args.column.id)
            .val(this.filters[args.column.id])
            .appendTo(args.node);
        }

        $(args.node).empty();
        $(
          "<input title='" +
            args.column.id +
            "' class='form-control' style='text-align: center;' type='text'>"
        )
          .data("columnId", args.column.id)
          .val(this.filters[args.column.id])
          .appendTo(args.node);
      },
      on(e, args) {
        this.$emit("header-row-cell-rendered", e, args);
      }
    },
    onAddNewRow: {
      before(e, args) {
        var row = {},
          columns = args.grid.getColumns(),
          item = args["item"];
        // For each column we have, check to see if we had a value added for it
        _.forEach(columns, function(col) {
          row[col["id"]] = item.hasOwnProperty(col["id"])
            ? item[col["id"]]
            : null;
        });

        return {
          row: row
        };
      },
      on(e, args) {
        this.$emit("add-new-row", e, args);
      }
    },
    onCellChange: {
      before(e, args) {
        return {
          pkColumn: this.pk,
          pk: args.item[this.pk],
          value: args.item[args.grid.getColumns()[args.cell].field],
          column: args.grid.getColumns()[args.cell].field
        };
      },
      on(e, args) {
        this.$emit("cell-change", e, args);
      }
    },
    onSelectedRowsChanged: {
      before(e, args) {
        if (this.selectionModel.constructor.name != "RowSelectionModel") return;

        var selectedIndexes = args.grid.getSelectedRows();
        if (selectedIndexes.length > 0) {
          args.grid.setActiveCell(selectedIndexes[0], 0);
        }
      },
      on(e, args) {
        this.$emit("selected-rows-changed", e, args);
      }
    },
    onContextMenu: {
      before(e, args) {
        $("html").css({ cursor: "" });
        e.preventDefault();

        return {
          cell: args.grid.getCellFromEvent(e)
        };
      },
      on(e, args) {
        this.$emit("context-menu", e, args);
      },
      after(e, args) {
        if (!args.grid.getSelectedRows().length) return;

        this.contextMenu.top = e.pageY;
        this.contextMenu.left = e.pageX;
        this.contextMenu.show = true;
      }
    }
  },

  slimGrid: {
    onBeforeInit: {
      on(args) {
        this.$emit("before-init", args);
      }
    },
    onAfterInit: {
      on(args) {
        this.$emit("after-init", args);
      }
    },
    onBeforeDataUpdate: {
      on(args) {
        this.$emit("before-data-update", args);
      }
    },
    onAfterDataUpdate: {
      on(args) {
        this.$emit("after-data-update", args);
      }
    },
    onDataViewUpdate: {
      on(args) {
        this.$emit("data-view-update", args);
      }
    },
    onColumnsGenerated: {
      on(args) {
        this.$emit("columns-generated", args);
      }
    },
    onFiltersGenerated: {
      on(args) {
        this.$emit("filters-generated", args);
      }
    },
    onColumnsSet: {
      on(args) {
        this.$emit("columns-set", args);
      }
    },
    onContextMenuOptionClick: {
      on(args) {
        this.$emit("context-menu-option-selected", args);
      },
      after(args) {
        this.contextMenu.show = false;
      }
    }
  },

  dataView: {
    onRowCountChanged: {
      on(e, args) {
        this.$emit("row-count-changed", e, args);
      },
      after(e, args) {
        this.slickGrid.updateRowCount();
        this.slickGrid.render();
      }
    },
    onRowsChanged: {
      on(e, args) {
        this.$emit("rows-changed", e, args);
      },
      after(e, args) {
        this.slickGrid.invalidateRows(args.rows);
        this.slickGrid.render();
      }
    }
  },

  selectionModel: {
    onSelectedRangesChanged: {
      before(e, args) {
        if (!args.length) return { row: [] };

        this.calculatePagerStats(args);

        return {
          row: this.getSelectedRowsByRanges(args[0])
        };
      },
      on(e, args) {
        this.$emit("selected-ranges-changed", e, args);
      }
    }
  }
};
