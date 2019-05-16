<template>
  <main>
      <section class="list">
        <h1>Resources per Resource Type</h1>
        <ul>
          <li :key="element.id" v-for="element in listOfResourceTypes">
            <ListSection :title="element.name" :list="resourceInstanceForType(element, resourceInstancesList)" />
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

  public get allResourceInstances(): ResourceInstance[] {
    return this.resourceInstances;
  }

  public resourceInstanceForType(resourceType : ResourceType, resourceList: ResourceInstance[]): ResourceInstance[] {
    //filter for resourcetype:
    return resourceList.filter((resourceInstance) => {
      return resourceInstance.resourceType === resourceType.id;
    });
  }

  public get resourceInstancesList(): ListElement[] {
    //create list for specific type
    return this.allResourceInstances.map((resourceInstance :ResourceInstance) => {
      return {
        id: `${resourceInstance.id}`,
        //first value needs to be the identifying value
        firstValue: `${resourceInstance.id}`,
        secondValue: `Resource Type: ${resourceInstance.resourceType}`,
      };
    });
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
