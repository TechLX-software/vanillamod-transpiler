import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { ResizableBox } from 'react-resizable';
// Must import resizable styles globally
// import "./resizable-styles.css";

import { ModEditor } from "./ModEditor";

// const useStyles = makeStyles({
//   expandLeftButton: {
//     position: "absolute",
//     top: "65px",
//     left: "5px",
//     padding: "0px",
//     minWidth: "30px",
//     width: "30px",
//     height: "25px",
//   },
// });

function EditorView({ title, startingCode, isDarkTheme, children }) {
  const [leftPanelWidth, setLeftPanelWidth] = useState(250);
  const [rightPanelWidth, setRightPanelWidth] = useState(250);
  const [editorHeight, setEditorHeight] = useState(800);
  const [showLeftPanelContent, setShowLeftPanelContent] = useState(true);
  // const 

  const editorViewRef = React.useRef();

  // doesn't actually do anything
  // must add call to this inside resize of left panel box
  const changeLeftPanel = (sizes) => {
    const leftSize = parseFloat(sizes[0], 10);
    if (leftSize < 10) {
      setShowLeftPanelContent(false);
    } else {
      setShowLeftPanelContent(true);
    }
  };

  useEffect(() => {
    if (editorViewRef && editorViewRef.current) {
      const totalWidth = editorViewRef.current.offsetWidth;
      setLeftPanelWidth(totalWidth * 0.15);
      setRightPanelWidth(totalWidth * 0.15);
      setEditorHeight(editorViewRef.current.offsetHeight);
    }
  }, [editorViewRef]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
      ref={editorViewRef}
    >
      <ResizableBox 
        width={leftPanelWidth}
        height={editorHeight}
        axis="x"
        resizeHandles={["e"]}
        handleSize={[10, 10]}
        onResize={(e, data) => {
          setLeftPanelWidth(data.size.width);
        }}
      >
        {showLeftPanelContent && children[0]}
      </ResizableBox>

      <div
        style={{
          width: editorViewRef && editorViewRef.current
              ? editorViewRef.current.offsetWidth - leftPanelWidth - rightPanelWidth
              : 800
        }}
      >
        <ModEditor
          title={title}
          startingCode={startingCode}
          isDarkTheme={isDarkTheme}
        />
      </div>
      <ResizableBox
        width={rightPanelWidth}
        height={editorHeight}
        axis="x"
        resizeHandles={["w"]}
        handleSize={[10, 10]}
        onResize={(e, data) => {
          setRightPanelWidth(data.size.width);
        }}
      >
        {children[1]}
      </ResizableBox>
      
      {!showLeftPanelContent && (
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() => changeLeftPanel([10])}
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
  isDarkTheme: PropTypes.bool,
};

EditorView.defaultProps = {
  isDarkTheme: false,
};

export { EditorView };