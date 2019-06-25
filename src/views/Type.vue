<template>
  <main class="type">
    <ViewHeader :title="this.resourceType.name" :backLink="{ link: { name: 'types' } }" />

    <ListSection class="preview-container" :list="resourceTypeList" />

    <div class="row">
      <ListSection title="Attributes" :list="resourceTypeAttributeList" />
      <ListSection title="Actions" :list="resourceTypeActionsList" />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ResourceTypes, ResourceType, ResourceTypeNullObject } from '@/apis/rembrandt/rembrandt';
import { ListEntry } from '@/components/Li.vue';
import ListSection from '@/components/ListSection.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import Utils from '@/utils/Utils';
import { NotificationLevel } from '@/interfaces/Notification';

@Component({
  components: {
    ListSection,
    ViewHeader,
  },
})
export default class Type extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceType: ResourceType;

  public get resourceTypeList(): ListEntry[] {
    return Utils.resourceTypesToList([ this.resourceType ]);
  }

  public get resourceTypeAttributeList(): ListEntry[] {
    return Utils.resourceTypeAttributesToList(this.resourceType);
  }

  public get resourceTypeActionsList(): ListEntry[] {
    const resourceTypeActions = [];
    if (!this.resourceType.abstract) {
      resourceTypeActions.push({
        id: '1',
        firstValue: 'Add Resource',
        link: {
          link: { name: 'create-resource-id', params: { typeId: this.resourceType.id } },
        },
      });
    }

    resourceTypeActions.push(
      {
        id: '2',
        firstValue: 'Delete Resource Type',
        link: {
          onClick: this.deleteResourceType,
        },
      },
    );

    return resourceTypeActions;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.resourceType = ResourceTypeNullObject;
  }
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.resourceType = await ResourceTypes.getOne(this.$route.params.id);
    } catch (e) {
      this.$notifications.create(e);
    }
  }

  public async deleteResourceType(): Promise<void> {
    try {
      await ResourceTypes.delete(this.resourceType.id!);
      this.$notifications.create({
        title: `Type '${this.resourceType.name}' has been deleted.`,
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
      this.$router.push({ name: 'types' });
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>
