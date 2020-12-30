import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { VModEditor } from '../../../components/vModEditor';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane'

function EditorPlayground() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
    <Layout
      title={`Editor Playground`}
      description="Description will go into a meta tag in <head />">
      <main>
        <SplitPane split="vertical">
          <Pane initialSize="15%">Left Pane (for ToC or documentation. And maybe a file browser)</Pane>
          <Pane>
            <VModEditor />
          </Pane>
          <Pane initialSize="25%">
            Right Pane (for lesson/mod description. And maybe test results)
          </Pane>
        </SplitPane>
      </main>
    </Layout>
  );
}

export default EditorPlayground;
