import { ResourceType, ResourceTypeAttribute } from '@/apis/rembrandt/rembrandt';
import { LiOptions } from '@/components/Li.vue';

export type OnClickFunction = (id: string) => void;

export default class Utils {
  // region public static methods
  public static resourceTypesToList(resourceTypes: ResourceType[], clickFunction?: OnClickFunction): LiOptions[] {
    return resourceTypes.map((resourceType) => {
      return {
        id: resourceType.id || resourceType.name,
        firstValue: resourceType.name,
        secondValue: resourceType.parentType ? `Parent Type: ${resourceType.parentType}` : '',
        thirdValue: resourceType.abstract ? 'Abstract Type' : `300 Instances`,
        link: {
          link: clickFunction ? '' : `/types/${resourceType.id}`,
          onClick: clickFunction ? () => { clickFunction(resourceType.id || resourceType.name); } : undefined,
        },
      };
    });
  }

  public static resourceTypeAttributesToList(resourceTypeAttributes: ResourceTypeAttribute[], clickFunction?: OnClickFunction): LiOptions[] {
    return resourceTypeAttributes.map((resourceTypeAttribute) => {
      return {
        id: resourceTypeAttribute.name,
        firstValue: resourceTypeAttribute.name,
        secondValue: resourceTypeAttribute.dataType,
        thirdValue: resourceTypeAttribute.required ? 'required' : '',
        link: {
          onClick: clickFunction ? () => { clickFunction(resourceTypeAttribute.name); } : undefined,
        },
      };
    });
  }

  public static resourceInstancesToList(resourceInstances: ResourceInstance[]): ListElement[] {
    // create list for specific type
    return resourceInstances.map((resourceInstance) => {
      return {
        id: `${resourceInstance.id}`,
        // first value needs to be the identifying value
        firstValue: `${resourceInstance.id}`,
        secondValue: `Resource Type: ${resourceInstance.resourceType}`,
        link: '',
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
