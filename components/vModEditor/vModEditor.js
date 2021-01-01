import React, { useEffect, useRef, useState } from "react";
import clsx from 'clsx';
import styles from './styles.module.css'

import Editor, { monaco } from '@monaco-editor/react';
import { transpiler } from '../transpiler'

function VModEditor(props) {
  const [monacoAlive, setMonacoAlive] = useState(null);
  const editorRef = useRef();

  useEffect(() => {
    monaco.init().then((initializedMonaco) => {
      setMonacoAlive(initializedMonaco);
      console.log("here monaco alive", initializedMonaco)
    });
  }, [])

  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
  }

  function checkButtonClicked() {
    const modInfo = {
      modName: "playground mod"
    }
    const code = editorRef.current.getValue();
    const datapack = transpiler.compile(code, modInfo)
    console.log("edditor is", editorRef.current)
    if (datapack.errors && monacoAlive) {
      monacoAlive.editor.setModelMarkers(editorRef.current.getModel(), 'hooga booga', [{
        startLineNumber: 3,
        startColumn: 5,
        endLineNumber: 3,
        endColumn: 10,
        message: "a yuge message",
        severity: monacoAlive.MarkerSeverity.Error
      }])
      // editorRef.current.changeViewZones( (changeAccessor) => {
      //   console.log("view zones", changeAccessor)
      //   var domNode = document.createElement('div');
      //   domNode.style.background = 'lightgreen';
      //   var domNode2 = document.createElement('div');
        
      //   viewZoneId = changeAccessor.addZone({
      //     afterLineNumber: 4,
      //     afterColumn: 5,
      //     heightInLines: 3,
      //     domNode: domNode,
      //     marginDomNode: domNode2
      //   });
      // })
      let overlayDom = document.createElement('div');
      overlayDom.id = 'overlayId';
      overlayDom.style.width = '100%';
      overlayDom.style.background = '#ffb275';

      // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ioverlaywidget.html
      let overlayWidget = {
        getId: () => 'overlay.zone.widget',
        getDomNode: () => overlayDom,
        getPosition: () => null
      };
      editorRef.current.addOverlayWidget(overlayWidget);

      // Used only to compute the position.
      let zoneNode = document.createElement('div');
      zoneNode.style.background = '#8effc9';
      zoneNode.id = "zoneId";

      // Can be used to fill the margin
      let marginDomNode = document.createElement('div');
      marginDomNode.style.background = '#ff696e';
      marginDomNode.id = "zoneMarginId";

      editorRef.current.changeViewZones(function(changeAccessor) {
        changeAccessor.addZone({
          afterLineNumber: 4,
          heightInLines: 3,
          afterColumn: 6,
          domNode: zoneNode,
          marginDomNode: marginDomNode,
          onDomNodeTop: top => {
            overlayDom.style.top = top + "px";
          },
          onComputedHeight: height => {
            overlayDom.style.height = height + "px";
          }

        });
      });

    } else {
      console.log("transpiler", datapack)
    }
  }

  return <>
    <nav className={clsx('navbar', styles.editorHeader)}>
      <div className="navbar__inner">
        <h1 className={styles.editorHeaderTitle}>{props.title}</h1>
        {/* <p>Stuff</p> the error messages can be displayed here */}
        <div className="navbar__items navbar__items--right">
          <a className={clsx('button button--secondary button--lg', styles.editorHeaderButton)} onClick={checkButtonClicked}>
            Check
          </a>

          <a className={clsx('button button--primary button--lg', styles.editorHeaderButton)} onClick={() => alert("hi")}>
            Download
          </a>
        </div>
      </div>
    </nav>

    <Editor
      height="85vh"
      language="javascript"
      theme="dark"
      options={{fontSize: 15, minimap: {enabled: false}}}
      editorDidMount={handleEditorDidMount}
      value={props.startingCode}
    />
  </>;
}

export { VModEditor };