<template>
  <main>
    <ListSection title="Resource Instances" :list="resourceInstancesList" />
  </main>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import ListSection, { ListElement } from '@/components/ListSection.vue';
import { ResourceInstance, ResourceInstances } from '@/apis/rembrandt/rembrandt';

@Component({
  components: {
    ListSection,
  },
})
export default class Resources extends Vue {}
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion
</script>
