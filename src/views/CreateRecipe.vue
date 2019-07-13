<template>
  <main v-if="formState === 0">
    <ViewHeader
      title="How should the new recipe be called?"
      :backLink="{ link: { name: 'recipes' } }"
    />
    <Input
      :value.sync="newRecipe.name"
      name="Name"
      placeholder="Vehicle Routing for SMILE"
      :autofocus="true"
    />
    <Button text="Continue" :onClick="nextStep" />
  </main>
  <main class="create-recipe" v-else-if="formState === 1">
    <div class="wrapper">
      <ViewHeader title="Please model your recipe below:" :backLink="{ onClick: previousStep }" />
    </div>
    <div class="modeler">
      <div class="ingredients">
        <div class="add-inputs">
          <h2>Inputs</h2>
          <button
            v-for="resourceType in resourceTypes"
            :key="resourceType.id"
            @click="addInputIngredient(resourceType)"
          >{{ resourceType.name }}</button>
        </div>
        <div class="add-outputs">
          <h2>Outputs</h2>
          <button
            v-for="resourceType in resourceTypes"
            :key="resourceType.id"
            @click="addOutputIngredient(resourceType)"
          >{{ resourceType.name }}</button>
        </div>
        <div class="add-transformers">
          <h2>Transformers</h2>
          <button
            v-for="transformer in transformers"
            :key="transformer.id"
            @click="addTransformerIngredient(transformer)"
          >{{ transformer.name }}</button>
        </div>
        <div class="add-algorithms">
          <h2>Algorithms</h2>
          <button
            v-for="algorithm in algorithms"
            :key="algorithm.id"
            @click="addAlgorithmIngredient(algorithm)"
          >{{ algorithm.name }}</button>
        </div>
      </div>

      <div class="playground">
        <InputDraggable
          v-for="ingredient in inputIngredients"
          :key="ingredient.ingredientObject.id"
          :ingredientObject="ingredient.ingredientObject"
        />
        <OutputDraggable
          v-for="ingredient in outputIngredients"
          ref="outputDraggables"
          :key="ingredient.ingredientObject.id"
          :ingredientObject="ingredient.ingredientObject"
        />
        <TransformerDraggable
          v-for="ingredient in transformerIngredients"
          :key="ingredient.ingredientObject.id"
          :ingredientObject="ingredient.ingredientObject"
        />
        <AlgorithmDraggable
          v-for="ingredient in algorithmIngredients"
          :key="ingredient.ingredientObject.id"
          :ingredientObject="ingredient.ingredientObject"
        />
      </div>
    </div>
    <div class="wrapper">
      <Button text="Create Recipe" :onClick="createRecipe" />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Draggable from '@/components/Draggable.vue';
import InputDraggable from '@/components/InputDraggable.vue';
import OutputDraggable from '@/components/OutputDraggable.vue';
import TransformerDraggable from '@/components/TransformerDraggable.vue';
import AlgorithmDraggable from '@/components/AlgorithmDraggable.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import {
  ResourceTypeNullObject,
  ResourceTypes,
  createTransformerNullObject,
  Transformers,
  Transformer,
  createOptimizationAlgorithmNullObject,
  OptimizationAlgorithms,
  ResourceType,
  OptimizationAlgorithm,
  Recipe,
  Recipes,
  InputIngredient,
  OutputIngredient,
  TransformerIngredient,
  AlgorithmIngredient,
  createRecipeNullObject,
} from '@/apis/rembrandt/rembrandt';
import interact from 'interactjs';
import { NotificationLevel } from '@/interfaces/Notification';

@Component({
  components: {
    Draggable,
    InputDraggable,
    OutputDraggable,
    TransformerDraggable,
    AlgorithmDraggable,
    ViewHeader,
    Button,
    Input,
  },
})
export default class CreateRecipe extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public newRecipe: Recipe;
  public formState: number = 0;
  // endregion

  // region private members
  private inputIngredients: InputIngredient[] = [];
  private outputIngredients: OutputIngredient[] = [];
  private transformerIngredients: TransformerIngredient[] = [];
  private algorithmIngredients: AlgorithmIngredient[] = [];

  private resourceTypes: ResourceType[] = [];
  private transformers: Transformer[] = [];
  private algorithms: OptimizationAlgorithm[] = [];
  // endregion

  // region constructor
  constructor() {
    super();
    this.newRecipe = createRecipeNullObject();
  }
  // endregion

  // region public methods
  public async mounted() {
    this.resourceTypes = await ResourceTypes.get();
    this.transformers = await Transformers.get();
    this.algorithms = await OptimizationAlgorithms.get();
  }

  public previousStep(): void {
    if (this.formState > 0) {
      this.formState--;
    }
  }

  public nextStep(): void {
    this.formState++;
  }

  public async createRecipe() {
    if (this.outputIngredients.length < 1) {
      this.$notifications.create({
        title: 'Recipes require an output ingredient.',
        details: 'Please add an output ingredient to continue.',
        level: NotificationLevel.Critical,
        timestamp: new Date(),
      });
      return;
    } else if (this.outputIngredients.length > 1) {
      this.$notifications.create({
        title: 'Recipes are limited to one output ingredient.',
        details: 'Please remove all output ingredients but one to continue.',
        level: NotificationLevel.Critical,
        timestamp: new Date(),
      });
      return;
    }

    this.newRecipe.ingrediants = [];

    try {
      await Recipes.create(this.newRecipe);
      this.$notifications.create({
        title: `Recipe '${this.newRecipe.name}' has been created.`,
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
      this.$router.push({ name: 'recipes' });
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion

  // region private methods
  private addInputIngredient(resourceType: ResourceType) {
    this.inputIngredients.push({
      inputs: [],
      ingredientObject: resourceType,
      position: {
        x: 0,
        y: 0,
      },
    });
  }

  private addOutputIngredient(resourceType: ResourceType) {
    this.outputIngredients.push({
      inputs: [],
      ingredientObject: resourceType,
      position: {
        x: 0,
        y: 0,
      },
    });
  }

  private addTransformerIngredient(transformer: Transformer) {
    this.transformerIngredients.push({
      inputs: [],
      ingredientObject: transformer,
      position: {
        x: 0,
        y: 0,
      },
    });
  }

  private addAlgorithmIngredient(algorithm: OptimizationAlgorithm) {
    this.algorithmIngredients.push({
      inputs: [],
      ingredientObject: algorithm,
      position: {
        x: 0,
        y: 0,
      },
    });
  }
  // endregion
}
</script>

<style lang="less">
@import "../colors.less";

main.create-recipe {
  max-width: unset;
  display: flex;
  flex-direction: column;

  .modeler {
    display: flex;
    flex: 1 0;

    .ingredients,
    .ingredients > * {
      display: flex;
      flex-direction: column;
    }

    .ingredients {
      margin: @spacing;
      min-width: 200px;

      & > * {
        padding: @spacing 0;
      }

      & > *:first-child {
        padding: 0;
      }
    }

    .playground {
      flex: 1 0;
      margin: @spacing 0;
    }
  }
}
</style>

