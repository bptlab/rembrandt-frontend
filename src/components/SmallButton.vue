<template>
  <div>
    <Link class="small-button" :linkOptions="link">
      <slot />
    </Link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Link, { LinkOptions } from '@/components/Link.vue';

@Component({
  components: {
    Link,
  },
})
export default class SmallButton extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop(Object)
  public link!: LinkOptions;

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

.small-button {
  border-radius: 7px;
  font-size: 14px;
  background-color: @accent;
  color: @secondary;
  margin: @spacing 0;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: @shadow;
  transition: transform 0.3s ease;

  & > * {
    transition: transform 0.3s ease;
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
    transform: rotate(-45deg);

    & > * {
      transform: rotate(45deg);
    }
  }
}
</style>
