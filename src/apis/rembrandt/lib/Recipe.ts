import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import config from '@/config/config.json';
import { ResourceType, OptimizationAlgorithm, Transformer } from '@/apis/rembrandt/rembrandt';

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


export interface Recipe extends Resource {
  name: string;
  rootIngredient: Ingredient;
}

const serializer = new Serializer('recipes', {
  id: 'id',
  attributes: [
    'name',
    'rootIngredient',
  ],
  keyForAttribute: 'camelCase',
});

export const Recipes = new CRUDResource<Recipe>(
  `${config.backendHost}/optimization/recipes`,
  serializer,
);

export function createRecipeNullObject(): Recipe {
  return {
    name: '',
    rootIngredient: createIngredientNullObject(),
  };
}

export function createIngredientNullObject(): Ingredient {
  return {
    inputs: [],
    ingredientObject: {},
    position: {
      x: 0,
      y: 0,
    },
  };
}
