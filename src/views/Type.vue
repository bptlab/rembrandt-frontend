<template>
  <main v-if="this.error">
    <h1>{{this.error}}</h1>
  </main>
  <main v-else class="type">
    <h1>{{this.resourceType.name}}</h1>
    <div class="back-link-container">
      <router-link to="/types">&#60; Back to Types</router-link>
    </div>
    <div class="preview-container">
      <ListSection :list="resourceTypeList" />
    </div>

    <div class="row">
      <ListSection title="Attributes" :list="resourceTypeAttributeList" />
      <ListSection title="Actions" :list="resourceTypeActionsList" />
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

  public get resourceTypeActionsList(): ListElement[] {
    return [
      {
        id: '1',
        firstValue: 'Add Resource',
        link: '',
      },
      {
        id: '2',
        firstValue: 'Edit Resource Type',
        link: '',
      },
      {
        id: '3',
        firstValue: 'Delete Resource Type',
        link: '',
      },
    ];
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
}
</style>
