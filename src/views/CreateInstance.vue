<template>
  <main v-if="formState === 0">
    <ViewHeader
      title="Choose a resource type for the new instance"
      :backLink="{ link: { name: 'resources' } }"
    />
    <ListSection :list="nonAbstractResourceTypesList"/>
  </main>

  <main v-else-if="formState === 1">
    <ViewHeader title="Choose attribute values for the new instance" :backLink="{ onClick: previousStep }"/>
    <ListSection :title="`Attributes of ${resourceType.name}`">
      <Li v-for="attribute in newResourceInstance.attributes" :key="attribute.name">
        <TypeSensitiveInput
          :resourceType="newResourceInstance.resourceType"
          :resourceInstanceAttribute="attribute"
        />
      </Li>
    </ListSection>

    <Button text="Create Resource" :onClick="createResourceInstance"/>
  </main>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import {
  ResourceTypes,
  ResourceType,
  ResourceInstances,
} from '@/apis/rembrandt/rembrandt';
import Li, { ListEntry } from '@/components/Li.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import ListSection from '@/components/ListSection.vue';
import TypeSensitiveInput from '@/components/TypeSensitiveInput.vue';
import Button from '@/components/Button.vue';
import Utils from '@/utils/Utils';
import Translate from '@/mixins/Translate';
import { ResourceInstance, ResourceInstanceNullObject, ResourceTypeNullObject } from '@/apis/rembrandt/rembrandt';
import { NotificationLevel } from '@/interfaces/Notification';

@Component({
  components: {
    ListSection,
    Li,
    ViewHeader,
    TypeSensitiveInput,
    Button,
  },
})
export default class CreateResource extends Mixins(Translate) {
  // region public static methods

  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceType: ResourceType;
  public resourceTypes: ResourceType[] = [];
  public newResourceInstance: ResourceInstance;
  public typeId: string = '';
  public formState: number = 0;

  public get nonAbstractResourceTypesList(): ListEntry[] {
    const nonAbstractResourceTypes =  this.resourceTypes.filter((resourceType) => !resourceType.abstract);
    return Utils.resourceTypesToList(nonAbstractResourceTypes, this.selectResourceType);
  }

  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.newResourceInstance = ResourceInstanceNullObject;
    this.newResourceInstance.attributes = [];
    this.resourceType = ResourceTypeNullObject;
  }
  // endregion

  // region public methods
  public async created() {
    this.typeId = this.$route.params.typeId;
    if (!this.typeId) {
      return;
    }
    this.selectResourceType(this.typeId);
  }

  public async mounted() {
    this.resourceTypes = await ResourceTypes.get();
  }

  public previousStep(): void {
    if (this.formState > 0) {
      this.formState--;
    }
    if (this.formState === 0) {
      this.newResourceInstance.attributes = [];
    }
  }

  public nextStep(): void {
    this.formState++;
  }

  public async selectResourceType(id: string) {
    this.resourceType = await ResourceTypes.getOne(id);
    this.newResourceInstance.resourceType = this.resourceType;
    this.resourceType.attributes.forEach( (attribute) => {
      if (attribute.dataType === 'boolean') {
        this.newResourceInstance.attributes.push({name: attribute.name, value: false});
      } else {
        this.newResourceInstance.attributes.push({name: attribute.name, value: ''});
        }
    });
    this.nextStep();
  }

  public async createResourceInstance(): Promise<void> {
    try {
      // Todo: check if all required attributes have values (rewrite Interface to class first)
      await ResourceInstances.create(this.newResourceInstance);
      this.$notifications.create({
        title: 'Resource has been created.',
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
      this.$router.push({ name: 'resources' });
    } catch (e) {
      this.$notifications.create(e);
    }

  }
  // endregion

  // region private methods
  // endregion
}
</script>
