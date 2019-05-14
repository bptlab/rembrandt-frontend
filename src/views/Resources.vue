<template>
  <main>
    <ListSection title="Resource Instances" :list="resourceInstancesList" />
  </main>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import ListSection, { ListElement } from '@/components/ListSection.vue';
import { ResourceInstance, ResourceInstances, ResourceType } from '@/apis/rembrandt/rembrandt';

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

  public get resourceInstanceForType(): ResourceInstance[] {

    //filter for resourcetype:
    return this.resourceInstances;
  }

  public get resourceInstancesList(): ListElement[] {
    //create list for specific type
    return this.resourceInstanceForType.map((resourceInstance) => {
      return {
        id: `${resourceInstance._id}`,
        //first value needs to be the identifying value
        firstValue: `${resourceInstance._id}`,
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
    this.resourceInstances = await ResourceInstances.get();
  }
  // endregion

  // region private methods
  // endregion
}
</script>
