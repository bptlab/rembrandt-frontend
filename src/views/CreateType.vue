<template>
  <main class="create-type">

    <div v-if="formState === 0">
      <ViewHeader title="How should the resource type be called?" :backLink="{ link: '/types' }" />
      <input v-model="newResourceType.name" type="text" name="name" placeholder="Cars" />
      <input @click="nextStep" type="button" value="Next Step" />
    </div>

    <div v-if="formState === 1">
      <ViewHeader :title="`Is ${newResourceType.name} an abstract resource type?`" :backLink="{ onClick: previousStep }" />
      <fieldset>
        <input v-model="newResourceType.abstract" type="radio" id="abstract-true" name="abstract" value="true" />
        <label for="abstract-true">Yes</label>
        <input v-model="newResourceType.abstract" type="radio" id="abstract-false" name="abstract" value="false" />
        <label for="abstract-false">No</label>
      </fieldset>
      <input @click="nextStep" type="button" value="Next Step" />
    </div>

    <div v-if="formState === 2">
      <ViewHeader :title="`Choose a parent type for ${newResourceType.name}:`" :backLink="{ onClick: previousStep }" />
      <ListSection :list="parentTypeList" />
    </div>

    <div v-if="formState === 3">
      <ViewHeader :title="`Define attributes for ${newResourceType.name}:`" :backLink="{ onClick: previousStep }" />
      <ListSection :title="`Attributes of ${parentType.name}:`" :list="parentTypeAttributeList" />

      <ListSection :title="`Attributes of ${newResourceType.name}:`" :list="attributeList" />

      <input @click="createResourceType" type="button" value="Create Resource Type" />
    </div>

  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ResourceTypes, ResourceType } from '@/apis/rembrandt/rembrandt';
import { LiOptions } from '@/components/Li.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import ListSection from '@/components/ListSection.vue';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ListSection,
    ViewHeader,
  },
})
export default class Types extends Vue {
  // region public static methods
  public static emptyResourceType = {
    name: '',
    parentType: '',
    abstract: true,
    attributes: [],
  };
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceTypes: ResourceType[] = [];
  public newResourceType: ResourceType;
  public formState: number = 0;
  public currentlyEditingAttribute: number = -1;

  public get parentTypeList(): LiOptions[] {
    return Utils.resourceTypesToList(this.resourceTypes, this.selectParentType);
  }

  public get parentType(): ResourceType {
    const parentType = this.resourceTypes.find((resourceType) => resourceType.id === this.newResourceType.parentType);
    return parentType || Types.emptyResourceType;
  }

  public get parentTypeAttributeList(): LiOptions[] {
    return Utils.resourceTypeAttributesToList(this.parentType.attributes);
  }

  public get attributeList(): LiOptions[] {
    return Utils.resourceTypeAttributesToList(this.newResourceType.attributes);
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.newResourceType = Types.emptyResourceType;
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

  public selectParentType(id: string) {
    console.log('triggered');
    this.newResourceType.parentType = id;
    this.nextStep();
  }

  public createResourceType(): void {
    // console.log(this.newResourceType);
    // ResourceTypes.create(this.resourceType);
  }
  // endregion

  // region private methods
  // endregion
}
</script>


<style lang="less">
</style>
