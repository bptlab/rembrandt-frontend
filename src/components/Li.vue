<template>
  <li v-if="this.$slots.default">
    <slot />
  </li>
  <li v-else v-bind:class="{ disabled: !options.link.link && !options.link.onClick }">
    <Link :options="options.link">
      <div>
        <p class="first-value">{{options.firstValue}}</p>
        <p class="second-value" v-if="options.secondValue">{{options.secondValue}}</p>
      </div>
      <p class="third-value" v-if="options.thirdValue">{{options.thirdValue}}</p>
    </Link>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Link, { LinkOptions } from '@/components/Link.vue';

export interface LiOptions {
  id: string;
  firstValue: string;
  secondValue?: string;
  thirdValue?: string;
  link: LinkOptions;
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
  public options?: LiOptions;
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

section.list {
  .first-value,
  .third-value {
    font-size: 18px;
    font-weight: 600;
  }

  .second-value {
    font-size: 16px;
  }

  li {
    border-bottom: 1px solid @primary-bg;
    min-height: 77px;
    display: flex;

    &:hover{
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

    & > a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      text-decoration: none;
      width: 100%;
    }
  }

  li.disabled {
    &:hover {
      background: none;
    }

    a {
      pointer-events: none;
    }
  }
}
</style>
