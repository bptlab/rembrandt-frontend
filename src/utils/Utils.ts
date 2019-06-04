import { ResourceType, ResourceInstance, ResourceTypeAttribute } from '@/apis/rembrandt/rembrandt';
import { ListEntry } from '@/components/Li.vue';
import translations from '@/config/translations.json';

export type clickHandler = (id: string) => void;

export default class Utils {
  // region public static methods
  public static resourceTypesToList(resourceTypes: ResourceType[], onClick?: clickHandler): ListEntry[] {
    return resourceTypes.map((resourceType) => {
      return {
        id: resourceType.id || resourceType.name,
        firstValue: resourceType.name,
        secondValue: resourceType.parentType ? `Parent Type: ${resourceType.parentType}` : '',
        thirdValue: resourceType.abstract ? 'Abstract Type' : `300 Instances`,
        link: {
          link: onClick ? '' : `/types/${resourceType.id}`,
          onClick: onClick ? () => { onClick(resourceType.id || resourceType.name); } : undefined,
        },
      };
    });
  }

  public static resourceTypeAttributesToList(attributes: ResourceTypeAttribute[], onClick?: clickHandler): ListEntry[] {
    return attributes.map((attribute) => {
      return {
        id: attribute.name,
        firstValue: attribute.name,
        secondValue: `Type: ${Utils.translateToNaturalLanguage(attribute.dataType)}`,
        thirdValue: attribute.required ? 'required' : '',
        link: onClick ? {
          onClick: () => { onClick(attribute.name); },
        } : undefined,
      };
    });
  }

  public static resourceInstancesToList(resourceInstances: ResourceInstance[]): ListEntry[] {
    // create list for specific type
    return resourceInstances.map((resourceInstance) => {
      return {
        id: `${resourceInstance.id}`,
        // first value needs to be the identifying value
        firstValue: `${resourceInstance.id}`,
        secondValue: `Resource Type: ${resourceInstance.resourceType}`,
      };
    });
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
