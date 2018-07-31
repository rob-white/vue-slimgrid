<template>
    <ul class="slim-context-menu"
        :style="{ top: top + 'px', left: left + 'px' }"
        v-if="options.length"
        v-show="show">
        <li class="slim-context-menu-option" :key="option.label" @click="optionSelected($event, option)" v-for="option in options">
            {{ option.label }}
        </li>
    </ul>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    top: {
      type: Number,
      required: true
    },
    left: {
      type: Number,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    optionSelected(e, option) {
      this.$emit("option-selected", e, option);
    }
  }
};
</script>
