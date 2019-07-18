<template>
  <main>
    <form class="search-form">
      <Input :value.sync="searchTerm" name="Search" placeholder="Search resources..." />
      <Select
        :value.sync="selectedType"
        placeholder="All Resource Types"
        name="Resource Type"
        :options="nonAbstractResourceTypes"
      />
    </form>

    <ListSection
      v-if="this.$route.query.execution"
      :list="listEntryForExecutionHint(this.$route.query.execution)"
    />

    <ListSection
      :key="resourceType.id"
      v-for="resourceType in filteredResourceTypes"
      :title="resourceType.name"
      :list="resourceInstancesForType(resourceType)"
    />
    <SmallButton :link="{ link: { name: 'create-resource' } }" class="create-instance-button">
      <i class="fas fa-plus"></i>
    </SmallButton>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ListSection from '@/components/ListSection.vue';
import Select, { Option } from '@/components/Select.vue';
import SmallButton from '@/components/SmallButton.vue';
import Input from '@/components/Input.vue';
import {
  ResourceInstance,
  ResourceInstances,
  ResourceType,
  ResourceTypes,
  OptimizationExecutions,
} from '@/apis/rembrandt/rembrandt';
import Utils from '@/utils/Utils';
import { ListEntry } from '@/components/Li.vue';
import Link from '@/components/Link.vue';
import ApiUtils from '../apis/jsonapi/ApiUtils';

@Component({
  components: {
    ListSection,
    Select,
    Input,
    Link,
    SmallButton,
  },
})
export default class Resources extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceInstances: ResourceInstance[] = [];
  public resourceTypes: ResourceType[] = [];
  public searchTerm: string = '';
  public selectedType: string = '';

  public get nonAbstractResourceTypes(): Option[] {
    return this.resourceTypes
      .filter((resourceType) => !resourceType.abstract)
      .map((resourceType) => {
        return {
          value: resourceType.name,
        };
      });
  }

  public get filteredResourceTypes(): ResourceType[] {
    if (this.selectedType.length > 0) {
      return this.typesWithResources.filter((resourceType) => this.selectedType.includes(resourceType.name));
    } else {
      return this.typesWithResources;
    }
  }

  // get all resourcetypes with instances
  public get typesWithResources(): ResourceType[] {
    return this.resourceTypes.filter((resourceType) => {
      return this.resourceInstancesForType(resourceType).length;
    });
  }

  // match resourceinstance and corresponding type and search filter
  public resourceInstancesForType(resourceType: ResourceType): ListEntry[] {
    const resourcesPerType = this.resourceInstances.filter((resourceInstance) => {
      return (resourceInstance.resourceType.id === resourceType.id &&
        this.resourceInstanceIncludesSearchTerm(resourceInstance));
    });
    return Utils.resourceInstancesToList(resourcesPerType);
  }
  // filter instances for search term
  public resourceInstanceIncludesSearchTerm(resourceInstance: ResourceInstance): boolean {
    if (!resourceInstance.id) {
      return false;
    }
    return (Utils.getEponymousAttributeValue(resourceInstance).includes(this.searchTerm) ||
      resourceInstance.resourceType.name.includes(this.searchTerm));
  }

  public listEntryForExecutionHint(executionId: string): ListEntry[] {
    return [
      {
        id: executionId,
        firstValue: 'Only results for an execution are shown!',
        secondValue: `Execution id: ${executionId}`,
        thirdValue: 'View execution',
        link: {
          link: { name: 'execution', params: { id: executionId } },
        },
      },
    ];
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.resourceTypes = await ResourceTypes.get();
      if (this.$route.query.execution) {
        const filteredInstancesUrl = `${OptimizationExecutions.resourceUrl}/${this.$route.query.execution}/instances`;
        this.resourceInstances = await ApiUtils.getJsonResource(filteredInstancesUrl);
      } else {
        this.resourceInstances = await ResourceInstances.get();
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

<style lang="less">
@import "../colors.less";

form.search-form {
  margin-top: @spacing;
  display: flex;

  & > * {
    margin-right: @spacing;

    &:first-child {
      flex-grow: 1;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.create-instance-button {
  position: fixed;
  bottom: 0;
  right: @spacing;
}
</style>

