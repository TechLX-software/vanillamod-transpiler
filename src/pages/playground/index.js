import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

import { VModEditor } from '../../../components/vModEditor';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane'

function EditorPlayground() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const [showLeftPanelContent, setShowLeftPanelContent] = useState(true);
  let editorRef = React.createRef();

  const dragFinished = (sizes) => {
    const leftSize = parseFloat(sizes[0], 10);
    if (leftSize < 10) {
      setShowLeftPanelContent(false);
    } else {
      setShowLeftPanelContent(true);
    }
  }

  useEffect( () => {
    const draggables = editorRef.current.querySelectorAll("div[data-type='Resizer']");
    if (draggables) {
      draggables.forEach((elem) => {
        elem.style.opacity = 0;
      })
    }
  }, [])

  return (
    <Layout
      title={`Editor Playground`}
      description="Code Editor Playground for the vMod / VanillaMod library">
      <main ref={editorRef}>
        <SplitPane split="vertical" onResizeEnd={dragFinished} >
          {showLeftPanelContent &&
            <Pane initialSize="15%">
              <div className={styles.paneContentWrapper}>
                <div className="card">
                  <div className="card__header">
                    <h3>Left Panel</h3>
                  </div>
                  <div className="card__body">
                    <p>
                      This panel will hold the table of contents of a course if the current 
                      mod has one. Unsure of what it should display for a normal user-made mod.
                    </p>
                    <p>
                      Eventually, there might be a file browser here too.
                    </p>
                    <p>
                      Try resizing me!
                    </p>
                  </div>
                </div>
              </div>
            </Pane>
          }
          {!showLeftPanelContent && <Pane initialSize="0px" />}
          <Pane>
            <VModEditor 
              title="vMod Playground"
              startingCode="// write your code here"
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
                    This panel will hold the the description of the mod or lesson. 
                    It will have a tab to switch to the interactive documentation.
                  </p>
                  <p>
                    Eventually, there might be a display for test results.
                  </p>
                  <p>
                    Try resizing me!
                  </p>
                </div>
              </div>
            </div>
          </Pane>
        </SplitPane>
      </main>
    </Layout>
  );
}

export default EditorPlayground;
