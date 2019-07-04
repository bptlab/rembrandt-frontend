<template>
  <main v-if="formState === 0" @keydown.enter="nextStep">
    <ViewHeader title="How should the new transformer be called?" :backLink="{ link: { name: 'transformers' } }"/>
    <Input :value.sync="newTransformer.name" name="Name" placeholder="Filter for today" :autofocus="true"/>
    <Button text="Continue" :onClick="nextStep"/>
  </main>

  <main v-else-if="formState === 1">
    <ViewHeader title="Which resource type should be transformed?" :backLink="{ onClick: previousStep }" />
    <ListSection :list="resourceTypesList"/>
  </main>

  <main v-else-if="formState === 2">
    <ViewHeader title="Please choose the type of the transformer." :backLink="{ onClick: previousStep }" />
    <Select
          :value.sync="newTransformer.transformerType"
          name="Type of the transformer"
          :required="true"
          :options="transformerTypeOptions"
        />
    <Button text="Continue" :onClick="nextStep"/>
  </main>

  <main v-else-if="formState === 3">
    <ViewHeader title="Please insert the functionality of the transformer" :backLink="{ onClick: previousStep }" />
    <ListSection
      :title="`Attributes of ${newTransformer.resourceType.name}`"
      :list="resourceTypeAttributeList"
    />
    <br>
    <h1>below you can enter the code of your transformer</h1>
    <br>
    <TextArea
      :label="`instancesOf${this.nameWithoutWhitespace}.${newTransformer.transformerType}( (instance) => {`"
      footerLabel='});'
      :value.sync="newTransformer.body"
      placeholder="var date = new Date();
  var currentYear = date.getFullYear();
  var currentAge = instance.getAttribute('yearOfBirth') - currentYear;
  instance.setAttribute('age', currentAge);
  return (instance.getAttribute('age') > 18);"
      />
    <Button text="Create Transformer" :onClick="createTransformer"/>
  </main>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  ResourceTypes,
  ResourceType,
  Transformer,
  Transformers,
  createTransformerNullObject,
} from '@/apis/rembrandt/rembrandt';
import Select, { Option } from '@/components/Select.vue';
import Li, { ListEntry } from '@/components/Li.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import ListSection from '@/components/ListSection.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import Utils from '@/utils/Utils';
import { NotificationLevel } from '@/interfaces/Notification';
import { transformerTypes } from '@/apis/rembrandt/rembrandt';
import TextArea from '@/components/TextArea.vue';

@Component({
  components: {
    ListSection,
    Li,
    ViewHeader,
    Input,
    Button,
    Select,
    TextArea,
  },
})
export default class CreateTransformer extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public newTransformer: Transformer;
  public formState: number = 0;
  public resourceTypes: ResourceType[] = [];
  public nameWithoutWhitespace: string = '';

  public get resourceTypesList(): ListEntry[] {
    return Utils.resourceTypesToList(this.resourceTypes, this.selectResourceType);
  }

  public get resourceTypeAttributeList(): ListEntry[] {
    if (!this.newTransformer.resourceType) {
      return [];
    }
    return Utils.resourceTypeAttributesToList(this.newTransformer.resourceType);
  }

  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.newTransformer = createTransformerNullObject();
  }
  // endregion

  // region public methods
  public async mounted() {
    this.resourceTypes = await ResourceTypes.get();
    this.newTransformer.transformerType = 'map';
  }

  public previousStep(): void {
    if (this.formState > 0) {
      this.formState--;
    }
  }

  public nextStep(): void {
    this.formState++;
  }

  public async selectResourceType(id: string) {
    this.newTransformer.resourceType = await ResourceTypes.getOne(id);
    this.nameWithoutWhitespace = this.newTransformer.resourceType.name.replace(/\s/g, '');
    this.nextStep();
  }

  public async createTransformer(): Promise<void> {
    try {
      await Transformers.create(this.newTransformer);
      this.$notifications.create({
        title: `Transformer '${this.newTransformer.name}' has been created.`,
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
      this.$router.push({ name: 'transformers' });
    } catch (e) {
      this.$notifications.create(e);
    }
  }

  public get transformerTypeOptions(): Option[] {
    return transformerTypes.map((transformerType) => {
      return {
        value: transformerType,
        text: transformerType,
      };
    });
  }
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import "../colors.less";

h1 {
  margin-top: @spacing;
  font-size: 19px;
  font-weight: 800;
}

</style>

