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
    <Select
          :value.sync="newTransformer.transformerType"
          name="Type of the transformer"
          :required="true"
          :options="transformerTypeOptions"
        />
    <Button text="Continue" :onClick="nextStep"/>
  </main>

  <main v-else-if="formState === 2">
    <h2>ende </h2>
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
  ResourceTypeNullObject,
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

@Component({
  components: {
    ListSection,
    Li,
    ViewHeader,
    Input,
    Button,
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
  public resourceType: ResourceType;
  public resourceTypes: ResourceType[] = [];

  public get resourceTypesList(): ListEntry[] {
    return Utils.resourceTypesToList(this.resourceTypes, this.selectResourceType);
  }

  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.newTransformer = createTransformerNullObject();
    this.resourceType = ResourceTypeNullObject;
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

  public async selectResourceType(id: string) {
    this.resourceType = await ResourceTypes.getOne(id);
    this.newTransformer.resourceType = this.resourceType;
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

li.input {
  flex-direction: row;
  align-items: center;
}

</style>

