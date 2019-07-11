import _Vue from 'vue';
import { ResourceType, OptimizationAlgorithm, Transformer } from '@/apis/rembrandt/rembrandt';
import Resource from '@/apis/jsonapi/Resource';

export default function install(Vue: typeof _Vue, options = {}) {
  Vue.prototype.$recipeModeler = new RecipeModeler();
}

export interface Ingredient {
  inputs: Ingredient[];
  ingredientObject: Resource;
  position: {
    x: number;
    y: number;
  };
}

export interface InputIngredient extends Ingredient {
  ingredientObject: ResourceType;
}

export interface TransformerIngredient extends Ingredient {
  ingredientObject: Transformer;
}

export interface AlgorithmIngredient extends Ingredient {
  ingredientObject: OptimizationAlgorithm;
}

export interface OutputIngredient extends Ingredient {
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
        ingredients: [],
      };
    },
  });

  get ingredients(): Ingredient[] {
    return this.storeVM.$data.ingredients;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public addIngredient(element: Ingredient): void {
    if (this.ingredients.find((ingredient) => ingredient === element)) { return; }
    this.ingredients.push(element);
  }
  // endregion

  // region private methods
  // endregion
}
