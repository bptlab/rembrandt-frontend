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
    let resourceTypes = await ResourceTypes.get();
    await ResourceTypes.create({
      name: 'SomeType',
      attributes: [
        {
          name: 'test',
          dataType: 'string',
          required: false,
        },
      ],
      parentType: '5cd3f9c14b2ee19449808625',
      abstract: false,
    });
    resourceTypes = await ResourceTypes.get();
  }

}

</script>
