import React from "react";
// eslint-disable-next-line import/no-unresolved
import Layout from "@theme/Layout"

import EditorViewDummyContent from './editorViewDummyContent'

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
