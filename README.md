# vue-slimgrid

## Installation
```sh
npm i vue-slimgrid --save
yarn add vue-slimgrid
```

![Example](https://github.com/rob-white/vue-slimgrid/blob/master/doc/example.png?raw=true)

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
  data() => ({
      data: [],
      columnOptions: {}
  }),
  mounted() {
    this.generateDummyData();
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
      this.data = data;
    }
  }
}
</script>

```

## To-Do
- Add documentation of dependencies and reference to slickgrid-es6/base slickgrid repo.
- Add documentation for available events.
- Add documentation on how to use ```columnOptions``` prop.
- Add open source license stuff.

## Development

### Compiles and Hot-Reloads
```
cd ./examples
vue serve
```
