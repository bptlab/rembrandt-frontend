<template>
  <router-link :to="this.link || ''" @click="this.click">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Link extends Vue {
  @Prop(String)
  public link?: string;

  @Prop(Function)
  public onClick?: () => void;

  public click() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
</script>

<style lang="less">
</style>
