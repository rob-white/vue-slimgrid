# Vue Slimgrid
[![npm version](https://img.shields.io/npm/v/vue-slimgrid.svg?style=flat-square)](https://www.npmjs.com/package/vue-slimgrid) [![npm downloads](https://img.shields.io/npm/dm/vue-slimgrid.svg?style=flat-square)](https://www.npmjs.com/package/vue-slimgrid) ![gzip size](http://img.badgesize.io/https://npmcdn.com/vue-slimgrid/dist/slimgrid.common.js?compression=gzip)

A simple Vue wrapper component for [SlickGrid](https://github.com/mleibman/SlickGrid) using [SlickGrid-ES6](https://github.com/DimitarChristoff/slickgrid-es6) by DimitarChritoff as a foundation!


Includes some additional plugins built-in:
- [Slick Header Filter (danny-sg)](https://github.com/danny-sg/slickgrid-spreadsheet-plugins)
- [External Copy/Paste (Celebio)](https://github.com/Celebio/SlickGrid)
- [Conditional Input Filtering (ghiscoding)](https://stackoverflow.com/a/16779331)
- Pager w/ Selection Statistics (Avg, Count, Min, Max, Sum)
- Raw/Filtered Data Download to CSV
- Right-Click Context Menu

## Installation
```sh
npm i vue-slimgrid --save
yarn add vue-slimgrid
```

![Example](https://raw.githubusercontent.com/rob-white/vue-slimgrid/master/doc/example.png)

## Example.vue
```html

<style src="../node_modules/vue-slimgrid/dist/slimgrid.css"></style>

<template>
    <slim-grid :data="data" :column-options="columnOptions"></slim-grid>
</template>

<script>
import SlimGrid from 'vue-slimgrid';

export default {
  components: { SlimGrid },
  data: () => ({
      data: [],
      columnOptions: {}
  }),
  mounted() {
    this.data = this.generateDummyData();
  },
  methods: {
    generateDummyData() {
      let data = [];
      for (let i = 0; i < 1000; i++) {
        let row = { id: i };
        for (let j = 0; j < 6; j++) {
          row["column-" + j] = i * j;
        }
        data.push(row);
      }
      return data;
    }
  }
}
</script>

```

## To-Do
- Add documentation for available events.
- Add documentation for available props.

## Development

### Compiles and Hot-Reloads
```
cd ./examples
vue serve
```
