<template>
  <router-link v-if="this.options.link" :to="this.options.link">
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
  public options!: LinkOptions;

  public click() {
    if (this.options.onClick) {
      this.options.onClick();
    }
  }
}
</script>

<style lang="less">
  .clickable {
    cursor: pointer;
  }
</style>
