<template>
  <main class="create-type">
    <div v-if="formState === 0">
      <ViewHeader title="How should the resource type be called?" :backLink="{ link: '/types' }"/>
      <fieldset>
        <input v-model="newResourceType.name" type="text" placeholder="Cars" autofocus>
        <label><span>Name</span></label>
      </fieldset>
      <input @click="nextStep" type="button" value="Next Step">
    </div>

    <div v-if="formState === 1">
      <ViewHeader
        :title="`Is ${newResourceType.name} an abstract resource type?`"
        :backLink="{ onClick: previousStep }"
      />
      <fieldset>
        <input
          v-model="newResourceType.abstract"
          type="radio"
          id="abstract-true"
          name="abstract"
          value="true"
        >
        <label for="abstract-true">Yes</label>
        <input
          v-model="newResourceType.abstract"
          type="radio"
          id="abstract-false"
          name="abstract"
          value="false"
        >
        <label for="abstract-false">No</label>
      </fieldset>
      <input @click="nextStep" type="button" value="Next Step">
    </div>

    <div v-if="formState === 2">
      <ViewHeader
        :title="`Choose a parent type for ${newResourceType.name}:`"
        :backLink="{ onClick: previousStep }"
      />
      <ListSection :list="parentTypeList"/>
    </div>

    <div v-if="formState === 3">
      <ViewHeader
        :title="`Define attributes for ${newResourceType.name}:`"
        :backLink="{ onClick: previousStep }"
      />
      <ListSection :title="`Attributes of ${parentType.name}:`" :list="parentTypeAttributeList"/>

      <ListSection :title="`Attributes of ${newResourceType.name}:`">
        <Li v-for="attribute in attributeListLeft" :key="attribute.id" :options="attribute"/>

        <Li v-if="currentlyEditingAttribute >= 0">
          <h2>New Attribute</h2>
          <input v-model="editingAttribute.name" type="text" name="name" placeholder="Location">
          <select v-model="editingAttribute.dataType">
            <option disabled value>Data Type</option>
            <option>string</option>
            <option>number</option>
            <option>boolean</option>
          </select>
          <fieldset>
            <p>Is this attribute required?</p>
            <input
              v-model="editingAttribute.required"
              type="radio"
              id="required-true"
              name="required"
              value="true"
            >
            <label for="required-true">Yes</label>
            <input
              v-model="editingAttribute.required"
              type="radio"
              id="required-false"
              name="required"
              value="false"
            >
            <label for="required-false">No</label>
          </fieldset>
          <input type="button" value="Save Attribute" @click="saveAttribute">
        </Li>

        <Li v-for="attribute in attributeListRight" :key="attribute.id" :options="attribute"/>
        <Li :options="addButtonOptions"/>
      </ListSection>

      <input @click="createResourceType" type="button" value="Create Resource Type">
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  ResourceTypes,
  ResourceType,
  ResourceTypeAttribute
} from "@/apis/rembrandt/rembrandt";
import Li, { LiOptions } from "@/components/Li.vue";
import ViewHeader from "@/components/ViewHeader.vue";
import ListSection from "@/components/ListSection.vue";
import Utils from "@/utils/Utils";

@Component({
  components: {
    ListSection,
    Li,
    ViewHeader
  }
})
export default class Types extends Vue {
  // region public static methods
  public static emptyResourceType(): ResourceType {
    return {
      name: "",
      parentType: "",
      abstract: true,
      attributes: []
    };
  }

  public static emptyResourceTypeAttribute(): ResourceTypeAttribute {
    return {
      name: "",
      dataType: "string",
      required: true
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

  public get parentTypeList(): LiOptions[] {
    return Utils.resourceTypesToList(this.resourceTypes, this.selectParentType);
  }

  public get parentType(): ResourceType {
    const parentType = this.resourceTypes.find(
      resourceType => resourceType.id === this.newResourceType.parentType
    );
    return parentType || Types.emptyResourceType();
  }

  public get parentTypeAttributeList(): LiOptions[] {
    return Utils.resourceTypeAttributesToList(this.parentType.attributes);
  }

  public get attributeList(): LiOptions[] {
    return Utils.resourceTypeAttributesToList(
      this.newResourceType.attributes,
      this.editAttribute
    );
  }

  public get attributeListLeft(): LiOptions[] {
    return this.attributeList.filter(
      (attribute, index) => index < this.currentlyEditingAttribute
    );
  }

  public get attributeListRight(): LiOptions[] {
    return this.attributeList.filter(
      (attribute, index) => index > this.currentlyEditingAttribute
    );
  }

  public get editingAttribute(): ResourceTypeAttribute {
    return this.newResourceType.attributes[this.currentlyEditingAttribute];
  }

  public get addButtonOptions(): LiOptions {
    return {
      id: "add",
      firstValue: "Add Attribute",
      link: {
        onClick: this.addAttribute
      }
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

  public selectParentType(id: string) {
    console.log("triggered");
    this.newResourceType.parentType = id;
    this.nextStep();
  }

  public editAttribute(name: string): void {
    this.currentlyEditingAttribute = this.newResourceType.attributes.findIndex(
      attribute => attribute.name === name
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
    // console.log(this.newResourceType);
    ResourceTypes.create(this.newResourceType);
  }
  // endregion

  // region private methods
  // endregion
}
</script>


<style lang="less">
@import '../colors.less';
fieldset {
  margin: 0;
  padding: 12px;
  border-radius: 7px;
  border: 1px solid white;
  border-top: 0;
  margin: 20px 0px;
  position: relative;

  &:focus-within {
    border-color: @accent;
  }

  input {
    background: transparent;
    color: @primary;
    font-size: 16px;
    width: 100%;
    padding: 0;
    border: 0;

    &:focus {
      outline: none;
    }
  }

  label {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    font-size: 14px;
    color: @primary;

    &:before {
      border-top: 1px solid @primary;
      border-top-left-radius: 7px;
      flex: 5px 0 0;
      content: "";
    }

    &:after {
      border-top: 1px solid @primary;
      border-top-right-radius: 7px;
      flex: 1 0 0;
      content: "";
    }

    span {
      margin-top: -10px;
      padding: 0 5px;
    }
  }

  input:focus + label {
    color: @accent;

    &:before,
    &:after {
      border-color: @accent;
    }
  }
}
</style>
