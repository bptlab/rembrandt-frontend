<template>
  <main class="type">
    <h1 v-if="this.error">Resource Type not found.</h1>

    <h1 v-if="!this.error">{{this.resourceType.name}}</h1>
    <div class="back-link-container">
      <router-link to="/types">&#60; Back to Types</router-link>
    </div>
    <div class="preview-container">
      <ListSection :list="resourceTypeList" />
    </div>

    <div class="row">
      <ListSection title="Attributes" :list="resourceTypeAttributeList" />
      <ListSection title="Actions" :list="resourceTypeAttributeList" />
    </div>

  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ResourceTypes, ResourceType } from '@/apis/rembrandt/rembrandt';
import ListSection, { ListElement } from '@/components/ListSection.vue';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ListSection,
  },
})
export default class Types extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceType: ResourceType;
  public error: string = '';

  public get resourceTypeList(): ListElement[] {
    return Utils.resourceTypesToList([ this.resourceType ]);
  }

  public get resourceTypeAttributeList(): ListElement[] {
    return Utils.resourceTypeAttributesToList(this.resourceType.attributes);
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.resourceType = {
      name: '',
      abstract: true,
      attributes: [],
    };
  }
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.resourceType = await ResourceTypes.getOne(this.$route.params.id);
      this.error = '';
    } catch (e) {
      this.error = e;
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>


<style lang="less">

.type {
  h1 {
    font-size: 30px;
    margin-top: 40px;
  }

  .back-link-container {
    margin-top: 20px;
  }

  .preview-container {
    margin-top: 40px;
  }

  .row {
    display: flex;
  }

  .row > * {
    flex-grow: 1;
    margin-left: 15px;
    margin-right: 15px;
  }
  .row > *:first-child {
    margin-left: 0;
  }

  .row > *:last-child {
    margin-right: 0;
  }
}

</style>
