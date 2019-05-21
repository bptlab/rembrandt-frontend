<template>
  <main>
    <select v-model="selectedTypes">
      <option :key="resourceType.id" v-for="resourceType in listOfNonAbstractResourceTypes" v-bind:value="resourceType.name">
        {{resourceType.name}}
      </option>
    </select>
    <input v-model="searchTerm" placeholder="">
    <ListSection :key="element.id" v-for="element in listOfFilteredResourceTypes" :title="element.name" :list="resourceInstanceForType(element)" />
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
  public searchTerm: string = "";
  public selectedTypes: string[]= [];

  public get allResourceInstances(): ListElement[] {
    return Utils.resourceInstancesToList(this.resourceInstances);
  }

  public get listOfNonAbstractResourceTypes(): ResourceType[] {
    return this.listOfResourceTypes.filter((resourceType) => !resourceType.abstract);
  }

  public get listOfFilteredResourceTypes(): ResourceType[] {
    if (this.selectedTypes.length){
      return this.listOfTypesWithResources.filter((resourceType) => this.selectedTypes.includes(resourceType.name));
    } else {
      return this.listOfTypesWithResources;
    }
  }

  // get all resourcetypes with instances
  public get listOfTypesWithResources(): ResourceType[] {
    return this.listOfResourceTypes.filter((resourceType) => {
      return this.resourceInstanceForType(resourceType).length
    });
  }

  // match resourceinstance and corresponding type and search filter
  public resourceInstanceForType(resourceType : ResourceType): ListElement[] {
    const resourcesPerType = this.resourceInstances.filter((resourceInstance) => {
      return (resourceInstance.resourceType === resourceType.id && this.filterInstances(resourceInstance) );
    });
    return Utils.resourceInstancesToList(resourcesPerType);
  }
  // filter instances for search term
  public filterInstances(resourceInstance : ResourceInstance): boolean {
    if (resourceInstance.id){
      return (resourceInstance.resourceType.includes(this.searchTerm) ||
            resourceInstance.id.includes(this.searchTerm));
    } else {
      return false;
    }

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
