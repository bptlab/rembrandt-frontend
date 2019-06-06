<template>
  <main class="create-Instance">
    <h1>your type id is {{ typeId }}</h1>
    <ViewHeader title="Choose attribute values for the new Instance" :backLink="{ link: '/resources' }"/>
    <Button text="save" :onClick="createResourceInstance"/>
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
import {ResourceInstance,ResourceInstanceNullObject,} from '@/apis/rembrandt/rembrandt';

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
  public resourceType: ResourceType;
  public newResourceInstance: ResourceInstance;
  public typeId: string ='';

  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.newResourceInstance = ResourceInstanceNullObject;
    this.resourceType = Types.emptyResourceType();
  }
  // endregion

  // region public methods
  public created() {
    this.typeId = this.$route.params.typeId;
  }

  public async mounted() {
    this.resourceType = await ResourceTypes.getOne(this.typeId);
    console.log (this.resourceType)
  }

  public createResourceInstance(): void {
    ResourceInstances.create(this.newResourceInstance);
    this.$router.push({ path: '/resources' });
  }
  // endregion

  // region private methods
  // endregion
}
</script>
