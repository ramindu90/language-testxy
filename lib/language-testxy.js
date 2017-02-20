'use babel';
import { CompositeDisposable } from 'atom'
import { AtomAutocompleteProvider } from './atomAutocompleteProvider';


require('./js/jquery-1.7.1.min');

grammerTestX = false;
currentPanelId = -1;

class LanguageBallerina {
    constructor() {
        this.subscriptions = undefined;
        this.provider = undefined;
        atom.workspace.observeTextEditors(function (editor) {
            var editorView, keypressHandler;
            editorView = atom.views.getView(editor);
            return editorView.addEventListener('keyup', keypressHandler = function (event) {
                console.log(editor.getText());
            });
        });
    }

    activate() {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'language-testxy:parse': () => this.parse()
        }))
        this.provider = new AtomAutocompleteProvider();
    }

    deactivate() {
        this.subscriptions.dispose()
    }

    parse() {
        if (grammerTestX) {
            console.log("grammer testxy");
        }
    }

    getProvider() {
        return this.provider;
    }

    _onChange(paneItem) {
        if (null != paneItem && null != paneItem.id && null != atom.workspace.getActiveTextEditor()) {
            currentEditor = atom.workspace.getActiveTextEditor();
            currentPanelId = paneItem.id;
            if ("TestXY" === atom.workspace.getActiveTextEditor().getGrammar().name) {
                grammerTestX = true;
            } else {
                grammerTestX = false;
            }
            this.parse();
        }
    }
}
export default new LanguageBallerina();
