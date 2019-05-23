<template>
  <fieldset class="f-input" @click="focusInput">
    <input
      :autofocus="autofocus"
      :placeholder="placeholder"
      ref="input"
      :required="required"
      type="text"
      :value="value"
      @input="$emit('update:value', $event.target.value)" />
    <label>
      <span>{{name}}</span>
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
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
  public focusInput() {
    (this.$refs.input as any).focus();
  }
  // endregion

  // region private methods
  // endregion
}
</script>


<style lang="less">
@import "../colors.less";

fieldset.f-input {
  margin: @spacing 0;
  border: 1px solid @primary;
  border-top: 0;
  border-radius: 7px;
  padding: 12px;
  position: relative;

  &:focus-within {
    border-color: @accent;
  }

  input {
    border: 0;
    padding: 0;
    width: 100%;
    background: transparent;
    color: @primary;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  label {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    color: @primary;
    font-size: 14px;

    &:before {
      border-top: 1px solid @primary;
      border-top-left-radius: 7px;
      flex: 5px 0 0;
      content: "";
    }

    &:after {
      border-top: 1px solid @primary;
      border-top-right-radius: 7px;
      flex: 1 0 0;
      content: "";
    }

    span {
      margin-top: -10px;
      padding: 0 5px;
    }
  }

  input:focus + label {
    color: @accent;

    &:before,
    &:after {
      border-color: @accent;
    }
  }
}
</style>
