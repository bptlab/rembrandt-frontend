<template>
  <main>
    <h2>the id is: {{this.instanceId}}</h2>
    <ViewHeader title="Choose new attribute values for the instance" :backLink="{ link: `/resources/${this.instanceId}` }"/>
    <ListSection :title="`Attributes of ${resourceType.name}`">
      <Li v-for="attribute in updatedResourceInstance.attributes" :key="attribute.name">
        <TypeSensitiveInput
          :resourceType="updatedResourceInstance.resourceType"
          :resourceInstanceAttribute="attribute"
        />
      </Li>
    </ListSection>

    <Button text="Save Resource" :onClick="saveResourceInstance"/>
  </main>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import {
  ResourceTypes,
  ResourceType,
  ResourceInstances,
  ResourceInstance,
  ResourceInstanceNullObject,
  ResourceTypeNullObject,
} from '@/apis/rembrandt/rembrandt';
import Li, { ListEntry } from '@/components/Li.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import ListSection from '@/components/ListSection.vue';
import TypeSensitiveInput from '@/components/TypeSensitiveInput.vue';
import Button from '@/components/Button.vue';
import Utils from '@/utils/Utils';
import Translate from '@/mixins/Translate';
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
export default class EditResource extends Mixins(Translate) {
  // region public static methods

  // endregion

  // region private static methods
  // endregion

  // region public members

  public instanceId: string = '';
  public updatedResourceInstance: ResourceInstance = ResourceInstanceNullObject;
  public resourceType: ResourceType = ResourceTypeNullObject;
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
  }
  // endregion

  // region public methods
  public async created() {
    this.instanceId = this.$route.params.instanceId;
    this.updatedResourceInstance = await ResourceInstances.getOne(this.instanceId);
  }

  public async saveResourceInstance(): Promise<void> {
    try {
      await ResourceInstances.update(this.instanceId, this.updatedResourceInstance);
      this.$notifications.create({
        title: 'Resource has been updated.',
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
      this.$router.push({ path: `/resources/${this.instanceId}` });
    } catch (e) {
      this.$notifications.create(e);
    }

  }

  }
  // endregion

  // region private methods
  // endregion

</script>
