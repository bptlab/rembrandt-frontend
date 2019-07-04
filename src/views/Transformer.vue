<template>
  <main>
    <ViewHeader :title="transformer.name" :backLink="{ link: { name: 'transformers' } }"/>

    <ListSection class="preview-container" :list="transformerList"/>

    <div class="row">
      <ListSection title="Attributes" :list="transformerAttributesList"/>
      <ListSection title="Actions" :list="transformerActionsList"/>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  Transformer,
  Transformers,
  createTransformerNullObject,
} from '@/apis/rembrandt/rembrandt';
import ViewHeader from '@/components/ViewHeader.vue';
import ListSection from '@/components/ListSection.vue';
import { ListEntry } from '@/components/Li.vue';
import Utils from '@/utils/Utils';
import { NotificationLevel } from '@/interfaces/Notification';

@Component({
  components: {
    ListSection,
    ViewHeader,
  },
})
export default class Algorithm extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public transformer: Transformer;

  public get transformerList(): ListEntry[] {
    return Utils.transformerToList([ this.transformer ]);
  }


  public get transformerAttributesList(): ListEntry[] {
    return Utils.transformerAttributesToList(this.transformer);
  }

  public get transformerActionsList(): ListEntry[] {
    const transformerActions = [];

    transformerActions.push(
      {
        id: '1',
        firstValue: 'Add Transformer',
        link: {
          link: { name: 'create-transformer'},
        },
      },
      {
        id: '2',
        firstValue: 'Edit Transformer',
        link: {
          link: { name: 'edit-transformer', params: { transformerId: this.transformer.id } },
        },
      },
      {
      id: '3',
      firstValue: 'Delete Transformer',
      link: {
        onClick: this.deleteTransformer,
      },
    });

    return transformerActions;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.transformer = createTransformerNullObject();
  }
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.transformer = await Transformers.getOne(this.$route.params.id);
    } catch (e) {
      this.$notifications.create(e);
    }
  }

  public async deleteTransformer(): Promise<void> {
    try {
      await Transformers.delete(this.transformer.id!);
      this.$notifications.create({
        title: `Transformer '${this.transformer.name}' has been deleted.`,
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
      this.$router.push({ name: 'transformers' });
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>
