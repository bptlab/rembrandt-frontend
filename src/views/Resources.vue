<template>
  <main>
    <ListSection :key="element.id" v-for="element in listOfTypesWithResources" :title="element.name" :list="resourceInstanceForType(element)" />
  </main>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import ListSection, { ListElement } from '@/components/ListSection.vue';
import { ResourceInstance, ResourceInstances, ResourceType, ResourceTypes } from '@/apis/rembrandt/rembrandt';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ListSection,
  },
})
export default class Resources extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceInstances: ResourceInstance[] = [];
  public listOfResourceTypes: ResourceType[] = [];

  public get listOfTypesWithResources() {
    return this.listOfResourceTypes.filter((resourceType) => {
      return this.resourceInstanceForType(resourceType).length
    });
  }

  public get allResourceInstances(): ListElement[] {
    return Utils.resourceInstancesToList(this.resourceInstances);
  }

  public resourceInstanceForType(resourceType : ResourceType): ListElement[] {
    //filter for resourcetype:
    const resourcesPerType = this.resourceInstances.filter((resourceInstance) => {
      return (resourceInstance.resourceType === resourceType.id && this.filterInstances(resourceInstance) );
    });
    return Utils.resourceInstancesToList(resourcesPerType);
  }

  public filterInstances(resourceInstance : ResourceInstance) {
    return (resourceInstance.resourceType.includes("208") ||
            resourceInstance.id.includes("208"))
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public async mounted() {
    this.listOfResourceTypes = await ResourceTypes.get();
    this.resourceInstances = await ResourceInstances.get();
  }
  // endregion

  // region private methods
  // endregion
}
</script>
