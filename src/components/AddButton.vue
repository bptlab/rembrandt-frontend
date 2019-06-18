<template>
  <div>
    <Link class="create-button" :linkOptions="link">
      <i class="fas fa-plus"></i>
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
export default class AddButton extends Vue {
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

.create-button {
  position: absolute;
  bottom: @spacing;
  right: @spacing;
  border-radius: 7px;
  background-color: @accent;
  color: @primary;
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
    background-image: linear-gradient(to bottom right, @accent 0%, @accent 50%, @primary 50%, @primary 100%);
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
