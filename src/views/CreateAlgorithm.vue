<template>
  <main v-if="formState === 0" @keydown.enter="nextStep">
    <ViewHeader title="How should the new algorithm be called?" :backLink="{ link: { name: 'algorithms' } }"/>
    <Input :value.sync="newAlgorithm.name" name="Name" placeholder="Vehicle Routing for Package Delivery Algorithm" :autofocus="true"/>
    <Button text="Continue" :onClick="nextStep"/>
  </main>

  <main v-else-if="formState === 1">
    <ViewHeader
      title="What information does the algorithm need?"
      :backLink="{ onClick: previousStep }"
    />
    <ListSection title="Algorithm Inputs">
      <li class="options slot input" v-for="resourceType in selectableResourceTypes" :key="resourceType.id" @click="toggleInputSelection(resourceType)">
        <div class="checkbox" :class="{checked: resourceType.selected}" />
        <div>
          <p class="first-value">{{resourceType.name}}</p>
          <p class="second-value">{{resourceType.parentType ? resourceType.parentType.name : ''}}</p>
        </div>
      </li>
    </ListSection>
    <Button text="Continue" :onClick="nextStep"/>
  </main>

  <main v-else-if="formState === 2">
    <ViewHeader
      title="What information will the algorithm provide?"
      :backLink="{ onClick: previousStep }"
    />
    <ListSection title="Algorithm Output" :list="outputResourceTypeList"/>
  </main>

  <main v-else-if="formState === 3" class="">
    <ViewHeader
      title="Please provide Docker information for your algorithm:"
      :backLink="{ onClick: previousStep }"
    />
    <Input
      :value.sync="newAlgorithm.dockerConfig.name"
      name="Image Name"
      placeholder="bptlab/chor-js-demo"
      :autofocus="true"
      :required="true" />

    <Input
      :value.sync="newAlgorithm.dockerConfig.tag"
      name="Image Tag (optional)"
      placeholder="latest" />

    <Input
      :value.sync="newAlgorithm.dockerConfig.digest"
      name="Image Digest (optional)"
      placeholder="sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" />

    <Button text="Create Algorithm" :onClick="createAlgorithm"/>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  ResourceTypes,
  ResourceType,
  OptimizationAlgorithm,
  OptimizationAlgorithms,
  createOptimizationAlgorithmNullObject,
} from '@/apis/rembrandt/rembrandt';
import Li, { ListEntry } from '@/components/Li.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import ListSection from '@/components/ListSection.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import Utils from '@/utils/Utils';
import { NotificationLevel } from '@/interfaces/Notification';

interface SelectableResourceType extends ResourceType {
  selected: boolean;
}

@Component({
  components: {
    ListSection,
    Li,
    ViewHeader,
    Input,
    Button,
  },
})
export default class CreateAlgorithm extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public newAlgorithm: OptimizationAlgorithm;
  public selectableResourceTypes: SelectableResourceType[] = [];
  public formState: number = 0;

  public get outputResourceTypeList(): ListEntry[] {
    return Utils.resourceTypesToList(this.selectableResourceTypes, this.selectOutputResourceType);
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.newAlgorithm = createOptimizationAlgorithmNullObject();
  }
  // endregion

  // region public methods
  public async mounted() {
    const resourceTypes = await ResourceTypes.get();
    this.selectableResourceTypes = resourceTypes
      .filter((resourceType) => !resourceType.abstract)
      .map((resourceType) => {
        const selectableResourceType = resourceType as SelectableResourceType;
        selectableResourceType.selected = false;
        return selectableResourceType;
      });
  }

  public previousStep(): void {
    if (this.formState > 0) {
      this.formState--;
    }
  }

  public nextStep(): void {
    this.formState++;
  }

  public toggleInputSelection(resourceType: SelectableResourceType) {
    resourceType.selected = !resourceType.selected;
    if (resourceType.selected) {
      this.addInputResourceType(resourceType);
    } else {
      this.removeInputResourceType(resourceType);
    }
  }

  public addInputResourceType(resourceType: SelectableResourceType) {
    if (this.newAlgorithm.inputs.findIndex((input) => input === resourceType.id) >= 0) {
      return;
    }

    this.newAlgorithm.inputs.push(resourceType.id!);
  }

  public removeInputResourceType(resourceType: SelectableResourceType) {
    const inputToRemoveIndex = this.newAlgorithm.inputs.findIndex((input) => input === resourceType.id);

    if (inputToRemoveIndex < 0) {
      return;
    }

    this.newAlgorithm.inputs.splice(inputToRemoveIndex, 1);
  }

  public selectOutputResourceType(id: string) {
    this.newAlgorithm.outputs = id;
    this.nextStep();
  }

  public async createAlgorithm(): Promise<void> {
    try {
      await OptimizationAlgorithms.create(this.newAlgorithm);
      this.$notifications.create({
        title: `Algorithm '${this.newAlgorithm.name}' has been created.`,
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
      this.$router.push({ name: 'algorithms' });
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import "../colors.less";

li.input {
  flex-direction: row;
  align-items: center;
}

div.checkbox {
  border: 1px solid @primary;
  border-radius: 5px;
  height: @spacing * 1.5;
  width: @spacing * 1.5;
  margin: @spacing;
  padding: 4px;

  &.checked:before {
    content: " ";
    display: block;
    border-radius: 3px;
    height: 100%;
    width: 100%;
    background-color: @primary;
  }
}
</style>

