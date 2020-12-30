import React, { useRef, useState } from "react";
import Editor from '@monaco-editor/react';

function VModEditor() {
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
    <div>Hello yes it is I, Baker</div>

    <button onClick={handleShowValue} disabled={!isEditorReady}>
      Show value
    </button>

    <Editor
      height="90vh"
      language="javascript"
      theme="dark"
      options={{fontSize: 15, minimap: {enabled: false}}}
      editorDidMount={handleEditorDidMount}
      value={"// write your code here"}
    />
  </>;
}

export { VModEditor };