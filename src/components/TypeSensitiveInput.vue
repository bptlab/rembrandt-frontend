<template>
    <Input
      v-if="this.attributeDataType === 'string' || this.attributeDataType === 'number'"
      :required="resourceType.attributes.find( (typeattribute) => { return this.resourceInstanceAttribute.name === typeattribute.name}).required"
      :value.sync="resourceInstanceAttribute.value"
      :name="resourceInstanceAttribute.name"
      :autofocus="true"
      placeholder="type your value here"/>
    <Toggle
      v-else-if="this.attributeDataType === 'boolean'"
      :value.sync="resourceInstanceAttribute.value"
      :name="resourceInstanceAttribute.name"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import Toggle from '@/components/Toggle.vue';
import { ResourceInstanceAttribute, ResourceType } from '@/apis/rembrandt/rembrandt';

@Component({
  components: {
    Input,
    Toggle,
  },
})

export default class TypeSensitiveInput extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members

  @Prop(Object)
  public resourceType!: ResourceType;

  @Prop(Object)
  public resourceInstanceAttribute!: ResourceInstanceAttribute;

  public get attributeDataType(): string {
    const currentAttribute = this.resourceType.attributes.find(
      (typeattribute) => this.resourceInstanceAttribute.name === typeattribute.name);
    if (!currentAttribute) {
      return '';
    }
    return currentAttribute.dataType;
  }

  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods

  // endregion

  // region private methods
  // endregion
}
</script>


<style lang="less">

</style>
