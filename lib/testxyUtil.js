'use babel';

import { _ } from 'lodash';

class TextXUtil {

  getSimpleName(className) {
    return className.replace(/[a-z]*\./g, '');
  }

  getPackageName(className) {
    return className.replace('.' + this.getSimpleName(className), '');
  }

  getInverseName(className) {
    return _.reduceRight(className.split('.'), (result, next) => {
      return result + next;
    }, '');
  }

}

export default new TextXUtil();
