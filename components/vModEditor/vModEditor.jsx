import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import {
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Editor, { monaco } from "@monaco-editor/react";
import styles from "./styles.module.scss";

import { checkForErrors, downloadMod } from "./transpilerHandler"

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

function displayErrors(errorMarkers, editor, monacoAlive) {
  // reset model markers to get rid of old errors
  monacoAlive.editor.setModelMarkers(
    editor.getModel(),
    "vanillamod",
    []
  );
  
  if (errorMarkers.length < 1) {
    // something funky happened, we got an error but didn't handle it smoothly
    // usually means vMod library has a bug
  } else {
    monacoAlive.editor.setModelMarkers(
      editor.getModel(),
      "vanillamod",
      errorMarkers
    );
    setTimeout(() => {
      const firstError = errorMarkers[0];
      editor.setPosition({
        lineNumber: firstError.startLineNumber,
        column: firstError.startColumn,
      });
      editor.getAction("editor.action.showHover").run();
      const actionContainer = document.getElementsByClassName(
        "action-container"
      );
      if (actionContainer.length > 0) actionContainer[0].click();
    }, 100);  
  }

  // display red X thingy saying errors were found
}

function VModEditor({ title, startingCode }) {
  const classes = useStyles();

  const [monacoAlive, setMonacoAlive] = useState(null);
  const [checkErrorsResult, setCheckErrorsResult] = useState(null);
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
      modName: title,
    };
    const code = editorRef.current.getValue();
    const errorMarkers = checkForErrors(code, modInfo, editorRef.current, monacoAlive);
    if (errorMarkers) {
      displayErrors(errorMarkers, editorRef.current, monacoAlive);
      return;
    }

    // no errors, hooray, display green confirm
    setCheckErrorsResult(true);
  }

  function downloadButtonClicked() {
    const modInfo = {
      modName: title,
    };
    const code = editorRef.current.getValue();
    const errorMarkers = checkForErrors(code, modInfo, editorRef.current, monacoAlive);
    if (errorMarkers) {
      displayErrors(errorMarkers, editorRef.current, monacoAlive);
      return;
    }

    // no errors, generate zip file clientside
    downloadMod(code, modInfo)
  }

  return (
    <>
      <Toolbar className={styles.editorHeader}>
        <Typography variant="h4" classes={{ root: classes.editorTitle }}>
          {title}
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
        value={startingCode}
      />
    </>
  );
}

VModEditor.propTypes = {
  startingCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

// eslint-disable-next-line import/prefer-default-export
export { VModEditor };
