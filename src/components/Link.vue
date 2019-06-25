<template>
  <router-link v-if="linkOptions && linkOptions.link" :to="linkOptions.link">
    <slot />
  </router-link>
  <a class="clickable" v-else @click="this.click" >
    <slot />
  </a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export interface LinkOptions {
  link?: any;
  onClick?: () => void;
}

@Component
export default class Link extends Vue {
  @Prop(Object)
  public linkOptions?: LinkOptions;

  public click() {
    if (!this.linkOptions || !this.linkOptions.onClick) {
      return;
    }
    this.linkOptions.onClick();
  }
}
</script>

<style lang="less">
  .clickable {
    cursor: pointer;
  }
</style>
