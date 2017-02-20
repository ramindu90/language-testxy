'use babel';

import { _ } from 'lodash';
import testxUtil from './testxyUtil';

export class AtomAutocompleteProvider {

  constructor() {
    // settings for autocomplete-plus
    this.selector = '.source.testxy';
    this.disableForSelector = '.source.testxy .comment';
  }

  configure(config) {
    // settings for autocomplete-plus
    this.inclusionPriority = config.inclusionPriority;
    this.excludeLowerPriority = config.excludeLowerPriority;
    this.foldImports = config.foldImports;
  }

  // autocomplete-plus
  getSuggestions({editor, bufferPosition, prefix: origPrefix}) {
    const line = atomBallerinaUtil.getLine(editor, bufferPosition);
    const prevWord = atomBallerinaUtil.getPrevWord(editor, bufferPosition);
    const text = atomBallerinaUtil.getWord(editor, bufferPosition, true).replace('@', '');
    const prefix = text.substring(0, text.lastIndexOf('.'));
    const suffix = origPrefix.replace('.', '');
    const couldBeClass = /^[A-Z]/.test(suffix) || prefix;
  }
    
  _createSnippet(desc, line, prefix, addMemberClass) {
    // TODO use full class name in case of a name conflict
    // Use full class name in case of class import or method with long prefix
    const useFullClassName =
        desc.type === 'class' ? /^import/.test(line) : prefix.indexOf('.') !== -1;
    let text = useFullClassName ? desc.className : desc.simpleName;
    if (desc.member) {
      text = (addMemberClass ? '${1:' + text + '}.' : '') +
          this._createMemberSnippet(desc.member, desc.type);
    }
    return text;
  }

  _createMemberSnippet(member, type) {
    let snippet = null;
    if (!member.params) {
      snippet = (type === 'property')
          ? member.name : member.name + '()';
    } else {
      let index = 2;
      const params = _.map(member.params, (param) => {
            return '${' + (index++) + ':' + javaUtil.getSimpleName(param) + '}';
    });
      snippet = _.reduce(params, (result, param) => {
            return result + param + ', ';
    }, member.name + '(').replace(/, $/, ')');
      snippet = snippet + '${' + index + ':}';
    }
    return snippet;
  }

  // autocomplete-plus
  onDidInsertSuggestion({editor, suggestion}) {
  }

}
