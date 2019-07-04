import _Vue from 'vue';
import { ResourceType, OptimizationAlgorithm } from '@/apis/rembrandt/rembrandt';

export default function install(Vue: typeof _Vue, options = {}) {
  Vue.prototype.$recipeModeler = new RecipeModeler();
}

export interface Ingredient {
  input?: Ingredient | Ingredient[];
  output?: Ingredient | Ingredient[];
  ingredientObject: any;
}

export interface InputIngredient extends Ingredient {
  output?: Ingredient;
  ingredientObject: ResourceType;
}

export interface TransformerIngredient extends Ingredient {
  input?: Ingredient;
  output?: Ingredient;
}

export interface AlgorithmIngredient extends Ingredient {
  input?: Ingredient[];
  output?: Ingredient;
  ingredientObject: OptimizationAlgorithm;
}

export interface OutputIngredient extends Ingredient {
  input?: Ingredient;
  ingredientObject: ResourceType;
}

export class RecipeModeler {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public storeVM = new _Vue({
    data() {
      return {
        currentElement: undefined,
        recipe: [],
      };
    },
  });

  get recipe(): Ingredient[] {
    return this.storeVM.$data.recipe;
  }

  get currentElement(): Ingredient {
    return this.storeVM.$data.currentElement;
  }

  set currentElement(element: Ingredient) {
    this.storeVM.$data.currentElement = element;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public addRecipeElement(): void {
    this.recipe.push({
      ingredientObject: {},
    });
  }
  // endregion

  // region private methods
  // endregion
}
