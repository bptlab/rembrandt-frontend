<template>
  <fieldset class="f-toggle">
    <input
      :id="id"
      type="checkbox"
      :checked="value"
      @change="$emit('update:value', $event.target.checked)" />
    <label :for="id">
      <div class="switch" />
      <span>{{name}}</span>
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Utils from '@/utils/Utils';

@Component
export default class Toggle extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop(Boolean)
  public value!: boolean;

  @Prop(String)
  public name!: string;

  public id: string;
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.id = Utils.createRandomId();
  }
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion
}
</script>


<style lang="less">
@import "../colors.less";

fieldset.f-toggle {
  margin: @spacing 0;
  border: 0;
  padding: 0;
  width: fit-content;

  input {
    display: none;
  }

  input + label .switch {
    content: "";
    margin-right: 10px;
    border: 1px solid @tertiary-bg;
    padding: 2px;
    border-radius: 18px;
    width: 64px;
    height: 32px;
    display: block;
    background-color: transparent;
  }

  input:checked + label .switch {
    border: 1px solid @accent;
    position: relative;
  }

  input + label .switch:before {
    content: "";
    background-color: @tertiary-bg;
    border-radius: 50%;
    margin-left: 0px;
    width: 32px;
    height: 32px;
    display: block;
    position: absolute;
    transition: all 0.3s ease;
  }

  input:checked + label .switch:before {
    background-color: @accent;
    margin-left: 32px;
  }

  label {
    width: fit-content;
    display: flex;
    align-items: center;
    color: @primary;
    font-size: 16px;
  }
}
</style>
