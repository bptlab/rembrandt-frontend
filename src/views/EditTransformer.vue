<template>
  <main>
    <ViewHeader title="Please insert the functionality of the transformer" :backLink="{ link: {name: 'transformer', params: { id: this.editedTransformer.id }} }" />
    <ListSection
      :title="`Attributes of ${editedTransformer.resourceType.name}`"
      :list="resourceTypeAttributeList"
    />
    <br>
    <h1>below you can enter the code of your transformer</h1>
    <br>
    <TextArea
      :firstString="`instancesOf${this.nameWithoutWhitespace}.${editedTransformer.transformerType}( (instance) => {`"
      secondString='});'
      :value.sync="editedTransformer.body" />
    <Button text="Save Transformer" :onClick="saveTransformer"/>
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
  public editedTransformer: Transformer;
  public transfomerId: string = '';
  public nameWithoutWhitespace: string = '';

  public get resourceTypeAttributeList(): ListEntry[] {
    if (!this.editedTransformer.resourceType) {
      return [];
    }
    return Utils.resourceTypeAttributesToList(this.editedTransformer.resourceType);
  }

  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.editedTransformer = createTransformerNullObject();
  }
  // endregion

  // region public methods
  public async mounted() {
    this.transfomerId = this.$route.params.transformerId;
    this.editedTransformer = await Transformers.getOne(this.transfomerId);
    this.nameWithoutWhitespace = this.editedTransformer.resourceType.name.replace(/\s/g, '');
  }

  public async saveTransformer(): Promise<void> {
    try {
      await Transformers.update(this.transfomerId, this.editedTransformer);
      this.$notifications.create({
        title: `Transformer '${this.editedTransformer.name}' has been edited.`,
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
      if (this.editedTransformer.id) {
        this.$router.push({ name: 'transformer', params: { id: this.editedTransformer.id } });
      }
    } catch (e) {
      this.$notifications.create(e);
    }
  }

  // endregion

  // region private methods
  // endregion
}
</script>

