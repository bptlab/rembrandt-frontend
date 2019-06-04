<template>
  <main v-if="this.error">
    <h1>Resource Instance not found.</h1>
  </main>
  <main v-else class="type">
    <ViewHeader :title="this.resourceInstance.id" :backLink="{ link: '/resources' }" />

    <!-- <ListSection class="preview-container" :list="resourceTypeList" />

    <div class="row">
      <ListSection title="Attributes" :list="resourceTypeAttributeList" />
      <ListSection title="Actions" :list="resourceTypeActionsList" />
    </div> -->

  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ResourceInstances, ResourceInstance } from '@/apis/rembrandt/rembrandt';
import { ListEntry } from '@/components/Li.vue';
import ListSection from '@/components/ListSection.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ListSection,
    ViewHeader,
  },
})
export default class Resource extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceInstance: ResourceInstance;
  public error: string = '';

  // public get resourceTypeList(): ListEntry[] {
  //   return Utils.resourceTypesToList([ this.resourceInstance ]);
  // }

  // public get resourceTypeAttributeList(): ListEntry[] {
  //   return Utils.resourceTypeAttributesToList(this.resourceInstance.attributes);
  // }

  public get resourceTypeActionsList(): ListEntry[] {
    const resourceInstanceActions = [];

    resourceInstanceActions.push(
      {
        id: '1',
        firstValue: 'Create new Instance',
      },
      {
        id: '2',
        firstValue: 'Edit Resource',
      },
      {
        id: '3',
        firstValue: 'Delete Resource',
      },
    );

    return resourceInstanceActions;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.resourceInstance = {
      resourceType: '',
      attributes: [],
    };
  }
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.resourceInstance = await ResourceInstances.getOne(this.$route.params.id);
      this.error = '';
    } catch (e) {
      this.error = e;
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>
