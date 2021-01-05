import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SplitPane from "react-split-pane";
import Pane from "react-split-pane/lib/Pane";

import VModEditor from "./vModEditor";

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
});

function EditorView({ title, startingCode, children }) {
  const classes = useStyles();
  const [showLeftPanelContent, setShowLeftPanelContent] = useState(true);

  const editorViewRef = React.useRef();

  const changeLeftPanel = (sizes) => {
    const leftSize = parseFloat(sizes[0], 10);
    if (leftSize < 10) {
      setShowLeftPanelContent(false);
    } else {
      setShowLeftPanelContent(true);
    }
  };

  useEffect(() => {
    const draggables = editorViewRef.current.querySelectorAll(
      "div[data-type='Resizer']"
    );
    if (draggables) {
      draggables.forEach((elem) => {
        elem.style.opacity = 0;
      });
    }
  }, []);

  return (
    <div ref={editorViewRef}>
      <SplitPane split="vertical" onResizeEnd={changeLeftPanel}>
        {showLeftPanelContent && <Pane initialSize="15%">{children[0]}</Pane>}
        {!showLeftPanelContent && <Pane initialSize="0px" />}
        <Pane>
          <VModEditor title={title} startingCode={startingCode} />
        </Pane>
        <Pane initialSize="25%">{children[1]}</Pane>
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
    </div>
  );
}

EditorView.propTypes = {
  startingCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default EditorView;
