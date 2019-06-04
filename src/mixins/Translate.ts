import { Vue, Component } from 'vue-property-decorator';
import Utils from '@/utils/Utils';

@Component
export default class MyMixin extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  public translateToNaturalLanguage(text: string): string {
    return Utils.translateToNaturalLanguage(text);
  }
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
