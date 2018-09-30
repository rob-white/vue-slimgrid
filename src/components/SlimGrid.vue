<style lang="scss">
@import "../assets/scss/slimgrid.scss";
</style>

<template>
    <div @click="contextMenu.show = false">
        <div :style="{ height: height + 'px' }" class="slim-grid" :class="{ 'bottom-rounded': !showPager }" ref="grid"></div>
        <slim-pager v-if="showPager"
                    :grid-rendered="rendered"
                    :slick-grid="slickGrid"
                    :data-view="dataView"
                    :downloadable="downloadable"
                    :show-stats="showPagerStats"
                    :stats="pagerStats"
        ></slim-pager>
        <slim-context-menu :show="contextMenu.show"
                           :top="contextMenu.top"
                           :left="contextMenu.left"
                           :options="contextMenu.options"
                           @option-selected="contextMenuOptionSelected"
        ></slim-context-menu>
    </div>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
import SlimPager from "./SlimPager.vue";
import SlimContextMenu from "./SlimContextMenu.vue";
import defaultEvents from "../assets/js/default-events";
import props from "../assets/js/props";
import watches from "../assets/js/watches";
import methods from "../assets/js/methods";
import { Slick, Data } from "slickgrid-es6";
import HeaderFilter from "../assets/js/plugins/slick.headerfilter";
import CellExternalCopyManager from "../assets/js/plugins/slick.cellexternalcopymanager";

export default {
  props: props,
  components: { SlimPager, SlimContextMenu },
  data() {
    return {
      rendered: false,
      slickGrid: null,
      dataView: null,
      columns: [],
      filters: {},
      pagerStats: { avg: 0, count: 0, min: 0, max: 0, sum: 0 },
      contextMenu: {
        show: false,
        top: -9999,
        left: -9999,
        options: this.contextMenuOptions
      },
      events: defaultEvents,
      defaultPlugins: {
        groupItemMetaDataProvider: {
          register: true,
          plugin: new Data.GroupMetaDataProvider({})
        },
        cellExternalCopyManager: {
          register: true,
          plugin: new CellExternalCopyManager({
            clipboardCommandHandler: editCommand => {
              let $vm = this;

              // Buffer for pasting/undo/redo.
              let undoRedoBuffer = {
                commandQueue: [],
                commandCtr: 0,

                queueAndExecuteCommand(editCommand) {
                  this.commandQueue[this.commandCtr] = editCommand;
                  this.commandCtr++;
                  editCommand.execute($vm.pk);
                  $vm.fireSlimGridEvent("onPasteCells", {});
                },

                undo() {
                  if (this.commandCtr == 0) return;

                  this.commandCtr--;
                  let command = this.commandQueue[this.commandCtr];

                  if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.undo($vm.pk);
                    $vm.fireSlimGridEvent("onPasteCellsUndo", {});
                  }
                },
                redo() {
                  if (this.commandCtr >= this.commandQueue.length) {
                    return;
                  }
                  let command = this.commandQueue[this.commandCtr];
                  this.commandCtr++;
                  if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.execute($vm.pk);
                    $vm.fireSlimGridEvent("onPasteCells", {});
                  }
                }
              };

              // Only execute pastes/undo/redo if the grid is editable.
              if ($vm.editable) {
                undoRedoBuffer.queueAndExecuteCommand.call(
                  undoRedoBuffer,
                  editCommand
                );
              }
            },
            exactDataOnly: this.pasteExactOnly, // Pasted format must match grid column width exactly.
            autoIncrement: this.autoIncrement
          })
        },
        headerFilter: {
          register: true,
          plugin: new HeaderFilter({}),
          events: {
            onFilterShown: {
              on() {
                $("html").css({ cursor: "" }); // Hack to fix interact cursor getting stuck...
              }
            },
            onFilterApplied: {
              on() {
                //
              },
              after(e, args) {
                args.grid.getData().refresh();
                args.grid.invalidate();
                args.grid.resetActiveCell();
                this.fireSlimGridEvent("onDataViewUpdate", {});
              }
            },
            onCommand: {
              on(e, args) {
                args.sortCols = [args.column];
                this.sort(e, args);
              }
            }
          }
        }
      },
      cachedEvents: {}
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.init();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  destroyed() {
    this.destroy();
  },
  computed: {
    plugins() {
      return _.merge({}, this.defaultPlugins, this.customPlugins);
    },
    slickGridOptions() {
      return {
        // Hard-coded since it's required for initializing SlickGrid after all setup.
        explicitInitialization: true,
        // Hard-coded due to nasty bug with using interact.js I can't figure out.
        enableColumnReorder: false,
        asyncEditorLoading: this.asyncEditorLoading,
        asyncEditorLoadDelay: this.asyncEditorLoadDelay,
        asyncPostRenderDelay: this.asyncPostRenderDelay,
        autoEdit: this.autoEdit,
        autoHeight: this.autoHeight,
        cellFlashingCssClass: this.cellFlashingCssClass,
        cellHighlightCssClass: this.cellHighlightCssClass,
        dataItemColumnValueExtractor: this.dataItemColumnValueExtractor,
        defaultColumnWidth: this.defaultColumnWidth,
        editable: this.editable,
        editorFactory: this.editorFactory,
        editorLock: this.editorLock,
        enableAddRow: this.enableAddRow,
        enableAsyncPostRender: this.enableAsyncPostRender,
        enableCellNavigation: this.enableCellNavigation,
        enableTextSelectionOnCells: this.enableTextSelectionOnCells,
        forceFitColumns: this.forceFitColumns,
        forceSyncScrolling: this.forceSyncScrolling,
        formatterFactory: this.formatterFactory,
        fullWidthRows: this.fullWidthRows,
        headerRowHeight: this.headerRowHeight,
        leaveSpaceForNewRows: this.leaveSpaceForNewRows,
        multiColumnSort: this.multiColumnSort,
        multiSelect: this.multiSelect,
        rowHeight: this.rowHeight,
        selectedCellCssClass: this.selectedCellCssClass,
        showHeaderRow: this.showHeaderRow,
        syncColumnCellResize: this.syncColumnCellResize,
        topPanelHeight: this.topPanelHeight
      };
    }
  },
  watch: watches,
  methods: methods
};
</script>
