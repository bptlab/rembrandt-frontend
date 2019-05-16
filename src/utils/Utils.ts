import { ResourceType, ResourceTypeAttribute, ResourceInstance } from '@/apis/rembrandt/rembrandt';
import { ListElement } from '@/components/ListSection.vue';

export default class Utils {
  // region public static methods
  public static resourceTypesToList(resourceTypes: ResourceType[]): ListElement[] {
    return resourceTypes.map((resourceType) => {
      return {
        id: resourceType.id || resourceType.name,
        firstValue: resourceType.name,
        secondValue: resourceType.parentType ? `Parent Type: ${resourceType.parentType}` : '',
        thirdValue: resourceType.abstract ? 'Abstract Type' : `300 Instances`,
        link: `/types/${resourceType.id}`,
      };
    });
  }

  public static resourceTypeAttributesToList(resourceTypeAttributes: ResourceTypeAttribute[]): ListElement[] {
    return resourceTypeAttributes.map((resourceTypeAttribute) => {
      return {
        id: resourceTypeAttribute.name,
        firstValue: resourceTypeAttribute.name,
        secondValue: resourceTypeAttribute.dataType,
        thirdValue: resourceTypeAttribute.required ? 'required' : '',
        link: '',
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
