<template>
  <button class="f-button" :class="{small: small}" type="button" @click="onClick">{{text}}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop(String)
  public text!: string;

  @Prop(Function)
  public onClick!: () => void;

  @Prop(Boolean)
  public small?: boolean;
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion
}
</script>


<style lang="less">
@import "../colors.less";

button.f-button {
  margin: @spacing 0;
  border: 0;
  border-radius: 7px;
  padding: 15px 25px;
  background-color: @accent;
  color: @secondary;
  font-size: 14px;
  font-weight: bold;
  box-shadow: @shadow;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    background-image: linear-gradient(
      to bottom right,
      @accent 0%,
      @accent 50%,
      @secondary 50%,
      @secondary 100%
    );
    background-position: 100% 100%;
    background-size: @spacing @spacing;
    background-repeat: no-repeat;
  }

  &.small {
    padding: 5px 25px;
    margin: 0.1em 0;
  }
}
</style>
