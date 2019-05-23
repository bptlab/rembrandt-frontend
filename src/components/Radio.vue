<template>
  <fieldset class="f-radio">
    <input
      v-model="newResourceType.abstract"
      type="radio"
      id="abstract-true"
      name="abstract"
      value="true"
    >
    <label for="abstract-true">Yes</label>
    <input
      v-model="newResourceType.abstract"
      type="radio"
      id="abstract-false"
      name="abstract"
      value="false"
    >
    <label for="abstract-false">No</label>
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

fieldset.f-radio {
  margin: @spacing 0;
  border: 0;
  padding: 0;
  display: flex;
  flex-direction: row;

  input {
    display: none;
  }

  input + label::before {
    width: 16px;
    height: 16px;
    background-color: transparent;
    border: 1px solid @accent;
    border-radius: 5px;
    display: block;
    content: "";
    float: left;
    margin-right: 5px;
  }

  input:checked + label::before {
    background-color: @accent;
  }

  label {
    color: @primary;
    font-size: 16px;
    width: fit-content;

  }
}
</style>
