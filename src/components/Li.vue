<template>
  <li v-if="this.$slots.default" class="slot">
    <slot />
  </li>
  <li v-else :class="{ disabled: !listEntry.link, options: true }">
    <Link :linkOptions="listEntry.link">
      <div>
        <p class="first-value">{{listEntry.firstValue}}</p>
        <p class="second-value" v-if="listEntry.secondValue">{{listEntry.secondValue}}</p>
      </div>
      <p class="third-value" v-if="listEntry.thirdValue">{{listEntry.thirdValue}}</p>
    </Link>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Link, { LinkOptions } from '@/components/Link.vue';

export interface ListEntry {
  id: string;
  firstValue: string;
  secondValue?: string;
  thirdValue?: string;
  link?: LinkOptions;
}

@Component({
  components: {
    Link,
  },
})
export default class Li extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop(Object)
  public listEntry?: ListEntry;
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
@import "../colors";

li.slot,
li.options {
  border-bottom: 1px solid @primary-bg;
  min-height: 77px;
  display: flex;

  &:first-child {
    border-top-left-radius: 5px;
  }

  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom: none;
  }
}

li.slot {
  flex-direction: column;
  padding: @spacing;
}

li.options {
  &:hover{
    background-image: linear-gradient(to right, @accent, @accent);
    background-position: 0 0;
    background-size: 5px 100%;
    background-repeat: no-repeat;
  }

  &.disabled {
    &:hover {
      background: none;
    }

    a {
      pointer-events: none;
    }
  }

  & > a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: @spacing;
    text-decoration: none;
    width: 100%;
  }

  .first-value,
  .third-value {
    font-size: 18px;
    font-weight: 600;
  }

  .second-value {
    font-size: 16px;
    white-space: pre;
  }
}
</style>
