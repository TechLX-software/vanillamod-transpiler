import React, { useRef, useState } from "react";
import clsx from 'clsx';
import styles from './styles.module.css'

import Editor from '@monaco-editor/react';

function VModEditor(props) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function handleShowValue() {
    alert(valueGetter.current());
  }

  return <>
    <nav className={clsx('navbar', styles.editorHeader)}>
      <div className="navbar__inner">
        <h1 className={styles.editorHeaderTitle}>{props.title}</h1>
        <div className="navbar__items navbar__items--right">
          <a className={clsx('button button--outline button--secondary button--lg', styles.editorHeaderButton)} onClick={() => alert("hi")}>
            Check
          </a>

          <a className={clsx('button button--outline button--primary button--lg', styles.editorHeaderButton)} onClick={() => alert("hi")}>
            Download
          </a>
        </div>
      </div>
    </nav>

    <Editor
      height="90vh"
      language="javascript"
      theme="dark"
      options={{fontSize: 15, minimap: {enabled: false}}}
      editorDidMount={handleEditorDidMount}
      value={props.startingCode}
    />
  </>;
}

export { VModEditor };