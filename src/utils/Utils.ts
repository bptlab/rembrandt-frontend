import { ResourceType,
  ResourceInstance,
  ResourceInstanceAttribute,
  OptimizationAlgorithm,
  Transformer,
  Recipe,
  Ingredient,
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
        thirdValue: resourceType.abstract ? 'Abstract Type' : `300 Instances`,
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

  public static transformerToList(transformers: Transformer[], onClick?: clickHandler) {
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

  public static recipesToList(recipes: Recipe[], onClick?: clickHandler) {
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

  public static recipeAttributesToList(recipe: Recipe): ListEntry[] {
    return [
      {
        id: 'name',
        firstValue: 'Name',
        secondValue: recipe.name,
      },
      {
        id: 'inputIngrediants',
        firstValue: 'InputIngrediants',
        secondValue: this.getInputIngrediantList(recipe),
      },
    ];
  }

  public static getInputIngrediantList(recipe: Recipe) {
   // console.log(rootIngrediant);
    return 'hallo';
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
