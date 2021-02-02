import React from "react";
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
// eslint-disable-next-line import/no-unresolved
import Layout from "@theme/Layout"

import EditorViewDummyContent from './editorViewDummyContent'

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

function EditorPlayground() {
  return (
    <Layout
      title="Editor Playground"
      description="Code Editor Playground for the vMod / VanillaMod library"
    >
      <main>
        <ThemeProvider theme={theme}>
          <EditorViewDummyContent />
        </ThemeProvider>
      </main>
    </Layout>
  );
}

export default EditorPlayground;
