<template>
  <fieldset class="f-textArea">
    <h4>
      {{firstString}}
    </h4>
    <br>
    <textarea
      :autofocus="autofocus"
      :placeholder="placeholder"
      ref="textArea"
      :required="required"
      type="text"
      :value="value"
      @input="$emit('update:value', $event.target.value)" />
    <br>
    <h4>
      {{secondString}}
    </h4>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TextArea extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop(String)
  public value!: string;

  @Prop(String)
  public name!: string;

  @Prop(String)
  public firstString!: string;

  @Prop(String)
  public secondString!: string;

  @Prop(String)
  public placeholder!: string;

  @Prop(Boolean)
  public autofocus?: boolean;

  @Prop(Boolean)
  public required?: boolean;
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

fieldset.f-textArea {
  margin: @spacing 0;
  border: 0px solid @primary;
  border-radius: 7px;
  padding: 5px;
  position: relative;
  background-color: @tertiary-bg;

  &:focus-within {
    border-color: @accent;
  }

  textarea {
    border: 0;
    padding: 0;
    width: 100%;
    background-color: @tertiary-bg;
    color: @primary;
    font-size: 16px;
    font-weight: bold;
    resize: vertical;
  }
}
</style>
