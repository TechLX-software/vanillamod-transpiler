import React, { useState } from "react";
import { Button } from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
// eslint-disable-next-line import/no-unresolved
import useThemeContext from '@theme/hooks/useThemeContext';
import styles from "./styles.module.scss";

import codeExamples from "../../../components/transpiler/codeExamples";
import EditorView from "../../../components/vModEditor";

const useStyles = makeStyles({
  noCap: {
    textTransform: "none",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d36135",
    },
    secondary: {
      main: "#006d77",
    },
  },
});

function EditorViewDummyContent() {
  const classes = useStyles();
  const { isDarkTheme } = useThemeContext();
  const [editorStarterCode, setEditorStarterCode] = useState(
    "// write your code here"
  );

  return (
    <main>
        <ThemeProvider theme={theme}>
          
    <EditorView title="vMod Playground" startingCode={editorStarterCode} isDarkTheme={isDarkTheme}>
      {/* Left Panel */}
      <div className={styles.paneContentWrapper}>
        <div className="card">
          <div className="card__header">
            <h3>Left Panel</h3>
          </div>
          <div className="card__body">
            <p>
              This resizable panel will hold the table of contents of a
              course if the current mod has one. Unsure of what it should
              display for a normal user-made mod.
            </p>
            <p>Eventually, there might be a file browser here too.</p>
          </div>
        </div>
      </div>
      {/* Right Panel  */}
      <div>
        <div className={styles.paneContentWrapper}>
          <div className="card">
            <div className="card__header">
              <h3>Right Panel</h3>
            </div>
            <div className="card__body">
              <p>
                This resizable panel will hold the the description of the
                mod or lesson. It will have a tab to switch to the
                interactive documentation.
              </p>
              <p>
                Eventually, there might be a display for test results.
              </p>
            </div>
            <div className="card__header">
              <h3>Code Examples</h3>
            </div>
            {codeExamples.map((example) => (
              <div className="card__body" key={example.title}>
                <Button
                  variant="contained"
                  onClick={() => setEditorStarterCode(example.code)}
                  classes={{
                    label: classes.noCap,
                  }}
                >
                  {example.title}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EditorView>
      </ThemeProvider>
    </main>
  );
}

export default EditorViewDummyContent;