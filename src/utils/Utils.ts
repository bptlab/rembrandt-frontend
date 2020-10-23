import { ResourceType,
  ResourceInstance,
  ResourceInstanceAttribute,
  OptimizationAlgorithm,
  Transformer,
  Recipe,
  Ingredient,
  ResourceTypes,
  Transformers,
  OptimizationAlgorithms,
  IngredientType,
  OptimizationExecution,
  OptimizationExecutionObject,
  OptimizationExecutionState,
  MetricResult,
  MetricResultAttribute,
  MetricResultEntry,
} from '@/apis/rembrandt/rembrandt';
import { ListEntry } from '@/components/Li.vue';
import translations from '@/config/translations.json';
import Notification from '@/interfaces/Notification';

// tslint:disable-next-line: no-var-requires
const ta = require('time-ago');

export type clickHandler = (id: string) => void;

export default class Utils {
  // region public static methods
  public static resourceTypesToList(resourceTypes: ResourceType[], onClick?: clickHandler): ListEntry[] {
    return resourceTypes.map((resourceType) => {
      return {
        id: resourceType.id || resourceType.name,
        firstValue: resourceType.name,
        secondValue: resourceType.parentType ? `Parent Type: ${resourceType.parentType.name}` : '',
        thirdValue: resourceType.abstract ? 'Abstract Type' : 'Non-Abstract Type',
        link: onClick ? {
          onClick: () => { onClick(resourceType.id || resourceType.name); },
        } : {
          link: { name: 'type', params: { id: resourceType.id }},
        },
      };
    });
  }

  public static resourceTypeAttributesToList(resourceType: ResourceType, onClick?: clickHandler): ListEntry[] {
    return resourceType.attributes.map((attribute) => {
      return {
        id: attribute.name,
        firstValue: attribute.name,
        secondValue: `Type: ${Utils.translateToNaturalLanguage(attribute.dataType)}`,
        thirdValue: `${attribute.required ? 'required' : 'optional'}
          ${resourceType.eponymousAttribute === attribute.name ? 'naming' : ''}`,
        link: onClick ? {
          onClick: () => { onClick(attribute.name); },
        } : undefined,
      };
    });
  }

  public static resourceInstancesToList(resourceInstances: ResourceInstance[], onClick?: clickHandler): ListEntry[] {
    // create list for specific type
    return resourceInstances.map( (resourceInstance) => {
      return {
        id: `${resourceInstance.id}`,
        // first value is the identifying value or the id, if no identifying value is set
        firstValue: this.getEponymousAttributeValue(resourceInstance),
        secondValue: `Resource Type: ${resourceInstance.resourceType.name}`,
        link: onClick ? {
          onClick: () => { onClick(resourceInstance.id || ''); },
        } : {
          link: { name: 'resource', params: { id: resourceInstance.id }},
        },
      };
    });
  }

  public static resourceInstanceAttributesToList(attributes: ResourceInstanceAttribute[]): ListEntry[] {
    return attributes.map((attribute) => {
      return {
        id: attribute.name,
        firstValue: attribute.name,
        secondValue: `${attribute.value}`,
      };
    });
  }

  public static notificationsToList(notifications: Notification[]): ListEntry[] {
    return notifications.sort((a, b) => {
      return b.timestamp.getTime() - a.timestamp.getTime();
    }).map((notification) => {
      return {
        id: Utils.createRandomId(),
        firstValue: notification.title,
        secondValue: notification.details,
        thirdValue: (new Date() as any) - (notification.timestamp as any) > 60000 ?
          ta.ago(notification.timestamp, true) : 'now',
        level: notification.level,
      };
    });
  }

  public static optimizationAlgorithmsToList(algorithms: OptimizationAlgorithm[], onClick?: clickHandler) {
    return algorithms.map((algorithm) => {
      return {
        id: algorithm.id || algorithm.name,
        firstValue: algorithm.name,
        secondValue:
          `( ${algorithm.inputs.map((input) => input.name).join(', ')} ) => ${algorithm.outputs.name}`,
        link: onClick ? {
          onClick: () => { onClick(algorithm.id || algorithm.name); },
        } : {
          link: { name: 'algorithm', params: { id: algorithm.id }},
        },
      };
    });
  }

  public static optimizationAlgorithmsAttributesToList(algorithm: OptimizationAlgorithm): ListEntry[] {
    return [
      {
        id: 'name',
        firstValue: 'Name',
        secondValue: algorithm.name,
      },
      {
        id: 'inputs',
        firstValue: 'Inputs',
        secondValue: algorithm.inputs.map((input) => input.name).join(', '),
      },
      {
        id: 'outpus',
        firstValue: 'Output',
        secondValue: algorithm.outputs.name,
      },
      {
        id: 'docker-info',
        firstValue: 'Docker Image',
        secondValue: `${algorithm.dockerConfig.name}${algorithm.dockerConfig.tag ?
          `:${algorithm.dockerConfig.tag}` :
          `@${algorithm.dockerConfig.digest}`}`,
      },
    ];
  }


  public static optimizationExecutionsToList(executions: OptimizationExecution[], onClick?: clickHandler): ListEntry[] {
    return executions.map((execution) => {
      return {
        id: execution.id || execution.identifier,
        firstValue: 'Execution Identifier: ' + execution.identifier,
        secondValue: Utils.getExecutionStateString(execution),
        thirdValue: Utils.getExecutionProgress(execution),
        link: onClick ? {
          onClick: () => { onClick(execution.id || execution.identifier); },
        } : {
          link: { name: 'execution', params: { id: execution.id } },
          },
      };
    });
  }

  public static optimizationExecutionStatesToList(execution: OptimizationExecution): ListEntry[] {
    return execution.processingStates.map((state) => {
      return {
        id: state.identifier,
        firstValue: state.identifier + ' - ' + Utils.getExecutionStateIngredient(execution, state),
        secondValue: Utils.getExecutionStateString(state),
      };
    });
  }

  public static getExecutionStateString(execution: OptimizationExecutionObject): string {
    if (execution.finishedAt) {
      if (execution.successful) {
        return `Finished successful ${ta.ago(execution.finishedAt)}`;
      } else {
        return `Execution failed ${ta.ago(execution.finishedAt)}`;
      }
    } else if (execution.startedAt) {
      return `Started ${ta.ago(execution.startedAt)}`;
    }

    return 'Execution was not started.';
  }

  public static getExecutionStateIngredient(
    execution: OptimizationExecution,
    executionState: OptimizationExecutionState): string {

    if (!execution.recipe.ingredients) {
      return '';
    }
    const ingredient = execution.recipe.ingredients.find(
      (currentIngredient) => {
        return (currentIngredient as any).Id === executionState.ingredient;
      });

    if (!ingredient) {
      return '';
    }

    return ingredient.ingredientType;
  }

  public static getExecutionProgress(execution: OptimizationExecution): string {
    const numberOfIngredients = execution.processingStates.length;
    const numberOfFinishedIngredients = execution.processingStates.filter((state) => state.successful).length;
    const finishedPercentage = (numberOfFinishedIngredients / numberOfIngredients) * 100;
    return `${Math.round(finishedPercentage)} %`;
  }

  public static transformerToList(transformers: Transformer[], onClick?: clickHandler): ListEntry[] {
    return transformers.map((transformer) => {
      return {
        id: transformer.id || transformer.name,
        firstValue: transformer.name,
        secondValue:
          `For resource type: ${transformer.resourceType.name}`,
        link: onClick ? {
          onClick: () => { onClick(transformer.id || transformer.name); },
        } : {
          link: { name: 'transformer', params: { id: transformer.id }},
        },
      };
    });
  }

  public static transformerAttributesToList(transformer: Transformer): ListEntry[] {
    return [
      {
        id: 'name',
        firstValue: 'Name',
        secondValue: transformer.name,
      },
      {
        id: 'resourceType',
        firstValue: 'ResourceType',
        secondValue: transformer.resourceType.name,
      },
      {
        id: 'transformerType',
        firstValue: 'TransformerType',
        secondValue: transformer.transformerType,
      },
      {
        id: 'body',
        firstValue: 'Body Function',
        secondValue: transformer.body,
      },
    ];
  }

  public static recipesToList(recipes: Recipe[], onClick?: clickHandler): ListEntry[] {
    return recipes.map((recipe) => {
      return {
        id: recipe.id || recipe.name,
        firstValue: recipe.name,
        link: onClick ? {
          onClick: () => { onClick(recipe.id || recipe.name); },
        } : {
          link: { name: 'recipe', params: { id: recipe.id }},
        },
      };
    });
  }

  public static getEponymousAttributeValue(resourceInstance: ResourceInstance): string {
    if (!resourceInstance.resourceType.eponymousAttribute) {
      return resourceInstance.id ? resourceInstance.id : '';
    }

    const attribute = resourceInstance.attributes.find( (resourceInstanceAttributes) => {
      return resourceInstanceAttributes.name === resourceInstance.resourceType.eponymousAttribute;
    });

    if (attribute) {
      return attribute.value;
    }
    return '';
  }

  public static createRandomId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  public static translateToNaturalLanguage(text: string): string {
    return (translations as any)[text];
  }

  public static async recipeAttributesToList(recipe: Recipe): Promise<ListEntry[]> {
    return [
      {
        id: 'name',
        firstValue: 'Name',
        secondValue: recipe.name,
      },
      {
        id: 'Input Ingredients',
        firstValue: 'Input Ingredients',
        secondValue: recipe.ingredients ? await this.getInputIngredientList(recipe.ingredients) : '',
      },
      {
        id: 'transformerIngredients',
        firstValue: 'Transformer Ingredients',
        secondValue: recipe.ingredients ? await this.getTransformerIngredientList(recipe.ingredients) : '',
      },
      {
        id: 'algorithmIngredient',
        firstValue: 'Algorithm Ingredients',
        secondValue: recipe.ingredients ? await this.getAlgorithmIngredientList(recipe.ingredients) : '',
      },
      {
        id: 'outputIngredients',
        firstValue: 'Output Ingredient',
        secondValue: recipe.ingredients ? await this.getOutputIngredientList(recipe.ingredients) : '',
      },
    ];
  }

  public static async getInputIngredientList(ingredients: Ingredient[]): Promise<string> {
    const inputIngredients = ingredients.filter( (ingredient) => {
      return ingredient.ingredientType === IngredientType.INPUT;
    });
    const namePromises = inputIngredients.map(async (ingredient: Ingredient): Promise<string> => {
      const resourceType = await ResourceTypes.getOne(ingredient.ingredientDefinition!);
      return resourceType.name;
    });
    const names = await Promise.all(namePromises);
    return names.join(', ');
  }

  public static async getTransformerIngredientList(ingredients: Ingredient[]): Promise<string> {
    const transformerIngredients = ingredients.filter( (ingredient) => {
      return ingredient.ingredientType === IngredientType.TRANSFORM;
    });
    const namePromises = transformerIngredients.map(async (ingredient: Ingredient): Promise<string> => {
      const transformer = await Transformers.getOne(ingredient.ingredientDefinition!);
      return transformer.name;
    });
    const names = await Promise.all(namePromises);
    return names.join(', ');
  }

  public static async getAlgorithmIngredientList(ingredients: Ingredient[]): Promise<string> {
    const AlgorithmIngredients = ingredients.filter( (ingredient) => {
      return ingredient.ingredientType === IngredientType.ALGORITHM;
    });
    const namePromises = AlgorithmIngredients.map(async (ingredient: Ingredient): Promise<string> => {
      const algorithm = await OptimizationAlgorithms.getOne(ingredient.ingredientDefinition!);
      return algorithm.name;
    });
    const names = await Promise.all(namePromises);
    return names.join(', ');
  }

  public static async getOutputIngredientList(ingredients: Ingredient[]): Promise<string> {
    const outputIngredients = ingredients.filter( (ingredient) => {
      return ingredient.ingredientType === IngredientType.OUTPUT;
    });
    const namePromises = outputIngredients.map(async (ingredient: Ingredient): Promise<string> => {
      const resourceType = await ResourceTypes.getOne(ingredient.ingredientDefinition!);
      return resourceType.name;
    });
    const names = await Promise.all(namePromises);
    return names.join(', ');
  }

  public static metricResultAttributeToList(metricResultEntry: MetricResultEntry): ListEntry[] {
    return metricResultEntry.metricResultAttributes.map((attribute) => {
      return {
        id: attribute.columnname,
        firstValue: attribute.value,
      };
    });
  }

  public static resultEntryAttributesToList(resultAttributes: MetricResultAttribute[]): ListEntry[] {
    // create list for specific result
    return resultAttributes.map( (resultAttribute) => {
      return {
        id: `${resultAttribute.columnname}`,
        firstValue: `${resultAttribute.value}` ,
      };
    });
  }

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

}
