import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import Button from 'react-bootstrap/Button';
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import "react-reflex/styles.css";

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

function EditorView({ title, startingCode, onChange, isDarkTheme, hoistHelper, children }) {
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
    <ReflexContainer orientation="vertical">
      <ReflexElement className="left-pane" flex={0.15}>
        <div className="pane-content">
          {children[0]}
        </div>
      </ReflexElement>

      <ReflexSplitter style={{ height: "auto" }} propagate={true}/>
      
      <ReflexElement className="middle-pane" minSize={500}>
        <div className="pane-content">
          <ModEditor
            title={title}
            startingCode={startingCode}
            isDarkTheme={isDarkTheme}
            onChange={onChange || null}
            hoistHelper={hoistHelper}
          />
        </div>
      </ReflexElement>

      <ReflexSplitter style={{ height: "auto" }} propagate={true}/>

      <ReflexElement className="right-pane" flex={0.25}>
        <div className="pane-content">
          {children[1]}
        </div>
      </ReflexElement>
    </ReflexContainer>
      // {!showLeftPanelContent && (
      //   <Button
      //     size="sm"
      //     variant="outline-secondary"
      //     onClick={() => changeLeftPanel([10])}
      //   >
      //     {">"}
      //   </Button>
      // )}
  );
}

EditorView.propTypes = {
  startingCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  hoistHelper: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    transpiler: PropTypes.object.isRequired,
  }).isRequired,
  isDarkTheme: PropTypes.bool,
  onChange: PropTypes.func,
};

EditorView.defaultProps = {
  isDarkTheme: false,
  onChange: () => {},
};

export { EditorView };