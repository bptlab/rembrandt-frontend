<template>
  <main>
    <ListSection title="Transformers" :list="transformerList" />
    <SmallButton :link="{link: { name: 'create-transformer' } }" class="create-transformer-button">
      <i class="fas fa-plus"></i>
    </SmallButton>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Transformer, Transformers } from '@/apis/rembrandt/rembrandt';
import ListSection from '@/components/ListSection.vue';
import SmallButton from '@/components/SmallButton.vue';
import { ListEntry } from '@/components/Li.vue';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ListSection,
    SmallButton,
  },
})
export default class Algorithms extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public transformers: Transformer[] = [];

  public get transformerList(): ListEntry[] {
    return Utils.transformerToList(this.transformers);
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.transformers = await Transformers.get();
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

.create-transformer-button {
  position: fixed;
  bottom: 0;
  right: @spacing;
}
</style>
