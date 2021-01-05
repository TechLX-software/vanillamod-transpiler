import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import {
  Button,
  Toolbar,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
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
  const [errorInfo, setErrorInfo] = useState(null);
  const [clearErrorInfo, setClearErrorInfo] = useState(null);
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
    }

    // no errors, hooray, display green confirm
    const errorCount = errorMarkers ? errorMarkers.length : 0;
    setErrorInfo(<ErrorInfo
      errorCount={errorCount}
    />);
    if (clearErrorInfo) clearTimeout(clearErrorInfo);
    const newClear = setTimeout(() => {
      setErrorInfo(null);
    }, 8000);
    setClearErrorInfo(newClear);
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
        <Box width="60%" display="inline-block">
          <Typography variant="h4" classes={{ root: classes.editorTitle }}>
            {title}
          </Typography>
        </Box>
        <Box width="40%" display="inline-block">
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            {errorInfo}
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
          </Grid>
        </Box>
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

function ErrorInfo({ errorCount }) {
  return (
    <Box width="30%">
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        {errorCount ? 
          <ErrorOutlineIcon color="error"/>
        :
          <CheckCircleOutlineIcon color="secondary"/>
        }
        <Typography color={errorCount ? "error" : "secondary"}>
          {errorCount ? 
            `${errorCount} Error${errorCount > 1 ? "s" : ""}`
          :
            "No Errors!"
          }
        </Typography>
      </Grid>
    </Box>
  )
}

ErrorInfo.propTypes = {
  errorCount: PropTypes.number.isRequired,
}

export default VModEditor;
