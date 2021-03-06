import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import { ResourceType, OptimizationAlgorithm, Transformer } from '@/apis/rembrandt/rembrandt';

export enum IngredientType {
  INPUT = 'input',
  OUTPUT = 'output',
  TRANSFORM = 'transform',
  ALGORITHM = 'algorithm',
}

export interface Ingredient {
  ingredientDefinition?: string;
  ingredientType: IngredientType;
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
  ingredients?: Ingredient[];
}

const serializer = new Serializer('recipes', {
  id: 'id',
  attributes: [
    'name',
    'rootIngredient',
    'ingredients',
  ],
  keyForAttribute: 'camelCase',
});

export const Recipes = new CRUDResource<Recipe>(
  `${process.env.VUE_APP_BACKEND_BASE_URL}/optimization/recipes`,
  serializer,
);

export function createRecipeNullObject(): Recipe {
  return {
    name: '',
    rootIngredient: createIngredientNullObject(),
    ingredients: [],
  };
}

export function createIngredientNullObject(): Ingredient {
  return {
    inputs: [],
    ingredientObject: {},
    ingredientType: IngredientType.INPUT,
    position: {
      x: 0,
      y: 0,
    },
  };
}
