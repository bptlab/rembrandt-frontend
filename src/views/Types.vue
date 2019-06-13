<template>
  <main>
    <ListSection title="Abstract Types" :list="abstractResourceTypesList" />
    <ListSection title="Non-Abstract Types" :list="nonAbstractResourceTypesList" />
    <AddButton :link="{link: '/types/create'}"/>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ResourceTypes, ResourceType } from '@/apis/rembrandt/rembrandt';
import { ListEntry } from '@/components/Li.vue';
import ListSection from '@/components/ListSection.vue';
import Link from '@/components/Link.vue';
import Utils from '@/utils/Utils';
import AddButton from '@/components/AddButton.vue';

@Component({
  components: {
    ListSection,
    Link,
    AddButton,
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

