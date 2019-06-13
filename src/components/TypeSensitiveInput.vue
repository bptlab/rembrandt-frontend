<template>
    <Input
      v-if="resourceInstanceAttribute.dataType === 'string' || resourceInstanceAttribute.dataType === 'number'"
      :required="resourceType.attributes.find( (typeattribute) => { return this.resourceInstanceAttribute.name === typeattribute.name}).required"
      :value.sync="resourceInstanceAttribute.value"
      :name="resourceInstanceAttribute.name"/>
    <Toggle
      v-else-if="resourceInstanceAttribute.dataType === 'boolean'"
      :value.sync="resourceInstanceAttribute.value"
      :name="resourceInstanceAttribute.name"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import Toggle from '@/components/Toggle.vue';
import { ResourceInstanceAttribute, ResourceType } from '@/apis/rembrandt/rembrandt';

@Component
export default class TypeSensitiveInput extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop(String)
  public value!: string;

  @Prop(Object)
  public resourceType!: ResourceType;

  @Prop(Object)
  public resourceInstanceAttribute!: ResourceInstanceAttribute;

  @Prop(String)
  public name!: string;

  @Prop(String)
  public placeholder!: string;

  @Prop(Boolean)
  public autofocus?: boolean;

  @Prop(Boolean)
  public required?: boolean;

  public get attributeDataType(): string {
    if ( this.resourceType.attributes.find( (typeattribute) => { return this.resourceInstanceAttribute.name === typeattribute.name})) {
      return this.resourceType.attributes.find( (typeattribute) => { return this.resourceInstanceAttribute.name === typeattribute.name}).dataType;
    }
    return '';
  }

  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public focusInput() {
    (this.$refs.input as any).focus();
  }
  // endregion

  // region private methods
  // endregion
}
</script>


<style lang="less">

</style>
