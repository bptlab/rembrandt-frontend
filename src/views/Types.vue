<template>
  <main>
    <ListSection title="Abstract Types" :list="abstractResourceTypesList" />
    <ListSection title="Non-Abstract Types" :list="nonAbstractResourceTypesList" />
    <SmallButton :link="{link: '/types/create'}" class="create-type-button">
      <i class="fas fa-plus"></i>
    </SmallButton>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ResourceTypes, ResourceType } from '@/apis/rembrandt/rembrandt';
import { ListEntry } from '@/components/Li.vue';
import ListSection from '@/components/ListSection.vue';
import Link from '@/components/Link.vue';
import Utils from '@/utils/Utils';
import SmallButton from '@/components/SmallButton.vue';

@Component({
  components: {
    ListSection,
    Link,
    SmallButton,
  },
})
export default class Types extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceTypes: ResourceType[] = [];

  public get abstractResourceTypesList(): ListEntry[] {
    const abstractResourceTypes = this.resourceTypes.filter((resourceType) => resourceType.abstract);
    return Utils.resourceTypesToList(abstractResourceTypes);
  }

  public get nonAbstractResourceTypesList(): ListEntry[] {
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
    try {
      this.resourceTypes = await ResourceTypes.get();
    } catch (e) {
      this.$notifications.create(e);
    }

  }
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import "../colors.less";

.create-type-button {
  position: fixed;
  bottom: 0;
  right: @spacing;
}
</style>

