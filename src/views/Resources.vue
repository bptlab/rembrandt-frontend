<template>
  <main>
      <section class="list">
        <h1>Resources per Resource Type</h1>
        <ul>
          <li :key="element.id" v-for="element in listOfResourceTypes">
            <ListSection :title="element.name" :list="resourceInstanceForType(element)" />
          </li>
        </ul>
      </section>
   <!-- <ListSection title="Resource Instances" :list="resourceInstancesList" /> -->
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

  public get allResourceInstances(): ListElement[] {
    return Utils.resourceInstancesToList(this.resourceInstances);
  }

  public resourceInstanceForType(resourceType : ResourceType): ListElement[] {
    //filter for resourcetype:
    const filteredList = this.resourceInstances.filter((resourceInstance) => {
      return resourceInstance.resourceType === resourceType.id;
    });
    return Utils.resourceInstancesToList(filteredList);
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public async mounted() {
    this.listOfResourceTypes = await ResourceTypes.get();
    console.log(this.listOfResourceTypes)
    this.resourceInstances = await ResourceInstances.get();
  }
  // endregion

  // region private methods
  // endregion
}
</script>
