<template>
  <main>
  </main>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { ResourceTypes } from '@/apis/rembrandt/Rembrandt';

@Component
export default class Types extends Vue {

  private async mounted() {
    const resourceTypes = await ResourceTypes.get();
  }

}

</script>
