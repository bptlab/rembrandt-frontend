<template>
  <main class="create-Instance" v-if="formState === 0" @keydown.enter="nextStep">
    <ViewHeader title="Choose attribute values for the new Instance" :backLink="{ link: '/resources' }"/>
    <Input :value.sync="newResourceType.name" name="Name" placeholder="Cars" :autofocus="true"/>
    <Button text="Continue" :onClick="nextStep"/>
  </main>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import {
  ResourceTypes,
  ResourceType,
  ResourceTypeAttribute,
  ResourceInstances,
} from '@/apis/rembrandt/rembrandt';
import Li, { ListEntry } from '@/components/Li.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import ListSection from '@/components/ListSection.vue';
import Input from '@/components/Input.vue';
import Toggle from '@/components/Toggle.vue';
import Button from '@/components/Button.vue';
import Select from '@/components/Select.vue';
import Utils from '@/utils/Utils';
import Translate from '@/mixins/Translate';

@Component({
  components: {
    ListSection,
    Li,
    ViewHeader,
    Input,
    Toggle,
    Button,
    Select,
  },
})
export default class Types extends Mixins(Translate) {
  // region public static methods
  public static emptyResourceType(): ResourceType {
    return {
      name: '',
      abstract: false,
      attributes: [],
    };
  }

  public static emptyResourceTypeAttribute(): ResourceTypeAttribute {
    return {
      name: '',
      dataType: 'string',
      required: true,
    };
  }
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceTypes: ResourceType[] = [];
  public newResourceInstance: ResourceInstance = empty;
  public formState: number = 0;

  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.newResourceInstance = ResourceInstances.emptyResourceType();
  }
  // endregion

  // region public methods
  public async mounted() {
    this.resourceTypes = await ResourceTypes.get();
  }

  public previousStep(): void {
    if (this.formState > 0) {
      this.formState--;
    }
  }

  public nextStep(): void {
    this.formState++;
  }

  public createResourceType(): void {
    ResourceInstances.create(this.newResourceInstance);
    this.$router.push({ path: '/resources' });
  }
  // endregion

  // region private methods
  // endregion
}
</script>
