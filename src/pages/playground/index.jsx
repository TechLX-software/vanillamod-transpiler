import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// eslint-disable-next-line import/no-unresolved
import Layout from "@theme/Layout";
// eslint-disable-next-line import/no-unresolved
import useThemeContext from "@theme/hooks/useThemeContext";

import "./vmodStyles.scss";
import styles from "./styles.module.scss";
import codeExamples from "../../../components/transpiler/codeExamples";
import { EditorView } from "../../../components/mod-editor";

function EditorViewDummyContent() {
  const { isDarkTheme } = useThemeContext();
  const [editorStarterCode, setEditorStarterCode] = useState(
    "// write your code here"
  );

  return (
    <main className="bootstrap-iso">
      <EditorView
        title="vMod Playground"
        startingCode={editorStarterCode}
        isDarkTheme={isDarkTheme}
      >
        {/* Left Panel */}
        <div className={styles.paneContentWrapper}>
          <Card>
            <Card.Body>
              <Card.Title>Left Panel</Card.Title>
              <Card.Text>
                This resizable panel will hold the table of contents of a
                course if the current mod has one. Unsure of what it should
                display for a normal user-made mod.
              </Card.Text>
              <Card.Text>Eventually, there might be a file browser here too.</Card.Text>
            </Card.Body>
          </Card>
        </div>
        {/* Right Panel  */}
        <div className={styles.paneContentWrapper}>
          <Card>
            <Card.Body>
              <Card.Title>Right Panel</Card.Title>
              <Card.Text>
                This resizable panel will hold the the description of the
                mod or lesson. It will have a tab to switch to the
                interactive documentation.
              </Card.Text>
              <Card.Text>
                Eventually, there might be a display for test results.
              </Card.Text>
              <Card.Title>Code Examples</Card.Title>
              {codeExamples.map((example) => (
                <Button
                  variant="light"
                  onClick={() => setEditorStarterCode(example.code)}
                  key={example.title}
                  className="my-1"
                >
                  {example.title}
                </Button>
              ))}
            </Card.Body>
          </Card>
        </div>
      </EditorView>
    </main>
  );
}

function EditorPlayground() {
  return (
    <Layout
      title="Editor Playground"
      description="Code Editor Playground for the vMod / VanillaMod library"
    >
      <EditorViewDummyContent />
    </Layout>
  );
}

export default EditorPlayground;
