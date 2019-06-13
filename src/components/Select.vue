<template>
  <fieldset class="f-select" :class="{active: optionsVisible}" @click="toggleOptionsVisibility">
    <div class="select">
      <span class="selected">{{ selectedOption.text || selectedOption.value || placeholder}}</span>
      <ul class="options" v-if="optionsVisible">
        <li v-if="placeholder" @click="selectOption('')">{{placeholder}}</li>
        <li v-for="option in options" :key="option.value" @click="selectOption(option.value)">
          {{option.text || option.value}}
        </li>
      </ul>
    </div>
    <label>
      <span>{{name}}</span>
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Li from '@/components/Li.vue';

export interface Option {
  value: string;
  text?: string;
}

@Component({
  components: {
    Li,
  },
})
export default class Select extends Vue {
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
  public placeholder?: string;

  @Prop(Boolean)
  public required?: boolean;

  @Prop(Array)
  public options!: Option[];

  public optionsVisible: boolean = false;

  get selectedOption(): Option {
    return this.options.find((option) => option.value === this.value) || { value: '' };
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public selectOption(value: string) {
    this.$emit('update:value', value);
  }

  public toggleOptionsVisibility() {
    this.optionsVisible = !this.optionsVisible;
  }
  // endregion

  // region private methods
  // endregion
}
</script>


<style lang="less">
@import "../colors.less";

fieldset.f-select {
  margin: @spacing 0;
  border: 1px solid @primary;
  border-top: 0;
  border-radius: 7px;
  padding: 12px;
  position: relative;
  min-width: 200px;
  cursor: pointer;

  &.active {
    border-color: @accent;

    label {
      color: @accent;

      &:before,
      &:after {
        border-color: @accent;
      }
    }
  }

  .select {
    width: 100%;
    color: @primary;
    font-size: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
    border-radius: 5px;
    background-color: @tertiary-bg;
    box-shadow: @shadow;
    position: absolute;
    top: 50px;
    left: 0px;
    z-index: 1;
    width: 100%;
  }

  li {
    min-height: unset;
    padding: 12px;
    border-bottom: 1px solid @primary-bg;

    &:hover {
      background-image: linear-gradient(to right, @accent, @accent);
      background-position: 0 0;
      background-size: 5px 100%;
      background-repeat: no-repeat;
    }

    &:first-child {
      border-top-left-radius: 5px;
    }

    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom: none;
    }
  }

  label {
    appearance: none;
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
}
</style>
