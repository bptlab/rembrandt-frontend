<template>
  <router-link v-if="this.link" :to="this.link">
    <slot />
  </router-link>
  <a class="clickable" v-else @click="this.click" >
    <slot />
  </a>
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
    console.log('click');
    if (this.onClick) {
      this.onClick();
    }
  }
}
</script>

<style lang="less">
  .clickable {
    cursor: pointer;
  }
</style>
