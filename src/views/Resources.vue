<template>
  <main>
    <select multiple v-model="selectedTypes">
      <option
        :key="resourceType.id"
        v-for="resourceType in nonAbstractResourceTypes"
        :value="resourceType.name">
        {{resourceType.name}}
      </option>
    </select>
    <input v-model="searchTerm" placeholder="Search resources...">
    <ListSection
      :key="resourceType.id"
      v-for="resourceType in filteredResourceTypes"
      :title="resourceType.name"
      :list="resourceInstanceForType(resourceType)" />
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
  public resourceTypes: ResourceType[] = [];
  public searchTerm: string = '';
  public selectedTypes: string[] = [];

  public get nonAbstractResourceTypes(): ResourceType[] {
    return this.resourceTypes.filter((resourceType) => !resourceType.abstract);
  }

  public get filteredResourceTypes(): ResourceType[] {
    if (this.selectedTypes.length) {
      return this.typesWithResources.filter((resourceType) => this.selectedTypes.includes(resourceType.name));
    } else {
      return this.typesWithResources;
    }
  }

  // get all resourcetypes with instances
  public get typesWithResources(): ResourceType[] {
    return this.resourceTypes.filter((resourceType) => {
      return this.resourceInstanceForType(resourceType).length;
    });
  }

  // match resourceinstance and corresponding type and search filter
  public resourceInstanceForType(resourceType: ResourceType): ListElement[] {
    const resourcesPerType = this.resourceInstances.filter((resourceInstance) => {
      return (resourceInstance.resourceType === resourceType.id &&
        this.resourceInstanceIncludesSearchTerm(resourceInstance));
    });
    return Utils.resourceInstancesToList(resourcesPerType);
  }
  // filter instances for search term
  public resourceInstanceIncludesSearchTerm(resourceInstance: ResourceInstance): boolean {
    if (!resourceInstance.id) {
      return false;
    }
    return (resourceInstance.resourceType.includes(this.searchTerm) ||
            resourceInstance.id.includes(this.searchTerm));
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public async mounted() {
    this.resourceTypes = await ResourceTypes.get();
    this.resourceInstances = await ResourceInstances.get();
  }
  // endregion

  // region private methods
  // endregion
}
</script>
