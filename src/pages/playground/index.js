import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Editor from '@monaco-editor/react';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane'

function EditorPlayground() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  console.log("her pane", SplitPane)

  return (
    <Layout
      title={`Editor Playground`}
      description="Description will go into a meta tag in <head />">
      <main>
        <SplitPane split="vertical">
          <Pane initialSize="15%">You can use a Pane component</Pane>
          <Pane>
            <Editor height="90vh" language="javascript" theme="dark"/>
          </Pane>
          <Pane initialSize="25%">
            Using a Pane allows you to specify any constraints directly
          </Pane>
        </SplitPane>
      </main>
    </Layout>
  );
}

export default EditorPlayground;
