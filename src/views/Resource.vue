<template>
  <main class="type">
    <ViewHeader :title="resourceName" :backLink="{ link: '/resources' }" />

    <ListSection title="Resource Type" class="preview-container" :list="resourceTypeList" />

    <div class="row">
      <ListSection title="Attributes" :list="resourceInstanceAttributeList" />
      <ListSection title="Actions" :list="resourceInstanceActionsList" />
    </div>

  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  ResourceInstances,
  ResourceInstance,
  ResourceInstanceNullObject,
  ResourceTypes,
} from '@/apis/rembrandt/rembrandt';
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

  public get resourceTypeList(): ListEntry[] {
    return Utils.resourceTypesToList([ this.resourceInstance.resourceType ]);
  }

  public get resourceInstanceAttributeList(): ListEntry[] {
    return Utils.resourceInstanceAttributesToList(this.resourceInstance.attributes);
  }

  public get resourceName(): string {
    return Utils.getEponymousAttributeValue(this.resourceInstance);
  }

  public get resourceInstanceActionsList(): ListEntry[] {
    const resourceInstanceActions = [];

    resourceInstanceActions.push(
      {
        id: '1',
        firstValue: 'Create another Instance',
        link: {
          link: onclick ? '' : `/resources/create/${this.resourceInstance.resourceType.id}`,
        },
      },
      {
        id: '2',
        firstValue: 'Edit Resource',
      },
      {
        id: '3',
        firstValue: 'Delete Resource',
        link: {
          onClick: this.deleteResource,
        },
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
    this.resourceInstance = ResourceInstanceNullObject;
  }
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.resourceInstance = await ResourceInstances.getOne(this.$route.params.id);
      if (this.resourceInstance.resourceType.id) {
        this.resourceInstance.resourceType = await ResourceTypes.getOne(this.resourceInstance.resourceType.id);
      }
    } catch (e) {
      this.$notifications.create(e);
    }
  }

  public async deleteResource(): Promise<void> {
    try {
      await ResourceInstances.delete(this.resourceInstance.id!);
      this.$router.push({ path: '/resources' });
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>
