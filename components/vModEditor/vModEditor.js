import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Editor, { monaco } from "@monaco-editor/react";
import styles from "./styles.module.scss";

import { transpiler } from "../transpiler";

const useStyles = makeStyles({
  fatButton: {
    marginLeft: "5px",
    marginRight: "5px",
    borderRadius: "0.5em",
  },
  fatButtonText: {
    fontWeight: "bold",
  },
  editorTitle: {
    paddingLeft: "20px",
    fontWeight: "bold",
  },
});

function addCustomError(error, editor, monacoAlive) {
  console.log("trying to add error to editor", error.location);
  if (error.location) {
    let startLine;
    let startCol;
    let endLine;
    let endCol;
    if (error.location.esprima) {
      console.log("adding esprima location");
      startLine = error.location.line;
      startCol = error.location.col;
      const line = editor.getModel().getLineContent(startLine);
      const nextSpace = line.indexOf(" ", startCol);
      endCol = nextSpace >= 0 ? nextSpace : line.length;
      endLine = error.location.line;
      console.log("here are locations", startLine, startCol, endLine, endCol);
    } else {
      // vanillamod error
      startLine = error.location.start.line;
      startCol = error.location.start.column + 1;
      endLine = error.location.end.line;
      endCol = error.location.end.column + 1;
    }
    return {
      startLineNumber: startLine,
      startColumn: startCol,
      endLineNumber: endLine,
      endColumn: endCol,
      message: error.message,
      severity: monacoAlive.MarkerSeverity.Error,
    };
  }
  console.log("NO LOCATION FOR ERROR:", error);
  return null;
}

function VModEditor(props) {
  const classes = useStyles();

  const [monacoAlive, setMonacoAlive] = useState(null);
  const editorRef = useRef();

  useEffect(() => {
    monaco.init().then((initializedMonaco) => {
      setMonacoAlive(initializedMonaco);
    });
  }, []);

  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
  }

  function checkButtonClicked() {
    const modInfo = {
      modName: props.title,
    };
    const code = editorRef.current.getValue();
    const datapack = transpiler.compile(code, modInfo);
    if (datapack.errors && monacoAlive) {
      const underlineMarkers = [];
      datapack.errors.forEach((error) => {
        const marker = addCustomError(error, editorRef.current, monacoAlive);
        console.log("here marker", marker);
        if (marker) underlineMarkers.push(marker);
      });
      monacoAlive.editor.setModelMarkers(
        editorRef.current.getModel(),
        "vanillamod",
        underlineMarkers
      );

      if (underlineMarkers.length > 0) {
        setTimeout(() => {
          const firstError = underlineMarkers[0];
          editorRef.current.setPosition({
            lineNumber: firstError.startLineNumber,
            column: firstError.startColumn,
          });
          editorRef.current.getAction("editor.action.showHover").run();
          const actionContainer = document.getElementsByClassName(
            "action-container"
          );
          if (actionContainer.length > 0) actionContainer[0].click();
        }, 100);
      } else {
        console.log(
          "Couldn't display any errors despite finding some. Awkward.",
          datapack.errors
        );
      }
    } else {
      console.log("transpiler", datapack);
    }
  }

  function downloadButtonClicked() {
    console.log("clicking downloadd!");
  }

  return (
    <>
      <Toolbar className={styles.editorHeader}>
        <Typography variant="h4" classes={{ root: classes.editorTitle }}>
          {props.title}
        </Typography>
        <div>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            classes={{
              root: classes.fatButton,
              label: classes.fatButtonText,
            }}
            onClick={checkButtonClicked}
          >
            Check
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            classes={{
              root: classes.fatButton,
              label: classes.fatButtonText,
            }}
            onClick={downloadButtonClicked}
          >
            Download
          </Button>
        </div>
      </Toolbar>

      <Editor
        height="85vh"
        language="javascript"
        theme="dark"
        options={{ fontSize: 15, minimap: { enabled: false } }}
        editorDidMount={handleEditorDidMount}
        value={props.startingCode}
      />
    </>
  );
}

export { VModEditor };
