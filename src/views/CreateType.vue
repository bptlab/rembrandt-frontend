<template>
  <main class="create-type" v-if="formState === 0" @keydown.enter="nextStep">
    <ViewHeader title="How should the resource type be called?" :backLink="{ link: '/types' }"/>
    <Input :value.sync="newResourceType.name" name="Name" placeholder="Cars" :autofocus="true"/>
    <Button text="Continue" :onClick="nextStep"/>
  </main>

  <main v-else-if="formState === 1">
    <ViewHeader
      :title="`Is ${newResourceType.name} an abstract resource type?`"
      :backLink="{ onClick: previousStep }"
    />
    <Toggle :value.sync="newResourceType.abstract" name="Abstract"/>
    <Button text="Continue" :onClick="nextStep"/>
  </main>

  <main v-else-if="formState === 2">
    <ViewHeader
      :title="`Choose a parent type for ${newResourceType.name}`"
      :backLink="{ onClick: previousStep }"
    />
    <ListSection :list="parentTypeList"/>
  </main>

  <main v-else-if="formState === 3">
    <ViewHeader
      :title="`Define attributes for ${newResourceType.name}`"
      :backLink="{ onClick: previousStep }"
    />
    <ListSection :title="`Attributes of ${newResourceType.parentType.name}`" :list="parentTypeAttributeList"/>

    <ListSection :title="`Attributes of ${newResourceType.name}`">
      <Li v-for="attribute in attributeListLeft" :key="attribute.id" :listEntry="attribute"/>

      <Li v-if="currentlyEditingAttribute >= 0" class="attribute-form">
        <h2>New Attribute</h2>
        <Input
          :value.sync="editingAttribute.name"
          name="Name"
          placeholder="Location"
          :autofocus="true"
          :required="true"
        />
        <Select
          :value.sync="editingAttribute.dataType"
          name="Type"
          :required="true">
          <option value="string">{{ translateToNaturalLanguage('string') }}</option>
          <option value="number">{{ translateToNaturalLanguage('number') }}</option>
          <option value="boolean">{{ translateToNaturalLanguage('boolean') }}</option>
        </Select>
        <Toggle :value.sync="editingAttribute.required" name="Required"/>
        <Button text="Save Attribute" :onClick="saveAttribute"/>
      </Li>

      <Li v-for="attribute in attributeListRight" :key="attribute.id" :listEntry="attribute"/>
      <Li :listEntry="addButtonOptions"/>
    </ListSection>

    <Button text="Create Resource Type" :onClick="createResourceType"/>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import {
  ResourceTypes,
  ResourceType,
  ResourceTypeAttribute,
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
  public newResourceType: ResourceType;
  public formState: number = 0;
  public currentlyEditingAttribute: number = -1;

  public get parentTypeList(): ListEntry[] {
    return Utils.resourceTypesToList(this.resourceTypes, this.selectParentType);
  }

  public get parentType(): ResourceType {
    const parentType = this.resourceTypes.find(
      (resourceType) => resourceType.id === this.newResourceType.parentType,
    );
    return parentType || Types.emptyResourceType();
  }

  public get parentTypeAttributeList(): ListEntry[] {
    if (!this.newResourceType.parentType) {
      return [];
    }
    return Utils.resourceTypeAttributesToList(this.newResourceType.parentType.attributes);
  }

  public get attributeList(): ListEntry[] {
    return Utils.resourceTypeAttributesToList(
      this.newResourceType.attributes,
      this.editAttribute,
    );
  }

  public get attributeListLeft(): ListEntry[] {
    return this.attributeList.filter(
      (attribute, index) => index < this.currentlyEditingAttribute,
    );
  }

  public get attributeListRight(): ListEntry[] {
    return this.attributeList.filter(
      (attribute, index) => index > this.currentlyEditingAttribute,
    );
  }

  public get editingAttribute(): ResourceTypeAttribute {
    return this.newResourceType.attributes[this.currentlyEditingAttribute];
  }

  public get addButtonOptions(): ListEntry {
    return {
      id: 'add',
      firstValue: 'Add Attribute',
      link: {
        onClick: this.addAttribute,
      },
    };
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.newResourceType = Types.emptyResourceType();
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

  public async selectParentType(id: string) {
    this.newResourceType.parentType = await ResourceTypes.getOne(id);
    this.nextStep();
  }

  public editAttribute(name: string): void {
    this.currentlyEditingAttribute = this.newResourceType.attributes.findIndex(
      (attribute) => attribute.name === name,
    );
  }

  public addAttribute(): void {
    this.newResourceType.attributes.push(Types.emptyResourceTypeAttribute());
    this.currentlyEditingAttribute = this.newResourceType.attributes.length - 1;
  }

  public saveAttribute(): void {
    this.currentlyEditingAttribute = -1;
  }

  public createResourceType(): void {
    ResourceTypes.create(this.newResourceType);
    this.$router.push({ path: '/types' });
  }
  // endregion

  // region private methods
  // endregion
}
</script>
