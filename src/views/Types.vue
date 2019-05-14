<template>
  <main>
    <ListSection title="Abstract Types" :list="abstractResourceTypesList" />
    <ListSection title="Non-Abstract Types" :list="nonAbstractResourceTypesList" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ResourceTypes, ResourceType } from "@/apis/rembrandt/rembrandt";
import ListSection, { ListElement } from "@/components/ListSection.vue";

@Component({
  components: {
    ListSection,
  }
})
export default class Types extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceTypes: ResourceType[] = [];

  public get abstractResourceTypes(): ResourceType[] {
    return this.resourceTypes.filter(resourceType => resourceType.abstract);
  }

  public get nonAbstractResourceTypes(): ResourceType[] {
    return this.resourceTypes.filter(resourceType => !resourceType.abstract);
  }

  public get abstractResourceTypesList(): ListElement[] {
    return this.abstractResourceTypes.map((resourceType) => {
      return {
        id: resourceType._id || resourceType.name,
        firstValue: resourceType.name,
        secondValue: `Parent Type: ${resourceType.parentType}`,
      }
    })
  }

  public get nonAbstractResourceTypesList(): ListElement[] {
    return this.nonAbstractResourceTypes.map((resourceType) => {
      return {
        id: resourceType._id || resourceType.name,
        firstValue: resourceType.name,
        secondValue: `Parent Type: ${resourceType.parentType}`,
        thirdValue: `300 Instances`,
      }
    })
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
