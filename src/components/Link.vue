<template>
  <router-link v-if="this.linkOptions.link" :to="this.linkOptions.link">
    <slot />
  </router-link>
  <a class="clickable" v-else @click="this.click" >
    <slot />
  </a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export interface LinkOptions {
  link?: string;
  onClick?: () => void;
}

@Component
export default class Link extends Vue {
  @Prop(Object)
  public linkOptions!: LinkOptions;

  public click() {
    if (this.linkOptions.onClick) {
      this.linkOptions.onClick();
    }
  }
}
</script>

<style lang="less">
  .clickable {
    cursor: pointer;
  }
</style>
