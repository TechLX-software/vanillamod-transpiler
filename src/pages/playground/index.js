import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";

import { VModEditor } from "../../../components/vModEditor";
import codeEamples from "../../../components/transpiler/codeExamples";
import SplitPane from "react-split-pane";
import Pane from "react-split-pane/lib/Pane";

const useStyles = makeStyles({
  expandLeftButton: {
    position: "absolute",
    top: "65px",
    left: "5px",
    padding: "0px",
    minWidth: "30px",
    width: "30px",
    height: "25px",
  },
  noCap: {
    textTransform: "none",
  },
});

function EditorPlayground() {
  const classes = useStyles();
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const [showLeftPanelContent, setShowLeftPanelContent] = useState(true);
  const [editorStarterCode, setEditorStarterCode] = useState(
    "// write your code here"
  );

  let editorRef = React.createRef();

  const changeLeftPanel = (sizes) => {
    const leftSize = parseFloat(sizes[0], 10);
    if (leftSize < 10) {
      setShowLeftPanelContent(false);
    } else {
      setShowLeftPanelContent(true);
    }
  };

  useEffect(() => {
    const draggables = editorRef.current.querySelectorAll(
      "div[data-type='Resizer']"
    );
    if (draggables) {
      draggables.forEach((elem) => {
        elem.style.opacity = 0;
      });
    }
  }, []);

  return (
    <Layout
      title={`Editor Playground`}
      description="Code Editor Playground for the vMod / VanillaMod library"
    >
      <main ref={editorRef}>
        <SplitPane split="vertical" onResizeEnd={changeLeftPanel}>
          {showLeftPanelContent && (
            <Pane initialSize="15%">
              <div className={styles.paneContentWrapper}>
                <div className="card">
                  <div className="card__header">
                    <h3>Left Panel</h3>
                  </div>
                  <div className="card__body">
                    <p>
                      This resizable panel will hold the table of contents of a
                      course if the current mod has one. Unsure of what it
                      should display for a normal user-made mod.
                    </p>
                    <p>Eventually, there might be a file browser here too.</p>
                  </div>
                </div>
              </div>
            </Pane>
          )}
          {!showLeftPanelContent && <Pane initialSize="0px" />}
          <Pane>
            <VModEditor
              title="vMod Playground"
              startingCode={editorStarterCode}
            />
          </Pane>
          <Pane initialSize="25%">
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
                  <p>Eventually, there might be a display for test results.</p>
                </div>
              </div>
              <div className="card">
                <div className="card__header">
                  <h3>Code Examples</h3>
                </div>
                {codeEamples.map((example, index) => (
                  <div className="card__body" key={index}>
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
          </Pane>
        </SplitPane>
        {!showLeftPanelContent && (
          <Button
            size="small"
            variant="contained"
            onClick={() => changeLeftPanel([10])}
            classes={{
              root: classes.expandLeftButton,
            }}
          >
            {">"}
          </Button>
        )}
      </main>
    </Layout>
  );
}

export default EditorPlayground;
