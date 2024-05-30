import {
  LexicalComposer,
  InitialEditorStateType,
} from '@lexical/react/LexicalComposer';
import React from 'react';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import './EditorComposer.css';
import i18n from './locale';
import { I18nextProvider } from 'react-i18next';
import { Class } from 'utility-types';
import { EditorThemeClasses, LexicalNode } from 'lexical';

interface IEditorComposer {
  children: React.ReactElement;
  initialEditorState?: InitialEditorStateType;
  additionalConfig?: {
    namespace?: string,
    nodes?: Array<Class<LexicalNode>>,
    onError?: () => void,
    theme?: EditorThemeClasses
  }
}

const EditorComposer = ({ children, initialEditorState, additionalConfig }: IEditorComposer) => {
  var namespace = "DDEditor";
  if (additionalConfig?.namespace) {
    namespace = additionalConfig.namespace;
  }
  const initialConfig = {
    namespace,
    nodes: [...PlaygroundNodes, ...additionalConfig?.nodes],
    onError: additionalConfig?.onError ? additionalConfig.onError : (error) => {
      throw error;
    },
    theme: additionalConfig?.theme ? additionalConfig.theme : PlaygroundEditorTheme,
    editorState: initialEditorState,
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <I18nextProvider i18n={i18n}>
        <div className="editor-shell">{children}</div>
      </I18nextProvider>
    </LexicalComposer>
  );
};

export default EditorComposer;
