<template>
  <main>
    <ListSection title="Abstract Types" :list="abstractResourceTypesList" />
    <ListSection title="Non-Abstract Types" :list="nonAbstractResourceTypesList" />
    <Link class="create-type-button" :options="{link: '/types/create'}">
      <i class="fas fa-plus"></i>
    </Link>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ResourceTypes, ResourceType } from '@/apis/rembrandt/rembrandt';
import { LiOptions } from '@/components/Li.vue';
import ListSection from '@/components/ListSection.vue';
import Link from '@/components/Link.vue';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ListSection,
    Link,
  },
})
export default class Types extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceTypes: ResourceType[] = [];

  public get abstractResourceTypesList(): LiOptions[] {
    const abstractResourceTypes = this.resourceTypes.filter((resourceType) => resourceType.abstract);
    return Utils.resourceTypesToList(abstractResourceTypes);
  }

  public get nonAbstractResourceTypesList(): LiOptions[] {
    const nonAbstractResourceTypes =  this.resourceTypes.filter((resourceType) => !resourceType.abstract);
    return Utils.resourceTypesToList(nonAbstractResourceTypes);
  }


  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public async mounted() {
    this.resourceTypes = await ResourceTypes.get();
  }
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import "../colors.less";

.create-type-button {
  position: absolute;
  bottom: @spacing;
  right: @spacing;
  border-radius: 50%;
  background-color: @primary;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: @accent;

    i {
      color: @primary;
    }
  }

  i {
    color: @primary-bg;
  }
}
</style>

