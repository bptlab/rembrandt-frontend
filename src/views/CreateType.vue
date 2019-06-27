<template>
  <main class="create-type" v-if="formState === 0" @keydown.enter="nextStep">
    <ViewHeader title="How should the resource type be called?" :backLink="{ link: { name: 'types' } }"/>
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
    <ListSection
      :title="`Attributes of ${newResourceType.parentType.name}`"
      :list="parentTypeAttributeList"
    />

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
          :required="true"
          :options="dataTypeOptions"
        />
        <Toggle :value.sync="editingAttribute.required" name="Required attribute"/>
        <Toggle
          :value.sync="editingAttribute.isEponymousAttribute"
          name="Name giving attribute"
        />
        <div class="row">
          <Button text="Save Attribute" :onClick="saveAttribute"/>
          <SmallButton :link="{ onClick: deleteAttribute }">
            <i class="fas fa-times"></i>
          </SmallButton>
        </div>
      </Li>

      <Li v-for="attribute in attributeListRight" :key="attribute.id" :listEntry="attribute"/>
      <Li :listEntry="addButtonOptions"/>
    </ListSection>

    <Button text="Create Resource Type" :onClick="createResourceType"/>
  </main>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
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
import SmallButton from '@/components/SmallButton.vue';
import Select, { Option } from '@/components/Select.vue';
import Utils from '@/utils/Utils';
import Translate from '@/mixins/Translate';
import { dataTypes } from '@/apis/rembrandt/rembrandt';
import { NotificationLevel } from '@/interfaces/Notification';

interface NewResourceTypeAttribute extends ResourceTypeAttribute {
  isEponymousAttribute: boolean;
}

interface NewResourceType extends ResourceType {
  attributes: NewResourceTypeAttribute[];
}

@Component({
  components: {
    ListSection,
    Li,
    ViewHeader,
    Input,
    Toggle,
    Button,
    Select,
    SmallButton,
  },
})
export default class CreateType extends Mixins(Translate) {
  // region public static methods
  public static emptyResourceType(): NewResourceType {
    return {
      name: '',
      abstract: false,
      attributes: [],
    };
  }

  public static emptyResourceTypeAttribute(): NewResourceTypeAttribute {
    return {
      name: '',
      dataType: 'string',
      required: true,
      isEponymousAttribute: false,
    };
  }
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceTypes: ResourceType[] = [];
  public newResourceType: NewResourceType;
  public formState: number = 0;
  public currentlyEditingAttribute: number = -1;

  public get parentTypeList(): ListEntry[] {
    return Utils.resourceTypesToList(this.resourceTypes, this.selectParentType);
  }

  public get parentType(): ResourceType {
    const parentType = this.resourceTypes.find(
      (resourceType) => resourceType.id === this.newResourceType.parentType,
    );
    return parentType || CreateType.emptyResourceType();
  }

  public get parentTypeAttributeList(): ListEntry[] {
    if (!this.newResourceType.parentType) {
      return [];
    }
    return Utils.resourceTypeAttributesToList(this.newResourceType.parentType);
  }

  public get attributeList(): ListEntry[] {
    // tslint:disable-next-line
    this.currentlyEditingAttribute;
    return Utils.resourceTypeAttributesToList(
      this.newResourceType,
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

  public get editingAttribute(): NewResourceTypeAttribute {
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

  public get dataTypeOptions(): Option[] {
    return dataTypes.map((dataType) => {
      return {
        value: dataType,
        text: this.translateToNaturalLanguage(dataType),
      };
    });
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.newResourceType = CreateType.emptyResourceType();
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
    this.newResourceType.attributes.push(
      CreateType.emptyResourceTypeAttribute(),
    );
    this.setEponymousAttribute();
    this.currentlyEditingAttribute = this.newResourceType.attributes.length - 1;
  }

  public deleteAttribute(): void {
    if (this.editingAttribute.isEponymousAttribute) {
      this.newResourceType.eponymousAttribute = undefined;
    }
    this.newResourceType.attributes.splice(this.currentlyEditingAttribute, 1);
    this.setEponymousAttribute();
    this.currentlyEditingAttribute = -1;
  }

  public setEponymousAttribute(): void {
    if (!this.editingAttribute) {
      return;
    }

    if (this.editingAttribute.isEponymousAttribute) {
      this.newResourceType.eponymousAttribute = this.editingAttribute.name;
      this.resetEponymousAttribute();
    } else {
      if (this.newResourceType.eponymousAttribute === this.editingAttribute.name) {
        this.newResourceType.eponymousAttribute = undefined;
        this.resetEponymousAttribute();
      }
    }
  }

  public resetEponymousAttribute() {
    this.newResourceType.attributes.forEach( (attribute) => {
      if (attribute.name === this.editingAttribute.name) {
        return;
      }
      attribute.isEponymousAttribute = false;
    });
  }

  public saveAttribute(): void {
    const numberOfUses = this.newResourceType.attributes.filter( (attribute) => {
      return (this.editingAttribute.name === attribute.name);
    }).length;

    if (numberOfUses >= 2) {
      this.$notifications.create({
        title: 'There is already an attribute with the choosen name, please choose an other name.',
        details: '',
        level: NotificationLevel.Critical,
        timestamp: new Date(),
      });
      return;
    }
    if (!this.editingAttribute.name) {
      this.$notifications.create({
        title: 'Please choose a name for the attribute.',
        details: '',
        level: NotificationLevel.Critical,
        timestamp: new Date(),
      });
      return;
    }
    this.setEponymousAttribute();
    this.currentlyEditingAttribute = -1;
  }

  public async createResourceType(): Promise<void> {
    try {
      await ResourceTypes.create(this.newResourceType);
      this.$notifications.create({
        title: `Type '${this.newResourceType.name}' has been created.`,
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
